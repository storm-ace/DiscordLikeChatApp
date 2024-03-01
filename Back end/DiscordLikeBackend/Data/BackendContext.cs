using DiscordLikeBackend.Models;
using Microsoft.EntityFrameworkCore;

namespace DiscordLikeBackend.Data
{
	public class BackendContext : DbContext
	{
		public BackendContext(DbContextOptions<BackendContext> dbContextOptions) : base(dbContextOptions) 
		{
			Database.GenerateCreateScript();
		}

		public DbSet<UserModel> Users { get; set; }
	}
}
