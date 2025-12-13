# 🚀 Darksite Deployment Guide

Complete step-by-step guide for deploying Darksite to Azure.

---

## 📋 Prerequisites

Before you begin, ensure you have:

- [ ] **Azure Account** (Free tier is sufficient for testing)
- [ ] **.NET 8 SDK** installed locally
- [ ] **SQL Server** or **SQL Server Express** for local development
- [ ] **Git** installed
- [ ] **Visual Studio 2022** or **VS Code** with C# extension
- [ ] **Azure CLI** installed (optional but recommended)

---

## 🏠 Local Development Setup

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd darksite
```

### 2. Setup Local Database

#### Option A: Using SQL Server LocalDB (Recommended for Windows)

```bash
# The connection string is already configured in appsettings.json
# Database will be created automatically on first run
```

#### Option B: Using SQL Server Express

1. Update `backend/Darksite.API/appsettings.json`:

```json
{
  "ConnectionStrings": {
    "DarksiteDb": "Server=localhost\\SQLEXPRESS;Database=DarksiteDb;Trusted_Connection=True;MultipleActiveResultSets=true"
  }
}
```

2. Run database scripts manually (optional - EF will create tables):

```bash
# Open SQL Server Management Studio (SSMS)
# Connect to your SQL Server instance
# Open and execute: database/scripts/create_tables.sql
# Open and execute: database/scripts/seed_data.sql
```

### 3. Run Backend API

```bash
cd backend/Darksite.API
dotnet restore
dotnet build
dotnet run
```

Backend will start at: `https://localhost:7001`  
Swagger UI: `https://localhost:7001/swagger`

### 4. Run Frontend Web

Open a **new terminal**:

```bash
cd frontend/Darksite.Web
dotnet restore
dotnet build
dotnet run
```

Frontend will start at: `https://localhost:5001`

### 5. Test Locally

1. Open browser to `https://localhost:5001`
2. Click "ENTER DARKSITE"
3. Login with:
   - Email: `admin@darksite.com`
   - Password: `password123`
4. View the Bounty Board

---

## ☁️ Azure Deployment

### Phase 1: Create Azure Resources

#### 1.1 Login to Azure Portal

Visit: [https://portal.azure.com](https://portal.azure.com)

#### 1.2 Create Resource Group

```bash
# Using Azure CLI (Option 1)
az login
az group create --name darksite-rg --location centralindia

# Or use Azure Portal (Option 2)
# 1. Click "Resource groups"
# 2. Click "+ Create"
# 3. Name: darksite-rg
# 4. Region: Central India (or your preference)
# 5. Click "Review + Create"
```

#### 1.3 Create Azure SQL Server

```bash
# Using Azure CLI
az sql server create \
  --name darksite-sql-server \
  --resource-group darksite-rg \
  --location centralindia \
  --admin-user sqladmin \
  --admin-password "YourSecureP@ssw0rd!"

# Enable firewall for Azure services
az sql server firewall-rule create \
  --resource-group darksite-rg \
  --server darksite-sql-server \
  --name AllowAzureServices \
  --start-ip-address 0.0.0.0 \
  --end-ip-address 0.0.0.0

# Add your IP (replace X.X.X.X with your IP)
az sql server firewall-rule create \
  --resource-group darksite-rg \
  --server darksite-sql-server \
  --name AllowMyIP \
  --start-ip-address X.X.X.X \
  --end-ip-address X.X.X.X
```

**Via Portal:**
1. Search for "SQL servers"
2. Click "+ Create"
3. Server name: `darksite-sql-server`
4. Admin login: `sqladmin`
5. Password: `YourSecureP@ssw0rd!`
6. Location: Same as resource group
7. Click "Review + Create"

#### 1.4 Create Azure SQL Database

```bash
# Using Azure CLI
az sql db create \
  --resource-group darksite-rg \
  --server darksite-sql-server \
  --name DarksiteDb \
  --service-objective Basic \
  --backup-storage-redundancy Local
```

**Via Portal:**
1. Go to your SQL Server
2. Click "Create database"
3. Database name: `DarksiteDb`
4. Compute + storage: Basic (2GB, 5 DTU)
5. Click "Review + Create"

#### 1.5 Run Database Scripts

Using Azure Data Studio or SSMS:

```
Server: darksite-sql-server.database.windows.net
Database: DarksiteDb
Authentication: SQL Login
Username: sqladmin
Password: YourSecureP@ssw0rd!
```

Execute:
1. `database/scripts/create_tables.sql`
2. `database/scripts/seed_data.sql`

Or use `sqlcmd`:

```bash
sqlcmd -S darksite-sql-server.database.windows.net -U sqladmin -P "YourSecureP@ssw0rd!" -d DarksiteDb -i database/scripts/create_tables.sql
sqlcmd -S darksite-sql-server.database.windows.net -U sqladmin -P "YourSecureP@ssw0rd!" -d DarksiteDb -i database/scripts/seed_data.sql
```

#### 1.6 Create App Service Plan

```bash
az appservice plan create \
  --name darksite-plan \
  --resource-group darksite-rg \
  --sku B1 \
  --location centralindia
```

**Via Portal:**
1. Search for "App Service plans"
2. Click "+ Create"
3. Name: `darksite-plan`
4. OS: Windows or Linux
5. Pricing: Basic B1
6. Click "Review + Create"

#### 1.7 Create Backend App Service

```bash
az webapp create \
  --resource-group darksite-rg \
  --plan darksite-plan \
  --name darksite-api \
  --runtime "DOTNET:8"
```

**Via Portal:**
1. Search for "App Services"
2. Click "+ Create"
3. Name: `darksite-api` (must be globally unique)
4. Runtime: .NET 8
5. Plan: Use existing `darksite-plan`
6. Click "Review + Create"

#### 1.8 Create Frontend App Service

```bash
az webapp create \
  --resource-group darksite-rg \
  --plan darksite-plan \
  --name darksite-web \
  --runtime "DOTNET:8"
```

**Via Portal:**
1. Create another App Service
2. Name: `darksite-web` (must be globally unique)
3. Runtime: .NET 8
4. Plan: Use existing `darksite-plan`
5. Click "Review + Create"

---

### Phase 2: Configure App Services

#### 2.1 Configure Backend Connection String

**Via Portal:**
1. Go to `darksite-api` App Service
2. Click "Configuration" → "Connection strings"
3. Click "+ New connection string"
   - Name: `DarksiteDb`
   - Value: `Server=tcp:darksite-sql-server.database.windows.net,1433;Database=DarksiteDb;User ID=sqladmin;Password=YourSecureP@ssw0rd!;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;`
   - Type: `SQLAzure`
4. Click "Save"

**Via Azure CLI:**
```bash
az webapp config connection-string set \
  --resource-group darksite-rg \
  --name darksite-api \
  --connection-string-type SQLAzure \
  --settings DarksiteDb="Server=tcp:darksite-sql-server.database.windows.net,1433;Database=DarksiteDb;User ID=sqladmin;Password=YourSecureP@ssw0rd!;Encrypt=True;"
```

#### 2.2 Configure Backend CORS

1. Go to `darksite-api` App Service
2. Click "CORS"
3. Add Allowed Origins:
   - `https://darksite-web.azurewebsites.net`
   - `https://localhost:5001` (for local testing)
4. Click "Save"

#### 2.3 Configure Frontend API URL

1. Go to `darksite-web` App Service
2. Click "Configuration" → "Application settings"
3. Click "+ New application setting"
   - Name: `ApiSettings__BaseUrl`
   - Value: `https://darksite-api.azurewebsites.net`
4. Click "Save"

---

### Phase 3: Deploy Applications

#### 3.1 Deploy Backend (Manual Method)

```bash
cd backend/Darksite.API
dotnet publish -c Release -o ./publish
cd publish
zip -r ../publish.zip *

# Upload via Azure CLI
az webapp deployment source config-zip \
  --resource-group darksite-rg \
  --name darksite-api \
  --src ../publish.zip
```

**Via Visual Studio:**
1. Right-click `Darksite.API` project
2. Click "Publish"
3. Target: Azure
4. Select `darksite-api` App Service
5. Click "Publish"

#### 3.2 Deploy Frontend (Manual Method)

```bash
cd frontend/Darksite.Web
dotnet publish -c Release -o ./publish
cd publish
zip -r ../publish.zip *

az webapp deployment source config-zip \
  --resource-group darksite-rg \
  --name darksite-web \
  --src ../publish.zip
```

**Via Visual Studio:**
1. Right-click `Darksite.Web` project
2. Click "Publish"
3. Target: Azure
4. Select `darksite-web` App Service
5. Click "Publish"

---

### Phase 4: Setup CI/CD with Azure DevOps

#### 4.1 Create Azure DevOps Project

1. Go to [https://dev.azure.com](https://dev.azure.com)
2. Create new organization (if needed)
3. Create new project: `Darksite`

#### 4.2 Push Code to Azure Repos

```bash
# From project root
git remote add azure https://dev.azure.com/yourorg/Darksite/_git/Darksite
git push azure main
```

#### 4.3 Create Service Connection

1. In Azure DevOps, go to Project Settings
2. Click "Service connections"
3. Click "+ New service connection"
4. Select "Azure Resource Manager"
5. Select "Service principal (automatic)"
6. Choose your subscription
7. Resource group: `darksite-rg`
8. Name: `Azure-Darksite-Connection`
9. Click "Save"

#### 4.4 Create Pipeline

1. In Azure DevOps, go to Pipelines
2. Click "+ New pipeline"
3. Select "Azure Repos Git"
4. Select your repository
5. Select "Existing Azure Pipelines YAML file"
6. Path: `/pipelines/azure-pipelines.yml`
7. Click "Continue"

#### 4.5 Configure Pipeline Variables

1. Click "Edit" on your pipeline
2. Click "Variables"
3. Add the following variables:
   - `azureSubscription`: `Azure-Darksite-Connection`
   - `backendWebAppName`: `darksite-api`
   - `frontendWebAppName`: `darksite-web`
4. Click "Save"

#### 4.6 Run Pipeline

1. Click "Run pipeline"
2. Select branch: `main`
3. Click "Run"

The pipeline will:
- Build both projects
- Run tests (if any)
- Deploy to Azure App Services

---

### Phase 5: Verify Deployment

#### 5.1 Test Backend API

Visit: `https://darksite-api.azurewebsites.net/swagger`

You should see the Swagger UI with API endpoints.

Test endpoint:
```
GET https://darksite-api.azurewebsites.net/api/bounty
```

#### 5.2 Test Frontend

Visit: `https://darksite-web.azurewebsites.net`

1. Click "ENTER DARKSITE"
2. Login with demo credentials
3. Verify Bounty Board loads

---

## 🔧 Troubleshooting

### Database Connection Issues

```bash
# Test connection from local machine
sqlcmd -S darksite-sql-server.database.windows.net -U sqladmin -P "YourSecureP@ssw0rd!" -d DarksiteDb -Q "SELECT COUNT(*) FROM Bounties"
```

### App Service Logs

```bash
# Stream logs
az webapp log tail --name darksite-api --resource-group darksite-rg

# Download logs
az webapp log download --name darksite-api --resource-group darksite-rg
```

### Common Issues

1. **500 Error on API:**
   - Check connection string is correct
   - Verify SQL firewall rules
   - Check Application Insights for errors

2. **CORS Error:**
   - Verify CORS settings in App Service
   - Check frontend URL is in allowed origins

3. **API not loading:**
   - Verify frontend `ApiSettings__BaseUrl` is correct
   - Check browser console for errors

---

## 📊 Monitoring

### Enable Application Insights

1. Go to each App Service
2. Click "Application Insights"
3. Click "Turn on Application Insights"
4. Create new resource or use existing
5. Click "Apply"

### View Metrics

- Requests per second
- Response time
- Failed requests
- Exceptions

---

## 💰 Cost Estimation

- **Resource Group:** Free
- **App Service Plan (B1):** ~$13/month
- **Azure SQL Basic:** ~$5/month
- **Total:** ~$18/month

**To save costs:**
- Use Free tier App Service (limited to 60 min/day)
- Delete resources when not in use
- Use Azure Free Account credits

---

## 🧹 Cleanup

To delete all resources:

```bash
az group delete --name darksite-rg --yes --no-wait
```

Or via Portal:
1. Go to Resource Groups
2. Select `darksite-rg`
3. Click "Delete resource group"
4. Confirm by typing the name
5. Click "Delete"

---

## 📚 Next Steps

1. **Custom Domain:** Add your own domain to App Services
2. **SSL Certificate:** Enable HTTPS with custom certificate
3. **Auto-scaling:** Configure scaling rules
4. **Staging Slots:** Set up staging environment
5. **Azure Key Vault:** Store secrets securely
6. **Azure CDN:** Cache static files

---

**Happy Deploying! 🚀**
