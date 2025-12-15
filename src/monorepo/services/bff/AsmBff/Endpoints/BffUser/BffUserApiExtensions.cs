using AsmBff.Endpoints.BffUser.Operations;

namespace AsmBff.Endpoints.BffUser;

public static class BffUserApiExtensions
{
    extension(IEndpointRouteBuilder endpoints)
    {
        internal IEndpointRouteBuilder MapBffUserApi()
        {
            var group = endpoints.MapGroup("/bff").WithTags("BffUser").WithDisplayName("Backend For Frontend User")
                .WithDescription("Endpoints for managing the Backend For Frontend (BFF) user.");

            group.MapGet("/user", UserGet.Handle)
                .WithName("BffUser_Get")
                .WithSummary("Gets the current BFF user information.")
                .WithDescription("Gets the current BFF user information.")
                .AllowAnonymous();

            group.MapGet("/login", GetLogin.Handle)
                .WithName("BffUser_Login")
                .WithSummary("Initiates the login process for the BFF user.")
                .WithDescription("Initiates the login process for the BFF user.")
                .AllowAnonymous();

            group.MapGet("/logout", GetLogout.Handle)
                .WithName("BffUser_Logout")
                .WithSummary("Initiates the logout process for the BFF user.")
                .WithDescription("Initiates the logout process for the BFF user.");

            return endpoints;
        }
    }
}