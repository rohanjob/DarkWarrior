using System.ComponentModel.DataAnnotations;

namespace Darksite.API.Models;

public class Bounty
{
    [Key]
    public int Id { get; set; }
    
    [Required]
    [StringLength(100)]
    public string PersonName { get; set; } = string.Empty;
    
    [Required]
    [StringLength(50)]
    public string Amount { get; set; } = string.Empty;
    
    [Required]
    public DateTime SpottedDate { get; set; }
    
    public string? Description { get; set; }
    
    public string? ThreatLevel { get; set; } // Low, Medium, High, Critical
    
    public bool IsActive { get; set; } = true;
}
