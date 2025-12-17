using System.ComponentModel.DataAnnotations;
using System.Threading.Channels;
using Microsoft.AspNetCore.Http.HttpResults;
using Movies.Api.Api.Movies.Services;

namespace Movies.Api.Api.Movies.Operations;

public static class AddRating
{
    public static async Task<Ok> AddRatingToMovie(AddRatingRequest request, Channel<MovieReviewedChannelRequest> channel, CancellationToken stoppingToken)
    {

        // I'm not verifying the movie exists, I'm not saving this.. sue me.
        await channel.Writer.WriteAsync(new MovieReviewedChannelRequest(request),stoppingToken);
        return TypedResults.Ok();
    }
}

public record AddRatingRequest
{
    public required MovieRatingInfo Movie { get; set; } = null!;

    [Range(4,5)]
    public int Rating { get; set; }
    
}
public record MovieRatingInfo(string Id, int Version);