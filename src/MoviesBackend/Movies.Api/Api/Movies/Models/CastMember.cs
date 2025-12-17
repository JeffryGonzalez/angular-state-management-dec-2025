using System.ComponentModel.DataAnnotations;

namespace Movies.Api.Api.Movies.Models;

public record CastMember
{
    [MinLength(1), MaxLength(50)]
    public required string Name { get; init; }
    [MinLength(1), MaxLength(50)]
    public required string Role { get; init; }
}