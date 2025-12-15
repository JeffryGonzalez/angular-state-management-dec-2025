using System.Net.Http.Headers;
using Duende.AccessTokenManagement.OpenIdConnect;


namespace AsmBff.Extensions.Yarp.Transforms;

internal sealed class AddBearerTokenToHeadersTransform(ILogger<AddBearerTokenToHeadersTransform> logger)
    : RequestTransform
{
    public override async ValueTask ApplyAsync(RequestTransformContext context)
    {
        if (context.HttpContext.User.Identity is not { IsAuthenticated: true }) return;

        // This also handles token refreshes
        var accessToken = await context.HttpContext.GetUserAccessTokenAsync();
        if (!accessToken.Succeeded)
        {
            logger.LogError(
                "Could not get access token: {GetUserAccessTokenError} for request path: {RequestPath}. {Error}",
                accessToken.FailedResult.Error, context.HttpContext.Request.Path.Value,
                accessToken.FailedResult.ErrorDescription);
            return;
        }

        logger.LogInformation("Adding bearer token to request headers for request path: {RequestPath}",
            context.HttpContext.Request.Path.Value);
        // All the Cookies are removed when using a proxy request. Which is good. We don't want to give out cookies for free.
        context.ProxyRequest.Headers.Authorization =
            new AuthenticationHeaderValue("Bearer", accessToken.Token.AccessToken);
    }
}