using System.Threading.Channels;

namespace Movies.Api.Api.Movies.Services;

public class RatingsWorker(Channel<MovieReviewedChannelRequest> channel, ILogger<RatingsWorker> logger, RatingService service) : BackgroundService
{
    
    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        logger.LogInformation("Starting ratings worker...");
        while (await channel.Reader.WaitToReadAsync(stoppingToken))
        {
            var request = await channel.Reader.ReadAsync(stoppingToken);
            service.Set(request.Rating);
        }
    }
}