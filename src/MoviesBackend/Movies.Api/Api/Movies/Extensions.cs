using Movies.Api.Api.Movies.Services;

namespace Movies.Api.Api.Movies;

public static class Extensions
{
    extension(IEndpointRouteBuilder endpoints)
    {
        public IEndpointRouteBuilder MapMoviesApi()
        {
            var group = endpoints.MapGroup("/api/movies").WithTags("Movies").WithDisplayName("Movies API");

            group.MapPost("/", Operations.AddMovie.Process).WithDisplayName("Add movie");
            group.MapGet("/", Operations.GetMovies.All).WithDisplayName("Get movies");
            group.MapGet("/{id:guid}", Operations.GetMovies.Single).WithDisplayName("Get a movie");
            group.MapPost("/ratings", Operations.AddRating.AddRatingToMovie).WithDisplayName("Add movie rating");

            group.MapGet("/ratings-channel", (RatingService ratingService, CancellationToken token) => 
                TypedResults.ServerSentEvents(ratingService.GetMovieRating(token), eventType:"rating"));
            return endpoints;
        }
    }
}