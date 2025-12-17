using System.Text;
using Microsoft.AspNetCore.Antiforgery;
using NetEscapades.AspNetCore.SecurityHeaders;
using Yarp.ReverseProxy.Transforms;

namespace MoviesBff.Extensions.Yarp.Transforms;

internal sealed class ReplaceAntiforgeryPlaceholderTransform(
    IAntiforgery antiforgery,
    IHostEnvironment environment) : ResponseTransform
{
    public override async ValueTask ApplyAsync(ResponseTransformContext context)
    {
        if (context.ProxyResponse is null) return;
        var stream =
            await context.ProxyResponse.Content.ReadAsStreamAsync();
        using var reader = new StreamReader(stream);
        // TODO: size limits, timeouts
        var body = await reader.ReadToEndAsync();

        if (!string.IsNullOrEmpty(body))
        {
            context.SuppressResponseBody = true;
            var nonce = context.HttpContext.GetNonce();

            body = body.Replace("PLACEHOLDER_NONCE_SERVER", nonce);
            if (environment.IsDevelopment())
            {
                // do nothing in development, Angular > 18.1.0 adds the nonce automatically
                var viteScriptToUpdate = """<script type="module" src="/@vite/client"></script>""";
                body = body.Replace(viteScriptToUpdate,
                    $"""<script type="module" src="/@vite/client" nonce="{nonce}"></script>""");
            }

            var nonceLinkStyle = $"<link nonce=\"{nonce}\" rel=\"stylesheet";
            body = body.Replace("<link rel=\"stylesheet", nonceLinkStyle);

            var xsrf = antiforgery.GetAndStoreTokens(context.HttpContext);
            var requestToken = xsrf.RequestToken;
            var bytes = Encoding.UTF8.GetBytes(body);
            // Change Content-Length to match the modified body, or remove it
            context.HttpContext.Response.ContentLength = bytes.Length;
            // Response headers are copied before transforms are invoked, update
            // any needed headers on the HttpContext.Response
            context.HttpContext.Response.Cookies.Append("XSRF-RequestToken", requestToken ?? "",
                new CookieOptions
                    { HttpOnly = false, IsEssential = true, Secure = true, SameSite = SameSiteMode.Strict });

            await context.HttpContext.Response.Body.WriteAsync(bytes);
        }
    }
}