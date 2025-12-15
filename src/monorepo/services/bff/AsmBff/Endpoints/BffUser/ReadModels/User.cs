namespace AsmBff.Endpoints.BffUser.ReadModels;

public record User
{
    public required bool IsAuthenticated { get; init; }
    public string? Name { get; init; }
    public Guid Id { get; init; }
    public IEnumerable<UserClaim> Claims { get; init; } = [];
}

public sealed class UserClaim
{
    public required string Type { get; init; }
    public required string Value { get; init; }
}