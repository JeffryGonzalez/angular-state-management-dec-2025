using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.OpenIdConnect;
using Microsoft.AspNetCore.Http.HttpResults;
using MoviesBff.Extensions.Yarp;

namespace MoviesBff.Endpoints.BffUser.Operations;

public static class GetLogin
{
    public static ChallengeHttpResult Handle(string? returnUrl, string? claimsChallenge, HttpContext context)
    {
        if (context.User.Identity is { IsAuthenticated: true })
            return TypedResults.Challenge(new AuthenticationProperties
                { RedirectUri = returnUrl, IsPersistent = true });

        var properties = new AuthenticationProperties
        {
            RedirectUri = context.BuildRedirectUrl(returnUrl)
        };

        if (claimsChallenge == null)
            return TypedResults.Challenge(properties, [OpenIdConnectDefaults.AuthenticationScheme]);

        var jsonString = claimsChallenge.Replace("\\", "", StringComparison.Ordinal).Trim(['"']);
        properties.Items["claims"] = jsonString;

        return TypedResults.Challenge(properties, [OpenIdConnectDefaults.AuthenticationScheme]);
    }
}