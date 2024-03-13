using DiscordLikeBackend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace DiscordLikeBackend.Utils
{
	public class JwtService
	{
		public static string GenerateToken(UserModel user)
		{
			JwtSecurityTokenHandler tokenHandler = new();
			byte[] key = Encoding.ASCII.GetBytes(RsaEncrptionService.GetPrivateKey());

			SecurityTokenDescriptor tokenDescriptor = new()
			{
				Subject = new ClaimsIdentity(new[]
				{
					new Claim(ClaimTypes.Thumbprint, user.Snowflake.ToString())
				}),
				Expires = DateTime.UtcNow.AddHours(1),
				SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256)
			};

			var token = tokenHandler.CreateToken(tokenDescriptor);
			return tokenHandler.WriteToken(token);
		}

		public static TokenResult CheckToken(string token)
		{
			try
			{
				// Decode the token
				var handler = new JwtSecurityTokenHandler();
				var jsonToken = handler.ReadToken(token) as JwtSecurityToken;

				// Access token claims (long)
				_ = long.TryParse(jsonToken.Claims.First().Value, out long result);
				
				return new TokenResult() 
				{
					success = true,
					token = token,
					snowflake = result,
					expires = (long)jsonToken.Payload.Expiration
				};
			}
			catch (Exception)
			{
				return new TokenResult {
					success = false,
					error = "Invalid user ID in the token."
				};
			}
		}
	}

	public class TokenResult
	{
		public bool success = false;
		public string token { get; set; }
		public long snowflake { get; set; }
		public long expires { get; set; }
		public string error { get; set; }
	}
}
