using DiscordLikeBackend.Data;
using DiscordLikeBackend.Models;
using Microsoft.AspNetCore.Mvc;
using DiscordLikeBackend.Utils;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using Org.BouncyCastle.Bcpg.OpenPgp;
using System.Security.Cryptography;

namespace DiscordLikeBackend.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class AuthController : ControllerBase
	{
		private readonly BackendContext _context;
		private readonly ILogger<AuthController> _logger;

		public AuthController(BackendContext context, ILogger<AuthController> logger)
		{
			_context = context;
			_logger = logger;
		}

		[HttpPost("login")]
		public IActionResult Login([FromBody] UserModel user)
		{
			// Check if the email or password is not empty
			if (string.IsNullOrEmpty(user.Username) || string.IsNullOrEmpty(user.Password))
				return BadRequest("Email or password is empty");

			// Check if the user exists in the database
			UserModel? userInDB = _context.Users.Where(userDB => userDB.Username == user.Username).SingleOrDefault();

			// Check if the user is valid
			if (userInDB == null || !BCrypt.Net.BCrypt.Verify(user.Password, userInDB.Password))
				return NotFound("Email or password is invalid");

			var jwtToken = JwtService.GenerateToken(userInDB);
			_logger.Log(LogLevel.Information, jwtToken);

			userInDB.State = UserState.Online;
			_context.Users.Update(userInDB);
			_context.SaveChanges();

			return Ok(new { Success = true, Token = jwtToken });
		}

		[HttpPost("register")]
		public IActionResult Register(string username, string password)
		{
			if (string.IsNullOrEmpty(username) || string.IsNullOrEmpty(username))
			{
				return BadRequest("Username or password is empty");
			}

			// Check if the email is already registered
			if (_context.Users.Any(u => u.Username == username))
			{
				return Conflict("Username is already registered");
			}

			// Generate a Snowflake ID (replace SnowflakeGenerator with your actual Snowflake generator logic)
			long snowflakeId = SnowflakeGenerator.GenerateSnowflake(SnowflakeType.Account);

			// Hash the password before storing it
			string hashedPassword = BCrypt.Net.BCrypt.HashPassword(password);

			UserModel user = new()
			{
				Snowflake = snowflakeId,
				Username = username,
				Password = hashedPassword,
				State = UserState.Online
			};

			// Create a new user
			user.Snowflake = snowflakeId;

			// Generate a new token
			var newToken = JwtService.GenerateToken(user);

			// Add the user to the database
			_context.Users.Add(user);
			_context.SaveChanges();

			return Ok(new { Success = true, Token = newToken });
		}

		[HttpGet("loginWithToken")]
		public IActionResult LoginWithToken([FromQuery] string token)
		{
			if (string.IsNullOrEmpty(token)) return BadRequest("Token is missing");

			var checkToken = JwtService.CheckToken(token);

			if (!checkToken.success) return BadRequest("Invalid token!");

			return Ok(checkToken);
		}

		[HttpGet("{snowflake}")]
		public ActionResult GetSnowflakeDetails(long snowflake)
		{
			long timestamp = SnowflakeGenerator.ExtractTimestamp(snowflake);
			SnowflakeType snowflakeType = SnowflakeGenerator.ExtractSnowflakeType(snowflake);
			long sequence = SnowflakeGenerator.ExtractSequence(snowflake);

			DateTime dateTime = DateTimeOffset.FromUnixTimeMilliseconds(timestamp).UtcDateTime;
			string formattedDateTime = dateTime.ToString("yyyy-MM-dd HH:mm:ss");

			var snowflakeDetails = new
			{
				Timestamp = timestamp,
				FormattedDateTime = formattedDateTime,
				SnowflakeType = snowflakeType.ToString()
			};

			return Ok(snowflakeDetails);
		}
	}
}
