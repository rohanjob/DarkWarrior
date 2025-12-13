using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Darksite.API.Data;
using Darksite.API.Models;

namespace Darksite.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class BountyController : ControllerBase
{
    private readonly DarksiteDbContext _context;
    private readonly ILogger<BountyController> _logger;

    public BountyController(DarksiteDbContext context, ILogger<BountyController> logger)
    {
        _context = context;
        _logger = logger;
    }

    /// <summary>
    /// Get all active bounties
    /// </summary>
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Bounty>>> GetBounties()
    {
        try
        {
            var bounties = await _context.Bounties
                .Where(b => b.IsActive)
                .OrderByDescending(b => b.SpottedDate)
                .ToListAsync();
            
            return Ok(bounties);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error fetching bounties");
            return StatusCode(500, "Internal server error");
        }
    }

    /// <summary>
    /// Get bounty by ID
    /// </summary>
    [HttpGet("{id}")]
    public async Task<ActionResult<Bounty>> GetBounty(int id)
    {
        try
        {
            var bounty = await _context.Bounties.FindAsync(id);

            if (bounty == null)
            {
                return NotFound(new { message = "Bounty not found" });
            }

            return Ok(bounty);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error fetching bounty {Id}", id);
            return StatusCode(500, "Internal server error");
        }
    }

    /// <summary>
    /// Get bounties by threat level
    /// </summary>
    [HttpGet("threat-level/{level}")]
    public async Task<ActionResult<IEnumerable<Bounty>>> GetBountiesByThreatLevel(string level)
    {
        try
        {
            var bounties = await _context.Bounties
                .Where(b => b.IsActive && b.ThreatLevel == level)
                .ToListAsync();

            return Ok(bounties);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error fetching bounties by threat level {Level}", level);
            return StatusCode(500, "Internal server error");
        }
    }

    /// <summary>
    /// Create a new bounty (Admin only - for demo purposes)
    /// </summary>
    [HttpPost]
    public async Task<ActionResult<Bounty>> CreateBounty(Bounty bounty)
    {
        try
        {
            _context.Bounties.Add(bounty);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetBounty), new { id = bounty.Id }, bounty);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error creating bounty");
            return StatusCode(500, "Internal server error");
        }
    }
}
