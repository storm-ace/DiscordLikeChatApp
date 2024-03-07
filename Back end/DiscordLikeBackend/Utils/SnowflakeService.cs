using System;

namespace DiscordLikeBackend.Utils
{
	using System;
	using System.Diagnostics;

	public class SnowflakeGenerator
	{
		private static readonly object lockObject = new object();
		private static long lastTimestamp = -1;
		private static long sequence = 0;

		public static long GenerateSnowflake(SnowflakeType snowflakeType)
		{
			long timestamp = GetTimestamp();

			if (timestamp == lastTimestamp)
			{
				sequence = (sequence + 1) & 4095; // 12-bit sequence number
				if (sequence == 0)
				{
					// Wait for the next millisecond
					timestamp = WaitNextMillis(lastTimestamp);
				}
			}
			else
			{
				sequence = 0;
			}

			lastTimestamp = timestamp;

			// Snowflake structure: 41 bits timestamp, 10 bits for type, 12 bits sequence
			long snowflake = ((timestamp - 1630454400000) << 22) | ((long)snowflakeType << 12) | sequence;

			return snowflake;
		}

		private static long GetTimestamp()
		{
			return DateTimeOffset.UtcNow.ToUnixTimeMilliseconds();
		}

		private static long WaitNextMillis(long lastTimestamp)
		{
			long currentTimestamp = GetTimestamp();
			while (currentTimestamp <= lastTimestamp)
			{
				currentTimestamp = GetTimestamp();
			}
			return currentTimestamp;
		}

		public static long ExtractTimestamp(long snowflake)
		{
			// Right shift by 22 bits to extract the timestamp
			return (snowflake >> 22) + 1630454400000;
		}

		public static SnowflakeType ExtractSnowflakeType(long snowflake)
		{
			// Right shift by 12 bits, then mask with 0x3FF (10 bits for SnowflakeType)
			return (SnowflakeType)((snowflake >> 12) & 0x3FF);
		}

		public static long ExtractSequence(long snowflake)
		{
			// Mask with 0xFFF (12 bits for sequence)
			return snowflake & 0xFFF;
		}

		public static async Task StressTestSnowflakeGenerationAsync()
		{
			List<Task<long>> snowflakeTasks = new List<Task<long>>();
			int numberOfSnowflakesToGenerate = 100000; // You can adjust this number

			Stopwatch stopwatch = Stopwatch.StartNew(); // Start tracking time

			for (int i = 0; i < numberOfSnowflakesToGenerate; i++)
			{
				snowflakeTasks.Add(GenerateSnowflakeAsync(SnowflakeType.Chat));
			}

			// Wait for all tasks to complete
			long[] generatedSnowflakes = await Task.WhenAll(snowflakeTasks);

			stopwatch.Stop(); // Stop tracking time

			// Process or analyze the generated snowflakes as needed
			Console.WriteLine($"Generated {numberOfSnowflakesToGenerate} snowflakes.");
			Console.WriteLine($"Time taken: {stopwatch.ElapsedMilliseconds} milliseconds.");

			// Example: Display the first few generated snowflakes
			for (int i = 0; i < Math.Min(10, generatedSnowflakes.Length); i++)
			{
				Console.WriteLine($"Snowflake {i + 1}: {generatedSnowflakes[i]}");
			}
		}

		public static async Task<long> GenerateSnowflakeAsync(SnowflakeType type)
		{
			return await Task.Run(() => GenerateSnowflake(type));
		}
	}

	public enum SnowflakeType
	{
		Account,
		Chat,
		Image,
		Video,
		Chatbox,
		Call
	}
}