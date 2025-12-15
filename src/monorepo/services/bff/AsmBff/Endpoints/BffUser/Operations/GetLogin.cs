using AsmBff.Extensions.Yarp;
using Microsoft.AspNetCore.Authentication;

using Microsoft.AspNetCore.Http.HttpResults;

namespace AsmBff.Endpoints.BffUser.Operations;

public static class GetLogin
{
    public static ChallengeHttpResult Handle(string? returnUrl, string? claimsChallenge, HttpContext context, IConfiguration configuration)
    {
        var properties = new AuthenticationProperties
        {
            RedirectUri = context.BuildRedirectUrl(returnUrl),
        };

        if (claimsChallenge != null)
        {
            string jsonString = claimsChallenge.Replace("\\", "", StringComparison.Ordinal).Trim(['"']);
            properties.Items["claims"] = jsonString;
        }

        return TypedResults.Challenge(properties);
    }
}