using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Darksite.API.Data;
using Darksite.API.Models;
using System.Security.Cryptography;
using System.Text;

namespace Darksite.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly DarksiteDbContext _context;
    private readonly ILogger<AuthController> _logger;

    public AuthController(DarksiteDbContext context, ILogger<AuthController> logger)
    {
        _context = context;
        _logger = logger;
    }

    /// <summary>
    /// Register a new hunter (STUDY PURPOSE - SIMPLIFIED AUTH)
    /// </summary>
    [HttpPost("register")]
    public async Task<ActionResult<AuthResponse>> Register(RegisterRequest request)
    {
        try
        {
            // Check if hunter already exists
            if (await _context.Hunters.AnyAsync(h => h.Email == request.Email))
            {
                return BadRequest(new AuthResponse
                {
                    Success = false,
                    Message = "Hunter with this email already exists"
                });
            }

            // Create new hunter (DEMO - use proper password hashing in production)
            var hunter = new Hunter
            {
                Name = request.Name,
                Email = request.Email,
                PasswordHash = HashPassword(request.Password), // Simplified for demo
                CreatedAt = DateTime.UtcNow
            };

            _context.Hunters.Add(hunter);
            await _context.SaveChangesAsync();

            // Don't return password hash
            hunter.PasswordHash = string.Empty;

            return Ok(new AuthResponse
            {
                Success = true,
                Message = "Hunter registered successfully",
                Hunter = hunter
            });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error during registration");
            return StatusCode(500, new AuthResponse
            {
                Success = false,
                Message = "Internal server error"
            });
        }
    }

    /// <summary>
    /// Login hunter (STUDY PURPOSE - SIMPLIFIED AUTH)
    /// </summary>
    [HttpPost("login")]
    public async Task<ActionResult<AuthResponse>> Login(LoginRequest request)
    {
        try
        {
            var passwordHash = HashPassword(request.Password);
            var hunter = await _context.Hunters
                .FirstOrDefaultAsync(h => h.Email == request.Email && h.PasswordHash == passwordHash);

            if (hunter == null)
            {
                return Unauthorized(new AuthResponse
                {
                    Success = false,
                    Message = "Invalid email or password"
                });
            }

            // Don't return password hash
            hunter.PasswordHash = string.Empty;

            return Ok(new AuthResponse
            {
                Success = true,
                Message = "Login successful",
                Hunter = hunter
            });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error during login");
            return StatusCode(500, new AuthResponse
            {
                Success = false,
                Message = "Internal server error"
            });
        }
    }

    /// <summary>
    /// Simple hash function for demo purposes
    /// WARNING: Use proper password hashing (BCrypt, Argon2) in production!
    /// </summary>
    private string HashPassword(string password)
    {
        using var sha256 = SHA256.Create();
        var bytes = Encoding.UTF8.GetBytes(password);
        var hash = sha256.ComputeHash(bytes);
        return Convert.ToBase64String(hash);
    }
}
