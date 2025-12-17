using System.Text.Json.Serialization;
using Movies.Api.Api.Movies.Models;

namespace Movies.Api.Api.Movies.Entities;

public enum MovieGenre
{
    Comedy,
    Action,
    Drama,
    Horror,
    [JsonPropertyName("Sci-Fi")]
    SciFi
}

public class MovieEntity
{
    public Guid Id { get; set; }
    public string Title { get; set; } = string.Empty;
    
    public string Director { get; set; } = string.Empty;
    public int ReleaseDate { get; set; }
    public MovieGenre Genre { get; set; }
    public  int Ratings { get; set; }
    public List<CastMember> Cast { get; set; } = [];
    
    public int Duration { get; set; } 
    public int Version { get; set;  }
    public DateTime CreatedAt { get; set; }
}