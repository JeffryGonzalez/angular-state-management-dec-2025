using AsmBff.Extensions.Yarp.Transforms;


namespace AsmBff.Extensions.Yarp;

public static class YarpExtensions
{
    extension(IHostApplicationBuilder builder)
    {
        public IHostApplicationBuilder AddBffYarpReverseProxy()
        {
            builder.Services.AddSingleton<AddBearerTokenToHeadersTransform>();
            builder.Services.AddSingleton<AddAntiforgeryTokenResponseTransform>();
            builder.Services.AddSingleton<ValidateAntiforgeryTokenRequestTransform>();
            builder.Services.AddSingleton<ReplaceAntiforgeryPlaceholderTransform>();
            builder.Services.AddSingleton<LoggingRequestTransform>();
            
            builder.Services
                .AddReverseProxy()
                .LoadFromConfig(builder.Configuration.GetSection("ReverseProxy"))
                .AddTransforms(builderContext =>
                {
                   
                    if (!builder.Environment.IsDevelopment())  // todo: Make this configurable - I added this because I couldn't get HMR to work with antiforgery in dev.
                    {
                        builderContext.RequestTransforms.Add(
                            builderContext.Services.GetRequiredService<ValidateAntiforgeryTokenRequestTransform>());
                        
                        builderContext.ResponseTransforms.Add(builderContext.Services
                            .GetRequiredService<AddAntiforgeryTokenResponseTransform>());
                        
                        builderContext.ResponseTransforms.Add(builderContext.Services
                            .GetRequiredService<ReplaceAntiforgeryPlaceholderTransform>());
                    }
                    else
                    {
                        builderContext.RequestTransforms.Add(builderContext.Services.GetRequiredService<LoggingRequestTransform>());
                    }

                    builderContext.RequestTransforms.Add(new RequestHeaderRemoveTransform("Cookie"));

                    if (!string.IsNullOrEmpty(builderContext.Route.AuthorizationPolicy) &&
                        builderContext.Route.AuthorizationPolicy != "Anonymous")
                        builderContext.RequestTransforms.Add(builderContext.Services
                            .GetRequiredService<AddBearerTokenToHeadersTransform>());
                })
                .AddServiceDiscoveryDestinationResolver();


            return builder;
        }
    }


    extension(HttpContext context)
    {
        public string BuildRedirectUrl(string? redirectUrl)
        {
            if (string.IsNullOrEmpty(redirectUrl))
            {
                redirectUrl = "/";
            }
            if (redirectUrl.StartsWith('/'))
            {
                redirectUrl = context.Request.Scheme + "://" + context.Request.Host + context.Request.PathBase + redirectUrl;
            }
            return redirectUrl;
        }
    }
}