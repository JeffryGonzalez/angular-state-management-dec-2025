namespace Commands.Identity;


public record CreateUser(Guid UserId, string SubClaim);


public record CreateBffUser(Guid UserId, string SubClaim);