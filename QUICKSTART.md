# ⚡ Darksite - Quick Start Guide

Get up and running with Darksite in 5 minutes!

---

## 🎯 Prerequisites

- .NET 8.0 SDK ([Download](https://dotnet.microsoft.com/download))
- SQL Server LocalDB (comes with Visual Studio) or SQL Server Express
- Your favorite code editor (VS Code or Visual Studio 2022)

---

## 🚀 Running Locally (3 Steps)

### Step 1: Navigate to Backend

```bash
cd backend/Darksite.API
```

### Step 2: Run Backend API

```bash
dotnet restore
dotnet run
```

✅ Backend running at: **https://localhost:7001**  
✅ Swagger UI at: **https://localhost:7001/swagger**

---

### Step 3: Run Frontend (New Terminal)

Open a **NEW terminal window**:

```bash
cd frontend/Darksite.Web
dotnet restore
dotnet run
```

✅ Frontend running at: **https://localhost:5001**

---

## 🎮 Try It Out!

1. **Open Browser:** Navigate to `https://localhost:5001`

2. **Click:** "ENTER DARKSITE" button

3. **Login with demo credentials:**
   - Email: `admin@darksite.com`
   - Password: `password123`

4. **Explore:** View the Bounty Board with fictional cyber targets!

---

## 🗄️ Database

The database will be created automatically using Entity Framework Code-First approach.

**Connection String (already configured):**
```
Server=(localdb)\\mssqllocaldb;Database=DarksiteDb;Trusted_Connection=True
```

**Seed Data:**
- 3 Hunters (demo accounts)
- 8 Bounties (fictional cyber criminals)

---

## 📡 Testing the API

### Using Swagger UI
Visit: `https://localhost:7001/swagger`

### Using curl

**Get all bounties:**
```bash
curl https://localhost:7001/api/bounty
```

**Login:**
```bash
curl -X POST https://localhost:7001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@darksite.com","password":"password123"}'
```

**Register new hunter:**
```bash
curl -X POST https://localhost:7001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"New Hunter","email":"newhunter@test.com","password":"test123"}'
```

---

## 🎨 Features to Explore

### 🌑 Cyberpunk UI
- Dark background with neon green/cyan accents
- Animated particles and scanlines
- Terminal-style panels
- Glitch effects on titles

### 🕷️ Spider Animation
Watch random black spiders drop from the top every 2 seconds!

### ⚡ Smooth Animations
- Parallax scrolling
- Fade-in reveal on scroll
- Custom cursor glow
- Hover effects

### 🎯 Bounty Board
- Real-time data from API
- Filter by threat level
- Threat badges with color coding
- Accept bounty action (demo)

---

## 📂 Project Structure

```
Darksite/
├── frontend/Darksite.Web/       # ASP.NET Core MVC
│   ├── Controllers/              # MVC Controllers
│   ├── Views/                    # Razor views
│   └── wwwroot/                  # Static files (CSS/JS)
│
├── backend/Darksite.API/         # ASP.NET Core Web API
│   ├── Controllers/              # API Controllers
│   ├── Models/                   # Data models
│   └── Data/                     # DbContext
│
├── database/scripts/             # SQL scripts
└── pipelines/                    # Azure DevOps CI/CD
```

---

## 🛠️ Development Tips

### Hot Reload (Frontend)
Add to `Darksite.Web.csproj`:
```xml
<ItemGroup>
  <PackageReference Include="Microsoft.AspNetCore.Mvc.Razor.RuntimeCompilation" Version="8.0.0" />
</ItemGroup>
```

Then in `Program.cs`:
```csharp
builder.Services.AddControllersWithViews().AddRazorRuntimeCompilation();
```

### Watch Mode
```bash
dotnet watch run
```

### Run Both Projects (PowerShell)
```powershell
# Save as run-all.ps1
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd backend/Darksite.API; dotnet run"
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd frontend/Darksite.Web; dotnet run"
```

---

## 🐛 Troubleshooting

### Database Not Found?
```bash
# Delete and recreate
dotnet ef database drop --project backend/Darksite.API
dotnet ef database update --project backend/Darksite.API
```

### Port Already in Use?
Edit `Properties/launchSettings.json` to change ports.

### API Connection Error?
- Ensure backend is running on port 7001
- Check CORS configuration in `Program.cs`
- Verify `ApiSettings:BaseUrl` in frontend `appsettings.json`

### CSS Not Loading?
- Clear browser cache (Ctrl+F5)
- Check browser console for errors
- Verify files exist in `wwwroot/css`

---

## 📚 Next Steps

1. **Explore Code:** Check out the controllers and models
2. **Modify UI:** Update CSS in `wwwroot/css/site.css`
3. **Add Features:** Create new API endpoints
4. **Deploy to Azure:** Follow `DEPLOYMENT.md` guide
5. **Setup CI/CD:** Configure Azure Pipelines

---

## 🎓 Learning Resources

- **ASP.NET Core:** https://docs.microsoft.com/aspnet/core
- **Entity Framework:** https://docs.microsoft.com/ef/core
- **Web API Tutorial:** https://docs.microsoft.com/aspnet/core/tutorials/first-web-api

---

## 💡 Demo Data

**Hunters:**
- admin@darksite.com / password123
- john@hunters.com / password123
- sarah@hunters.com / password123

**Bounties:**
- Sai ($200,000 - Critical)
- Nyx ($900,000 - Critical)
- Raven ($50,000 - High)
- ShadowX ($12,000 - Medium)
- Jayak ($2 - Low)

---

## ⚠️ Remember

This is a **study project** - not production-ready!
- Simplified password hashing (SHA256)
- No JWT authentication
- Basic error handling
- Minimal validation

**For production:** Implement proper security, validation, and error handling!

---

**Happy Coding! 🎉**

Need help? Check the main README.md or DEPLOYMENT.md for more details.
