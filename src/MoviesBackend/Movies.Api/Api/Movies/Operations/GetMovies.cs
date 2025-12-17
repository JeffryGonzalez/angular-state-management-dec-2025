using Marten;
using Microsoft.AspNetCore.Http.HttpResults;
using Movies.Api.Api.Movies.Entities;
using Movies.Api.Api.Movies.Models;

namespace Movies.Api.Api.Movies.Operations;

public static class GetMovies
{
    public static async Task<Ok<IReadOnlyList<MovieDetailsResponse>>> All(IDocumentSession session, CancellationToken ct)
    {
        var data = await session.Query<MovieEntity>()
            .Select(m => new MovieDetailsResponse
            {
                Id = m.Id,
                Title = m.Title,
                Director = m.Director,
                ReleaseDate = m.ReleaseDate,
                Genre = m.Genre,
                Ratings = m.Ratings,
                Cast = m.Cast,
                Duration = m.Duration
            }).ToListAsync(ct);
        
        return TypedResults.Ok(data);
    }
    
    public static async Task<Results<Ok<MovieDetailsResponse>, NotFound>> Single(Guid id, IDocumentSession session, CancellationToken ct)
    {
        var data = await session.Query<MovieEntity>()
            .Where(m => m.Id == id)
            .Select(m => new MovieDetailsResponse
            {
                Id = m.Id,
                Title = m.Title,
                Director = m.Director,
                ReleaseDate = m.ReleaseDate,
                Genre = m.Genre,
                Ratings = m.Ratings,
                Cast = m.Cast,
                Duration = m.Duration
            }).SingleOrDefaultAsync(ct);
        
        return data switch 
        {
            null => TypedResults.NotFound(),
            _ => TypedResults.Ok(data)
        };
      
    }
}