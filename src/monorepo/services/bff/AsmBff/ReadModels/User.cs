namespace AsmBff.ReadModels;

public class UserIdentity
{
    public Guid Id { get; set; }
    public string SubClaim { get; set; } = string.Empty;
}