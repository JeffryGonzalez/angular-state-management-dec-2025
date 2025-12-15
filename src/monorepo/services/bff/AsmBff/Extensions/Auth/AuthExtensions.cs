using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.OpenIdConnect;
using Microsoft.IdentityModel.Protocols.OpenIdConnect;

namespace AsmBff.Extensions.Auth;

public static class AuthExtensions
{
    extension(IHostApplicationBuilder builder)
    {
        public IHostApplicationBuilder AddAuthenticationSchemes()
        {
            builder.Services.AddAuthentication(options =>
                {
                    options.DefaultScheme = CookieAuthenticationDefaults.AuthenticationScheme;
                    options.DefaultChallengeScheme = OpenIdConnectDefaults.AuthenticationScheme;
                })
                .AddCookie(CookieAuthenticationDefaults.AuthenticationScheme, options =>
                {
                    options.Cookie.Name = "__SoftwareCenterBffAuth";
                    options.Cookie.SameSite = SameSiteMode.Strict;
                    options.Cookie.SecurePolicy = CookieSecurePolicy.Always;
                })
                .AddOpenIdConnect(OpenIdConnectDefaults.AuthenticationScheme, options =>
                {
                    // options.SaveTokens = true;
                    options.MapInboundClaims = false;

                    options.MetadataAddress = options.Authority + "/.well-known/openid-configuration";
                    options.ResponseMode = OpenIdConnectResponseMode.FormPost;
                    options.ResponseType = OpenIdConnectResponseType.Code;
                });

            return builder;
        }
    }
}