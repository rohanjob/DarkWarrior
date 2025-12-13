# 🕷️ DARKSITE - Cybersecurity Bounty Hunter Platform

> **⚠️ STUDY PURPOSE ONLY - FICTIONAL DEVOPS PROJECT**

A fictional cybersecurity-themed platform showcasing modern DevOps practices, .NET architecture, CI/CD pipelines, Azure deployment, and database integration.

![Darksite Banner](https://img.shields.io/badge/DevOps-Study%20Project-00ff41?style=for-the-badge)
![.NET](https://img.shields.io/badge/.NET-8.0-512BD4?style=for-the-badge&logo=dotnet)
![Azure](https://img.shields.io/badge/Azure-DevOps-0078D4?style=for-the-badge&logo=microsoft-azure)

---

## 🧩 Tech Stack

### Frontend
- **ASP.NET Core MVC** / Razor Pages
- HTML5, CSS3, JavaScript
- **GSAP-inspired Animations** (parallax scroll, particle effects)
- **Spider Animation** - Random black spider drops every 2 seconds
- **Dark Cyberpunk UI Theme** with neon effects

### Backend
- **ASP.NET Core Web API** (.NET 8)
- **Entity Framework Core** (Code-First approach)
- **REST APIs** for authentication and bounty management
- Swagger/OpenAPI documentation

### Database
- **Azure SQL Database** (Production)
- SQL Server (Local development)
- Entity Framework Migrations

### DevOps & Build
- **NuGet** - Dependency management
- **MSBuild** - Build & release automation
- **Azure Repos** / GitHub - Version control
- **Azure Pipelines** - CI/CD automation
- **Azure App Service** - Web hosting
- **Azure SQL** - Database hosting

---

## 🏗️ High-Level Architecture

```
┌─────────────────┐
│  User Browser   │
└────────┬────────┘
         │
         ▼
┌─────────────────────────┐
│  Frontend (ASP.NET MVC) │
│  - Views (Razor)        │
│  - Controllers          │
│  - wwwroot (JS/CSS)     │
└────────┬────────────────┘
         │ HTTP/REST
         ▼
┌─────────────────────────┐
│ Backend (.NET Web API)  │
│  - BountyController     │
│  - AuthController       │
│  - Entity Framework     │
└────────┬────────────────┘
         │
         ▼
┌─────────────────────────┐
│  Database (Azure SQL)   │
│  - Hunters Table        │
│  - Bounties Table       │
└─────────────────────────┘
```

---

## 📁 Project Structure

```
Darksite/
│
├── frontend/
│   └── Darksite.Web/
│       ├── Controllers/
│       │   ├── HomeController.cs
│       │   └── BountyController.cs
│       ├── Views/
│       │   ├── Home/
│       │   ├── Bounty/
│       │   └── Shared/
│       ├── wwwroot/
│       │   ├── css/
│       │   │   └── site.css          # Cyberpunk theme
│       │   ├── js/
│       │   │   ├── spider.js         # Spider animation
│       │   │   ├── scroll-effects.js # GSAP-style effects
│       │   │   └── api-client.js     # API integration
│       │   └── images/
│       ├── Program.cs
│       └── Darksite.Web.csproj
│
├── backend/
│   └── Darksite.API/
│       ├── Controllers/
│       │   ├── AuthController.cs     # Login/Register
│       │   └── BountyController.cs   # CRUD operations
│       ├── Models/
│       │   ├── Hunter.cs
│       │   ├── Bounty.cs
│       │   └── AuthModels.cs
│       ├── Data/
│       │   └── DarksiteDbContext.cs
│       ├── Program.cs
│       └── Darksite.API.csproj
│
├── database/
│   └── scripts/
│       ├── create_tables.sql         # Schema creation
│       └── seed_data.sql             # Sample data
│
├── pipelines/
│   └── azure-pipelines.yml           # CI/CD configuration
│
└── README.md                          # This file
```

---

## 🎭 UI Features (Fictional but Realistic)

### Animations
- ✨ **Parallel scrolling sections** (GSAP-inspired)
- 🌑 **Dark particle background** with floating dots
- 🕷️ **Random black spider animation** every 2 seconds
- ⚡ **Neon text flicker** effect
- 💻 **Terminal-style UI panels**
- 🌊 **Smooth scroll reveal animations**
- 🎨 **Gradient text effects** with glow
- 🖱️ **Custom cursor glow**

### Design Theme
- Dark cyberpunk aesthetic (#0a0a0f background)
- Neon green (#00ff41) and cyan (#00d4ff) accents  
- Matrix-style scanlines
- Glitch effects on headers
- Terminal-inspired typography (Orbitron, Share Tech Mono)

---

## 🧠 Features (Study/Demo Only)

### 1. Authentication System
**Fake Login** - For educational purposes only

**Hunter Registration Form:**
- Hunter Name
- Email
- Password

**Login Flow:**
1. User submits credentials
2. API validates (simplified SHA256 hashing - **NOT PRODUCTION READY**)
3. On success → Redirect to Bounty Board

### 2. Bounty Board
View fictional bounty targets with:
- Target name
- Bounty amount
- Spotted date
- Threat level (Low, Medium, High, Critical)
- Description

**API Endpoints:**
- `GET /api/bounty` - List all active bounties
- `GET /api/bounty/{id}` - Get specific bounty
- `GET /api/bounty/threat-level/{level}` - Filter by threat
- `POST /api/bounty` - Create new bounty (demo)

---

## 🗃️ Database Design

### Table: Hunters
```sql
CREATE TABLE Hunters (
    Id INT PRIMARY KEY IDENTITY(1,1),
    Name VARCHAR(100) NOT NULL,
    Email VARCHAR(100) NOT NULL UNIQUE,
    PasswordHash VARCHAR(200) NOT NULL,
    CreatedAt DATETIME2 DEFAULT GETUTCDATE()
);
```

### Table: Bounties
```sql
CREATE TABLE Bounties (
    Id INT PRIMARY KEY IDENTITY(1,1),
    PersonName VARCHAR(100) NOT NULL,
    Amount VARCHAR(50) NOT NULL,
    SpottedDate DATE NOT NULL,
    Description VARCHAR(500),
    ThreatLevel VARCHAR(20),
    IsActive BIT DEFAULT 1
);
```

### Sample Seed Data
```sql
INSERT INTO Bounties VALUES
('Sai', '$200000', '2077-12-20', 'Cyber criminal', 'Critical', 1),
('Jayak', '$2', '2025-12-13', 'Parking violation', 'Low', 1),
('Raven', '$50000', '2026-06-18', 'Ransomware hacker', 'High', 1),
('Nyx', '$900000', '2027-01-01', 'Zero-day exploits', 'Critical', 1),
('ShadowX', '$12000', '2025-09-09', 'Identity thief', 'Medium', 1);
```

---

## 📦 NuGet Packages

### Backend API
```
Microsoft.EntityFrameworkCore
Microsoft.EntityFrameworkCore.SqlServer
Microsoft.EntityFrameworkCore.Tools
Microsoft.AspNetCore.OpenApi
Swashbuckle.AspNetCore
```

### Frontend Web
```
Microsoft.AspNetCore.Mvc.Razor.RuntimeCompilation (Development)
```

---

## 🛠️ Local Development Setup

### Prerequisites
- .NET 8.0 SDK
- SQL Server / SQL Server Express
- Visual Studio 2022 or VS Code
- Git

### Step 1: Clone Repository
```bash
git clone https://github.com/yourusername/darksite.git
cd darksite
```

### Step 2: Setup Database (Local)
```bash
# Update connection string in backend/Darksite.API/appsettings.json
"ConnectionStrings": {
  "DarksiteDb": "Server=(localdb)\\mssqllocaldb;Database=DarksiteDb;Trusted_Connection=true;"
}

# Run database scripts
sqlcmd -S (localdb)\mssqllocaldb -i database/scripts/create_tables.sql
sqlcmd -S (localdb)\mssqllocaldb -i database/scripts/seed_data.sql
```

### Step 3: Build & Run Backend
```bash
cd backend/Darksite.API
dotnet restore
dotnet build
dotnet run
# API will run on https://localhost:7001
```

### Step 4: Build & Run Frontend
```bash
cd frontend/Darksite.Web
dotnet restore
dotnet build
dotnet run
# Web will run on https://localhost:5001
```

### Step 5: Access Application
- **Frontend:** https://localhost:5001
- **Backend API:** https://localhost:7001/swagger

---

## 🚀 Azure Deployment Guide

### STEP 1: Create Azure Account
1. Go to [Azure Portal](https://portal.azure.com)
2. Create a **Resource Group**
   - Name: `darksite-rg`
   - Region: `Central India` (or your preferred region)

### STEP 2: Create Azure SQL Database
1. Navigate to **SQL databases** → **Create**
2. Create **SQL Server**:
   - Server name: `darksite-sql-server`
   - Admin login: `darksiteadmin`
   - Password: `[YourSecurePassword]`
3. Create **Database**:
   - Database name: `DarksiteDb`
   - Compute + storage: `Basic` (5 DTU)
4. Configure **Firewall**:
   - Allow Azure services
   - Add your client IP
5. Run SQL scripts using Azure Data Studio or SSMS:
   ```bash
   sqlcmd -S darksite-sql-server.database.windows.net -U darksiteadmin -P [password] -d DarksiteDb -i database/scripts/create_tables.sql
   sqlcmd -S darksite-sql-server.database.windows.net -U darksiteadmin -P [password] -d DarksiteDb -i database/scripts/seed_data.sql
   ```

### STEP 3: Create App Service (Backend API)
1. Navigate to **App Services** → **Create**
2. Configuration:
   - App name: `darksite-api`
   - Runtime: `.NET 8`
   - OS: `Windows` or `Linux`
   - Plan: `Basic B1`
3. After creation, go to **Configuration** → **Connection strings**:
   ```
   Name: DarksiteDb
   Value: Server=tcp:darksite-sql-server.database.windows.net,1433;Database=DarksiteDb;User ID=darksiteadmin;Password=[password];Encrypt=True;
   Type: SQLAzure
   ```

### STEP 4: Create App Service (Frontend)
1. Create another **App Service**:
   - App name: `darksite-web`
   - Runtime: `.NET 8`
   - Plan: Use same as backend
2. Update `appsettings.json` or **Configuration** with API URL:
   ```json
   "ApiSettings": {
     "BaseUrl": "https://darksite-api.azurewebsites.net"
   }
   ```

### STEP 5: Setup Azure DevOps Pipeline
See `pipelines/azure-pipelines.yml` for full configuration.

```bash
# Connect to Azure DevOps
az login
az devops configure --defaults organization=https://dev.azure.com/yourorg project=Darksite

# Create pipeline
az pipelines create --name Darksite-CI-CD --repository darksite --branch main
```

### STEP 6: Deploy
#### Manual Deploy
```bash
# Backend
cd backend/Darksite.API
dotnet publish -c Release
az webapp deployment source config-zip --resource-group darksite-rg --name darksite-api --src bin/Release/net8.0/publish.zip

# Frontend
cd frontend/Darksite.Web
dotnet publish -c Release
az webapp deployment source config-zip --resource-group darksite-rg --name darksite-web --src bin/Release/net8.0/publish.zip
```

#### Automated Deploy (via Pipeline)
```bash
git add .
git commit -m "Deploy Darksite v1.0"
git push origin main
# Pipeline will automatically build and deploy
```

---

## 🔄 CI/CD Pipeline

The Azure Pipeline (`azure-pipelines.yml`) automates:
1. **Restore** - Install NuGet packages
2. **Build** - Compile .NET projects
3. **Test** - Run unit tests (if any)
4. **Publish** - Create deployment artifacts
5. **Deploy** - Push to Azure App Service

---

## 🧪 Testing Locally

### Test Backend API
```bash
# Get all bounties
curl https://localhost:7001/api/bounty

# Login
curl -X POST https://localhost:7001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@darksite.com","password":"password123"}'
```

### Test Frontend
1. Navigate to `https://localhost:5001`
2. Click "Enter the Darksite"
3. Login with:
   - Email: `admin@darksite.com`
   - Password: `password123`
4. View Bounty Board

---

## 🔒 Security Notice

**⚠️ THIS IS A STUDY PROJECT - NOT PRODUCTION READY**

Current implementation uses:
- ❌ Simple SHA256 password hashing (INSECURE)
- ❌ No JWT authentication
- ❌ No input sanitization
- ❌ No rate limiting
- ❌ No HTTPS enforcement

**For production, implement:**
- ✅ BCrypt/Argon2 password hashing
- ✅ JWT with refresh tokens
- ✅ Input validation and sanitization
- ✅ CORS configuration
- ✅ Rate limiting
- ✅ Azure Key Vault for secrets
- ✅ Application Insights for monitoring

---

## 📚 Learning Objectives

This project demonstrates:
1. ✅ **ASP.NET Core MVC** architecture
2. ✅ **RESTful API** design with Entity Framework
3. ✅ **Azure SQL Database** integration
4. ✅ **Azure App Service** deployment
5. ✅ **CI/CD pipelines** with Azure DevOps
6. ✅ **Modern frontend** with animations
7. ✅ **DevOps workflows** (build, test, deploy)
8. ✅ **NuGet package management**
9. ✅ **Connection string management**
10. ✅ **Separation of concerns** (Frontend/Backend)

---

## 🎬 Demo Credentials

**Hunter Login:**
- Email: `admin@darksite.com`
- Password: `password123`

**Database Access:**
- See Azure SQL connection string in portal

---

## 📖 Resources

- [ASP.NET Core Documentation](https://docs.microsoft.com/aspnet/core)
- [Entity Framework Core](https://docs.microsoft.com/ef/core)
- [Azure App Service](https://docs.microsoft.com/azure/app-service)
- [Azure Pipelines](https://docs.microsoft.com/azure/devops/pipelines)

---

## 📝 License

**MIT License** - This is a fictional study project for educational purposes only.

---

## 👨‍💻 Author

**DevOps Student Project**

---

## 🌟 Acknowledgments

This project was created to demonstrate:
- Modern .NET development practices
- Azure cloud deployment
- DevOps CI/CD workflows
- Cyberpunk UI/UX design

**Remember:** This is for learning purposes. Always follow security best practices in production environments.

---

**🕷️ Welcome to the Dark Side of DevOps! 🕷️**
