
using Duende.AccessTokenManagement.OpenIdConnect;
using MoviesBff.Endpoints.BffUser;
using MoviesBff.Extensions.Auth;
using MoviesBff.Extensions.Yarp;
using ServiceDefaults;


var builder = WebApplication.CreateBuilder(args);

builder.WebHost.ConfigureKestrel(options => { options.AddServerHeader = false; });
builder.AddServiceDefaults();
builder.AddBffYarpReverseProxy();
builder.AddAuthenticationSchemes();
builder.Services.AddOpenIdConnectAccessTokenManagement();
builder.Services.AddProblemDetails();

var app = builder.Build();

app.UseAuthentication();
app.UseAuthorization();
app.UseStatusCodePages();
app.UseExceptionHandler();

app.MapBffUserApi();

app.MapReverseProxy();


app.MapDefaultEndpoints();


app.Run();