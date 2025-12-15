# 🛡️ DARKWARRIOR

**Pipeline-as-Code DevOps Project using .NET, GitHub Actions & Azure VM**

> ⚠️ **Disclaimer:** This project is built **strictly for educational and study purposes only**.
> All data, names, and scenarios are **fictional** and **do not represent real hacking or illegal activity**.

---

## 📌 Project Overview

**DARKWARRIOR** is a full-stack **.NET DevOps project** designed to demonstrate **Pipeline as Code**, **CI/CD automation**, and **cloud deployment** using **GitHub Actions** and an **Azure Virtual Machine**.

The application follows a **three-tier architecture**:

* **Frontend:** ASP.NET Core MVC
* **Backend:** ASP.NET Core Web API
* **Database:** SQL Server (Docker on Azure VM)

The focus of this project is **DevOps implementation**, not real cybersecurity operations.

---

## 🧱 Architecture

```
GitHub Repository
        |
GitHub Actions (Pipeline as Code)
        |
Azure Virtual Machine
 ├── Backend (.NET Web API)
 ├── Frontend (.NET MVC)
 └── SQL Server (Docker)
```

---

## 🛠️ Technology Stack

### Application

* ASP.NET Core MVC
* ASP.NET Core Web API
* Entity Framework Core
* Razor Views
* JavaScript, CSS (Dark UI, animations)

### DevOps & Cloud

* Git & GitHub
* **GitHub Actions (Pipeline as Code)**
* Azure Virtual Machine (Ubuntu)
* SSH-based deployment
* MSBuild
* NuGet
* Docker (SQL Server)

---

## 📁 Project Structure

```
DarkWarrior/
├── backend/
│   └── Darksite.API/
│       ├── Controllers/
│       ├── Models/
│       ├── Data/
│       └── Program.cs
│
├── frontend/
│   └── Darksite.Web/
│       ├── Controllers/
│       ├── Views/
│       ├── wwwroot/
│       └── Program.cs
│
├── database/
│   └── scripts/
│
├── .github/
│   └── workflows/
│       └── darkwarrior-vm.yml
│
└── README.md
```

---

## ⚙️ Features

* 🔐 Hunter authentication (dummy data)
* 🧾 Bounty board display
* 🎨 Dark UI with animations (spider, scroll effects)
* 🔄 REST API communication
* 📦 SQL Server database
* 🚀 Automated CI/CD using GitHub Actions
* ☁️ Deployed on Azure VM

---

## 🧪 Sample Bounty Data

| Name  | Bounty Amount | Spotted Date |
| ----- | ------------- | ------------ |
| Sai   | $200000       | 20/12/2077   |
| Jayak | $200000000    | 13/12/2025   |
| Raven | $50000        | 18/06/2026   |
| Nyx   | $900000       | 01/01/2027   |

---

## 🚀 CI/CD – Pipeline as Code

This project uses **GitHub Actions** as a **Pipeline-as-Code** solution.

### Pipeline Trigger

* Runs automatically on every `git push` to the `main` branch.

### Pipeline Responsibilities

* Checkout source code
* Authenticate to Azure VM using SSH
* Build backend & frontend using **NuGet + MSBuild**
* Deploy applications automatically on the VM

📄 Pipeline File:

```
.github/workflows/darkwarrior-vm.yml
```

---

## ☁️ Deployment Details

* **Cloud Provider:** Microsoft Azure
* **Compute:** Azure Virtual Machine (Ubuntu)
* **Database:** SQL Server in Docker
* **Ports Used:**

  * Frontend: `5001`
  * Backend API: `7001`
  * SQL Server: `1433`

---

## 🔐 Security Notes

* SSH authentication used for deployment
* Secrets stored securely in **GitHub Actions Secrets**
* Swagger enabled only for testing
* No real user data or hacking logic

---

## 🧠 Learning Outcomes

This project helped me gain hands-on experience in:

* Pipeline as Code
* GitHub Actions CI/CD
* Azure VM deployment
* .NET application hosting
* Secure SSH-based automation
* End-to-end DevOps workflow

---

## 📝 How to Run Locally

### Backend

```bash
cd backend/Darksite.API
dotnet restore
dotnet run
```

### Frontend

```bash
cd frontend/Darksite.Web
dotnet restore
dotnet run
```

---

## 📢 Disclaimer

This project is **strictly for educational and demonstration purposes**.
It does **not** support or promote illegal hacking, tracking, or cybercrime.

---

## 👤 Author

**Sai Teja**
DevOps & Cloud Enthusiast
GitHub: `https://github.com/rohanjob`

---

## ⭐ If you like this project

Give it a ⭐ and feel free to fork for learning!


