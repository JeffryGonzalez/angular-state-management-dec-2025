using Microsoft.AspNetCore.Antiforgery;


namespace AsmBff.Extensions.Yarp.Transforms;

internal sealed class ValidateAntiforgeryTokenRequestTransform(
    IAntiforgery antiforgery,
    ILogger<ValidateAntiforgeryTokenRequestTransform> logger) : RequestTransform
{
    public override async ValueTask ApplyAsync(RequestTransformContext context)
    {
     
        logger.LogDebug("Protocol on request is {Scheme}", context.HttpContext.Request.Scheme);
        if (IsSafeHttpOperation(context))
            return;

  
        if (context.HttpContext.Request.Headers.ContentType.Contains("application/x-protobuf")) return;

       
        logger.LogInformation("Validating antiforgery token for request path: {RequestPath}",
            context.HttpContext.Request.Path.Value);

        try
        {
            await antiforgery.ValidateRequestAsync(context.HttpContext);
        }
        catch (AntiforgeryValidationException ex)
        {
            context.HttpContext.Response.StatusCode = StatusCodes.Status400BadRequest;
            logger.LogWarning(ex, "Antiforgery token validation failed for request path: {RequestPath}.",
                context.HttpContext.Request.Path.Value);
        }
    }

    private static bool IsSafeHttpOperation(RequestTransformContext context)
    {
        return context.HttpContext.Request.Method == HttpMethod.Get.Method ||
               context.HttpContext.Request.Method == HttpMethod.Head.Method ||
               context.HttpContext.Request.Method == HttpMethod.Options.Method ||
               context.HttpContext.Request.Method == HttpMethod.Trace.Method;
    }
}