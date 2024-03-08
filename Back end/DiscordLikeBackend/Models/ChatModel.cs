 using System.ComponentModel.DataAnnotations;

namespace DiscordLikeBackend.Models
{
	public class ChatModel
	{
		/// <summary>
		/// Id of the user
		/// </summary>
		[Key]
		public long SnowFlakeId { get; set; }

		/// <summary>
		/// User's in the chat
		/// </summary>
		public required List<long> Participants { get; set; }

		/// <summary>
		/// Messages of the user's
		/// </summary>
		public required List<MessageModel> Messages { get; set; }
	}

	public class MessageModel
	{
		[Key]
		public long ChatSnowFlakeId { get; set; }

		public long senderSnowFlakeId { get; set; }

		public required string Content { get; set; }
    }
}
