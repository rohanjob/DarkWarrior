using Microsoft.EntityFrameworkCore;
using Darksite.API.Models;

namespace Darksite.API.Data;

public class DarksiteDbContext : DbContext
{
    public DarksiteDbContext(DbContextOptions<DarksiteDbContext> options)
        : base(options)
    {
    }

    public DbSet<Hunter> Hunters { get; set; }
    public DbSet<Bounty> Bounties { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Seed data for Bounties
        modelBuilder.Entity<Bounty>().HasData(
            new Bounty
            {
                Id = 1,
                PersonName = "Sai",
                Amount = "$200000",
                SpottedDate = new DateTime(2077, 12, 20),
                ThreatLevel = "Critical",
                Description = "Notorious cyber criminal wanted for data breaches",
                IsActive = true
            },
            new Bounty
            {
                Id = 2,
                PersonName = "Jayak",
                Amount = "$2",
                SpottedDate = new DateTime(2025, 12, 13),
                ThreatLevel = "Low",
                Description = "Minor offense - parking violation in the dark web",
                IsActive = true
            },
            new Bounty
            {
                Id = 3,
                PersonName = "Raven",
                Amount = "$50000",
                SpottedDate = new DateTime(2026, 6, 18),
                ThreatLevel = "High",
                Description = "Known hacker specializing in ransomware",
                IsActive = true
            },
            new Bounty
            {
                Id = 4,
                PersonName = "Nyx",
                Amount = "$900000",
                SpottedDate = new DateTime(2027, 1, 1),
                ThreatLevel = "Critical",
                Description = "Mastermind behind multiple zero-day exploits",
                IsActive = true
            },
            new Bounty
            {
                Id = 5,
                PersonName = "ShadowX",
                Amount = "$12000",
                SpottedDate = new DateTime(2025, 9, 9),
                ThreatLevel = "Medium",
                Description = "Identity thief operating in the shadows",
                IsActive = true
            }
        );
    }
}
