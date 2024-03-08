using DiscordLikeBackend.Data;
using DiscordLikeBackend.Models;
using DiscordLikeBackend.Utils;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace DiscordLikeBackend.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class FriendsController : ControllerBase
	{
		private readonly BackendContext _context;
		private readonly ILogger<FriendsController> _logger;

		public FriendsController(BackendContext context, ILogger<FriendsController> logger)
        {
			_context = context;
			_logger = logger;
		}

		[HttpPost("SendFriendRequest")]
		public IActionResult SendFriendRequest([FromBody] FriendRequestModel model)
		{
			if (ModelState.ErrorCount > 0) return BadRequest();

			var checkToken = JwtService.CheckToken(model.Token);

			if (!checkToken.success) return BadRequest("Token expired.");

			UserModel? user = _context.Users.Where(userDB => userDB.Snowflake == checkToken.snowflake).SingleOrDefault();

			if (user == null) return BadRequest("Token expired.");

			UserModel? friend = _context.Users.Where(userDB => userDB.Username == model.FriendName).SingleOrDefault();

			if (model.FriendName == user.Username) return BadRequest("Can't add yourself!");
			if (friend == null) return NotFound("User does not exist.");
			if (friend.FriendRequests.Contains(user.Snowflake)) return BadRequest("You already requested it.");

			user.FriendRequests.Add(friend.Snowflake);
			friend.FriendRequests.Add(checkToken.snowflake);
			_context.Users.Update(friend);
			_context.SaveChanges();

			return Ok(new {success = true, user.FriendRequests});
		}
	}
}
