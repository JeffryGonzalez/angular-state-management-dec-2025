using AsmBff.Extensions.Yarp;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.OpenIdConnect;
using Microsoft.AspNetCore.Http.HttpResults;

namespace AsmBff.Endpoints.BffUser.Operations;

public static class GetLogout
{
    public static SignOutHttpResult Handle(string? returnUrl, HttpContext context)
    {
        var properties = new AuthenticationProperties
        {
            RedirectUri = context.BuildRedirectUrl(returnUrl)
        };

        return TypedResults.SignOut(properties,
            [CookieAuthenticationDefaults.AuthenticationScheme, OpenIdConnectDefaults.AuthenticationScheme]);
    }
}