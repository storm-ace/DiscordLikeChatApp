namespace DiscordLikeBackend.Models
{
	public enum UserState
	{
		Online,
		Busy,
		Away,
		Offline
	}

	public class UserModel
	{
		/// <summary>
		/// User ID.
		/// </summary>
		public int Id { get; set; }

		/// <summary>
		/// User's username.
		/// </summary>
		public required string Username { get; set; }

		/// <summary>
		/// User's password.
		/// </summary>
		public required string Password { get; set; }

		/// <summary>
		/// Snowflake identifier.
		/// </summary>
		public long Snowflake { get; set; }

		/// <summary>
		/// List of friend user IDs.
		/// </summary>
		public List<long> FriendList { get; set; } = new List<long>();

		/// <summary>
		/// List of pending friend requests.
		/// </summary>
		public List<long> FriendRequests { get; set; } = new List<long>();

		/// <summary>
		/// User state (Online, Busy, Away, Offline).
		/// </summary>
		public UserState State { get; set; } = UserState.Offline;
	}
}