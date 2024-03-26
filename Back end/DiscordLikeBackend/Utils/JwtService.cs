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

			SecurityTokenDescriptor tokenDescriptor = new()
			{
				Subject = new ClaimsIdentity(new[]
				{
					new Claim(ClaimTypes.Thumbprint, user.Snowflake.ToString())
				}),
				Expires = DateTime.UtcNow.AddHours(1),
				SigningCredentials = new SigningCredentials(RsaEncrptionService._securityKey, SecurityAlgorithms.RsaSha256),
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
				var key = RsaEncrptionService._securityKey;

				handler.ValidateToken(token, new TokenValidationParameters
				{
					ValidateIssuerSigningKey = true,
					IssuerSigningKey = key,
					ValidateIssuer = false,
					ValidateAudience = false,
					ClockSkew = TimeSpan.Zero
				}, out SecurityToken validatedToken);
				
				if (validatedToken.ValidFrom > DateTime.UtcNow)
					return new TokenResult
					{
						success = false,
						error = $"Token is expired at {validatedToken.ValidTo}!"
					};

				return new TokenResult
				{
					success = true,
					snowflake = long.Parse((handler.ReadToken(token) as JwtSecurityToken).Claims.First().Value),
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
		public long snowflake { get; set; }
		public string? error { get; set; }
	}
}
