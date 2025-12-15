using System.Security.Claims;
using AsmBff.Endpoints.BffUser.ReadModels;
using AsmBff.ReadModels;
using Marten;
using Microsoft.AspNetCore.Http.HttpResults;
using Wolverine;

namespace AsmBff.Endpoints.BffUser.Operations;

public static class UserGet
{
    public static async Task<Ok<User>> Handle(ClaimsPrincipal principal, IDocumentSession session, IMessageContext bus)
    {
        switch (principal)
        {
            case { Identity.IsAuthenticated: true }:
                var subClaim = principal.FindFirstValue("sub")!;
                var storedUser = await session.Query<UserIdentity>().FirstOrDefaultAsync(u => u.SubClaim == subClaim);

                if (storedUser is null)
                {
                    var command = new Commands.Identity.CreateUser(Guid.NewGuid(), subClaim);

                    await bus.InvokeAsync(command);
                    return TypedResults.Ok(new User
                    {
                        IsAuthenticated = true,
                        Name = subClaim,
                        Id = command.UserId,
                        Claims = principal.Claims.Select(c => new UserClaim { Type = c.Type, Value = c.Value })
                    });
                }

                break;
        }

        return TypedResults.Ok(new User { IsAuthenticated = false, Name = null });
    }
}