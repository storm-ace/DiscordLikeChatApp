
using DiscordLikeBackend.Data;
using DiscordLikeBackend.Utils;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace DiscordLikeBackend
{
	public class Program
	{
		public static void Main(string[] args)
		{
			new RsaEncrptionService();

			var builder = WebApplication.CreateBuilder(args);

			builder.Services.AddDbContext<BackendContext>(options => options.UseMySQL("server=localhost;database=discord_lite;user=root;"));
			builder.Services.AddLogging(builder => builder.AddConsole());
			builder.Services.AddControllers();
			builder.Services.AddEndpointsApiExplorer();
			builder.Services.AddSwaggerGen();

			builder.Services.AddCors(options =>
			{
				options.AddPolicy("CorsPolicy", builder =>
				{
					builder.AllowAnyOrigin()
						.AllowAnyMethod()
						.AllowAnyHeader();
				});
			});

			builder.Services.AddAuthentication(options =>
			{
				options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
				options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
			}).AddJwtBearer(options =>
			{
				options.TokenValidationParameters = new TokenValidationParameters
				{
					ValidateIssuer = true,
					ValidateAudience = true,
					ValidateIssuerSigningKey = true,
					ValidIssuer = "https://discordlikebackend.com",
					ValidAudience = "123",
					IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("discordlikekey"))
				};
			});

			var app = builder.Build();

			if (app.Environment.IsDevelopment())
			{
				app.UseSwagger();
				app.UseSwaggerUI();

				using (var scope = app.Services.CreateScope())
				{
					var db = scope.ServiceProvider.GetRequiredService<BackendContext>();
					db.Database.Migrate();
				}
			}

			app.UseHttpsRedirection();

			app.UseAuthorization();

			app.UseCors("CorsPolicy");

			app.MapControllers();

			app.Run();
		}
	}
}
