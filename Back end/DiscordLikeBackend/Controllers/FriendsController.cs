using DiscordLikeBackend.Data;
using DiscordLikeBackend.Models;
using DiscordLikeBackend.Utils;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
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
		public IActionResult SendFriendRequest([FromBody] FriendModel model)
		{
			if (ModelState.ErrorCount > 0) return BadRequest();

			var checkToken = JwtService.CheckToken(model.Token);

			if (!checkToken.success) return BadRequest("Token expired.");

			UserModel? user = _context.Users.Where(userDB => userDB.Snowflake == checkToken.snowflake).SingleOrDefault();

			if (user == null) return BadRequest("Token expired.");

			UserModel? friend = _context.Users.Where(userDB => userDB.Username == model.FriendName).SingleOrDefault();

			if (model.FriendName == user.Username) return BadRequest("Can't add yourself!");
			if (friend == null) return NotFound("User does not exist.");
			if (friend.FriendRequests.Contains(user.Snowflake)) return BadRequest("You already requested a friend request to this person.");
			if (user.FriendList.Contains(friend.Snowflake)) return BadRequest("You already friends with this person.");

			user.FriendRequests.Add(friend.Snowflake);
			friend.FriendRequests.Add(checkToken.snowflake);
			_context.Users.Update(friend);
			_context.SaveChanges();

			return Ok(new {success = true, user.FriendRequests});
		}

		[HttpPost("AcceptFriendRequest")]
		public IActionResult AcceptFriendRequest([FromBody] FriendModel model)
		{
			if (ModelState.ErrorCount > 0) return BadRequest();

			var checkToken = JwtService.CheckToken(model.Token);

			if (!checkToken.success) return BadRequest("Token expired.");

			UserModel? user = _context.Users.Where(userDB => userDB.Snowflake == checkToken.snowflake).SingleOrDefault();

			if (user == null) return BadRequest("Token expired.");

			return Ok(user);
		}

		[HttpGet("GetFriends")]
		public IActionResult GetFriends(string token)
		{
			var checkToken = JwtService.CheckToken(token);

			if (!checkToken.success) return BadRequest("Token expired.");

			UserModel? user = _context.Users.Where(userDB => userDB.Snowflake == checkToken.snowflake).SingleOrDefault();

			if (user == null) return BadRequest("Token expired.");

			List<FriendResponse> friendsList = new();

			foreach (var friend in user.FriendList)
			{
				UserModel userFound = _context.Users.Where(u => u.Snowflake == friend).Single();
				FriendResponse friendRequest = new()
				{
					Snowflake = userFound.Snowflake,
					Username = userFound.Username,
					State = Enum.GetName(typeof(UserState), userFound.State),
				};

				friendsList.Add(friendRequest);
			}

			return Ok(new { friends = JsonConvert.SerializeObject(friendsList) });
		}

		[HttpGet("GetOnlineFriends")]
		public IActionResult GetOnlineFriends(string token)
		{
			var checkToken = JwtService.CheckToken(token);

			if (!checkToken.success) return BadRequest("Token expired.");

			UserModel? user = _context.Users.Where(userDB => userDB.Snowflake == checkToken.snowflake).SingleOrDefault();

			if (user == null) return BadRequest("Token expired.");

			List<FriendResponse> friendsList = new();

			foreach (var friend in user.FriendList)
			{
				UserModel userFound = _context.Users.Where(u => u.Snowflake == friend).Single();
				if (userFound.State == UserState.Offline) continue;
				
				FriendResponse friendRequest = new()
				{
					Snowflake = userFound.Snowflake,
					Username = userFound.Username,
					State = Enum.GetName(typeof(UserState), userFound.State),
				};

				friendsList.Add(friendRequest);
			}

			return Ok(new { friends = JsonConvert.SerializeObject(friendsList) });
		}
	}
}
