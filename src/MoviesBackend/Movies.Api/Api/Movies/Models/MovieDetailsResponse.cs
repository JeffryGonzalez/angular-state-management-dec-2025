using System.ComponentModel.DataAnnotations;
using Movies.Api.Api.Movies.Entities;

namespace Movies.Api.Api.Movies.Models;

public record MovieDetailsResponse
{
    public required Guid Id { get; init; }
    [MinLength(1), MaxLength(100)]
    public required string Title { get; init; }
    [MinLength(1), MaxLength(100)]
    public required string Director { get; init; }
    public required int ReleaseDate { get; init; }
    public required MovieGenre Genre { get; init; }
    public required int Ratings { get; init; }
    public List<CastMember> Cast { get; init; } = [];
    [Range(1, 500)]
    public required int Duration { get; init; } // Duration in minutes
   
}