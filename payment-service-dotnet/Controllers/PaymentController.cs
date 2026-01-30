using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/payment")]
public class PaymentController : ControllerBase
{
    [HttpGet]
    public IActionResult Pay()
    {
        return Ok(new { message = "Payment Service Working (Dummy)" });
    }
}