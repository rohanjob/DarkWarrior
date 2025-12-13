-- ========================================
-- Darksite Database Schema
-- Study Purpose Only - Fictional Data
-- ========================================

-- Create Hunters Table
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'Hunters')
BEGIN
    CREATE TABLE Hunters (
        Id INT PRIMARY KEY IDENTITY(1,1),
        Name VARCHAR(100) NOT NULL,
        Email VARCHAR(100) NOT NULL UNIQUE,
        PasswordHash VARCHAR(200) NOT NULL,
        CreatedAt DATETIME2 DEFAULT GETUTCDATE(),
        INDEX IX_Hunters_Email (Email)
    );
END
GO

-- Create Bounties Table
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'Bounties')
BEGIN
    CREATE TABLE Bounties (
        Id INT PRIMARY KEY IDENTITY(1,1),
        PersonName VARCHAR(100) NOT NULL,
        Amount VARCHAR(50) NOT NULL,
        SpottedDate DATE NOT NULL,
        Description VARCHAR(500) NULL,
        ThreatLevel VARCHAR(20) NULL,
        IsActive BIT DEFAULT 1,
        INDEX IX_Bounties_ThreatLevel (ThreatLevel),
        INDEX IX_Bounties_SpottedDate (SpottedDate)
    );
END
GO

PRINT 'Database schema created successfully!';
