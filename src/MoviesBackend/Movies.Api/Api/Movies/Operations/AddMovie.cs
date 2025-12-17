using Marten;
using Microsoft.AspNetCore.Http.HttpResults;
using Movies.Api.Api.Movies.Entities;
using Movies.Api.Api.Movies.Models;

namespace Movies.Api.Api.Movies.Operations;

public static class AddMovie
{
    public static async  Task<Created<MovieDetailsResponse>> Process(MovieCreateRequest request, IDocumentSession session)
    {
        var entity = new MovieEntity()
        {
            Id = Guid.NewGuid(),
            Title = request.Title,
            Director = request.Director,
            ReleaseDate = request.ReleaseDate,
            Genre = request.Genre,
            Ratings = request.Ratings,
            Cast = request.Cast,
            Duration = request.Duration,
            CreatedAt = DateTime.UtcNow,
            Version = 1
        };
        session.Store(entity);
        await session.SaveChangesAsync();
        var response = new MovieDetailsResponse()
        {
            Id = entity.Id,
            Title = entity.Title,
            Director = entity.Director,
            ReleaseDate = entity.ReleaseDate,
            Genre = entity.Genre,
            Ratings = entity.Ratings,
            Cast = entity.Cast,
            Duration = entity.Duration
        };
        return TypedResults.Created($"/api/movies/{entity.Id}", response);
    }
}