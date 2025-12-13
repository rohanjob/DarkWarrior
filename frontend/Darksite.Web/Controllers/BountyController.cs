using Microsoft.AspNetCore.Mvc;

namespace Darksite.Web.Controllers;

public class BountyController : Controller
{
    private readonly IHttpClientFactory _httpClientFactory;
    private readonly ILogger<BountyController> _logger;

    public BountyController(IHttpClientFactory httpClientFactory, ILogger<BountyController> logger)
    {
        _httpClientFactory = httpClientFactory;
        _logger = logger;
    }

    public IActionResult Board()
    {
        return View();
    }
}
