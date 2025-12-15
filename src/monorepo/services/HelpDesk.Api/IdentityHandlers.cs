using Commands.Identity;
using Marten;


using Wolverine.Attributes;

namespace HelpDesk.Api;


public record UserCreated(Guid Id);
[WolverineHandler]

public static class IdentityHandlers
{
    public static async Task HandleAsync(CreateUser command, IDocumentSession session)
    {
      
        session.Events.Append(command.UserId, new UserCreated(command.UserId));
        
        await session.SaveChangesAsync();
       
    }
}