using DiscordLikeBackend.Data;
using DiscordLikeBackend.Models;
using DiscordLikeBackend.Utils;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace DiscordLikeBackend.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class ChatController : ControllerBase
	{
		private readonly BackendContext _context;
		private readonly ILogger<ChatController> _logger;

		public ChatController(BackendContext context, ILogger<ChatController> logger)
        {
			_context = context;
			_logger = logger;
		}

		[HttpGet]
		public IActionResult GetChat(long userSnowFlake, long chatSnowFlake)
		{
			var chat = _context.ChatServices
				.Where(c => c.SnowFlakeId == chatSnowFlake)
				.AsEnumerable()
				.Where(c => c.Participants.Contains(userSnowFlake))
				.FirstOrDefault();

			if (chat == null) return BadRequest("Chat does not exist");

			return Ok(new
			{
				Id = chat.SnowFlakeId,
				Participants = chat.Participants.ToList(),
				Messages = chat.Messages.ToList()
			});
		}

		[HttpPost("PostFakeChat")]
		public IActionResult PostTestChat(long userSnowFlake, string message)
		{
			var participants = new List<long>()
			{
				userSnowFlake,
				SnowflakeGenerator.GenerateSnowflakeAsync(SnowflakeType.Account).Result
			};

			var listMessage = new List<MessageModel>()
			{
				new()
				{
					senderSnowFlakeId = userSnowFlake,
					Content = message
				}
			};

			ChatModel chat = new() 
			{ 
				SnowFlakeId = SnowflakeGenerator.GenerateSnowflakeAsync(SnowflakeType.Chat).Result,
				Participants = participants,
				Messages = listMessage
			};

			_context.ChatServices.Add(chat);
			_context.SaveChanges();

			return Ok();
		}
	}
}
