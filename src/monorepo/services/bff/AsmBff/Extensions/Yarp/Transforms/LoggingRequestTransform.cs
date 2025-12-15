namespace AsmBff.Extensions.Yarp.Transforms;

internal sealed class LoggingRequestTransform(ILogger<LoggingRequestTransform> _logger) : RequestTransform
{
    public override ValueTask ApplyAsync(RequestTransformContext context)
    {
        if (context.HttpContext.Request.Scheme.Contains("wss"))
        {
            _logger.LogInformation("Proxying request {Protocol} {Path} {Method} to {Destination}",
                context.HttpContext.Request.Protocol,
                context.HttpContext.Request.Method,
                context.HttpContext.Request.Path + context.HttpContext.Request.QueryString,

                context.DestinationPrefix);
        }

        return ValueTask.CompletedTask;
    }
}