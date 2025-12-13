-- ========================================
-- Darksite Database Seed Data
-- Study Purpose Only - Fictional Data
-- ========================================

-- Clear existing data (for demo purposes)
DELETE FROM Bounties;
DELETE FROM Hunters;

-- Reset identity seeds
DBCC CHECKIDENT ('Bounties', RESEED, 0);
DBCC CHECKIDENT ('Hunters', RESEED, 0);

-- Insert Sample Hunters
INSERT INTO Hunters (Name, Email, PasswordHash, CreatedAt) VALUES
('Admin Hunter', 'admin@darksite.com', 'jGl25bVBBBW96Qi9Te4V37Fnqchz/Eu4qB9vKrRIqRg=', GETUTCDATE()),
('John Reaper', 'john@hunters.com', 'jGl25bVBBBW96Qi9Te4V37Fnqchz/Eu4qB9vKrRIqRg=', GETUTCDATE()),
('Sarah Ghost', 'sarah@hunters.com', 'jGl25bVBBBW96Qi9Te4V37Fnqchz/Eu4qB9vKrRIqRg=', GETUTCDATE());

-- Note: All passwords are 'password123' for demo purposes

-- Insert Bounties (Fictional Targets)
INSERT INTO Bounties (PersonName, Amount, SpottedDate, Description, ThreatLevel, IsActive) VALUES
('Sai', '$200000', '2077-12-20', 'Notorious cyber criminal wanted for multiple data breaches across the dark web. Extremely dangerous.', 'Critical', 1),
('Jayak', '$2', '2025-12-13', 'Minor offense - parking violation in the dark web. Low priority.', 'Low', 1),
('Raven', '$50000', '2026-06-18', 'Known hacker specializing in ransomware attacks. Operates from unknown location.', 'High', 1),
('Nyx', '$900000', '2027-01-01', 'Mastermind behind multiple zero-day exploits. Highest priority target.', 'Critical', 1),
('ShadowX', '$12000', '2025-09-09', 'Identity thief operating in the shadows. Medium threat level.', 'Medium', 1),
('CipherQueen', '$75000', '2026-03-15', 'Expert in cryptographic attacks. Target of international agencies.', 'High', 1),
('DarkPhantom', '$150000', '2026-11-30', 'Wanted for corporate espionage and data theft.', 'Critical', 1),
('ByteBandit', '$8000', '2025-07-22', 'Script kiddie causing minor disruptions.', 'Low', 1);

PRINT 'Seed data inserted successfully!';
PRINT 'Total Hunters: ' + CAST((SELECT COUNT(*) FROM Hunters) AS VARCHAR);
PRINT 'Total Bounties: ' + CAST((SELECT COUNT(*) FROM Bounties) AS VARCHAR);

-- Display sample data
SELECT 'Sample Hunters' AS Info;
SELECT Id, Name, Email FROM Hunters;

SELECT 'Sample Bounties' AS Info;
SELECT Id, PersonName, Amount, ThreatLevel, SpottedDate FROM Bounties ORDER BY SpottedDate DESC;
