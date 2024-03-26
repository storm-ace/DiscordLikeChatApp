using Microsoft.IdentityModel.Tokens;
using System.Security.Cryptography;
using System.Text;
using System.Xml.Serialization;

namespace DiscordLikeBackend.Utils
{
	public class RsaEncrptionService
	{
		internal static RsaSecurityKey _securityKey;
		private static RSACryptoServiceProvider _csp = new(2048);
		private static RSAParameters _rsaPrivateKey;
		private static RSAParameters _rsaPublicKey;

		public RsaEncrptionService()
        {
			if (Directory.Exists("keys"))
			{
				var keys = Directory.GetFiles("keys");
				
			}

			_rsaPrivateKey = _csp.ExportParameters(true);
			_rsaPublicKey = _csp.ExportParameters(false);
			_securityKey = new(_rsaPrivateKey);
		}

		public static string GetPublicKey()
		{
			StringWriter sw = new();
			XmlSerializer xmlSerializer = new(typeof(RSAParameters));
			xmlSerializer.Serialize(sw, _rsaPublicKey);
			return sw.ToString();
		}

		public static string GetPrivateKey()
		{
			StringWriter sw = new();
			XmlSerializer xmlSerializer = new(typeof(RSAParameters));
			xmlSerializer.Serialize(sw, _rsaPrivateKey);
			return sw.ToString();
		}

		public static string Enscript(string plainText)
		{
			_csp = new();
			_csp.ImportParameters(_rsaPublicKey);
			byte[] dataBytes = Encoding.Unicode.GetBytes(plainText);
			byte[] cypherData = _csp.Encrypt(dataBytes, false);
			return Convert.ToBase64String(cypherData);
		}

		public static string Decript(string plainText)
		{
			byte[] dataBytes = Convert.FromBase64String(plainText);
			_csp.ImportParameters(_rsaPrivateKey);
			byte[] plainTextBytes = _csp.Decrypt(dataBytes, false);
			return Encoding.Unicode.GetString(plainTextBytes);
		}
	}
}
