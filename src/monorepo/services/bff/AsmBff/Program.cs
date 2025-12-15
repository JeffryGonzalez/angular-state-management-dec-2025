using AsmBff.Endpoints.BffUser;
using AsmBff.Extensions.Auth;
using AsmBff.Extensions.Yarp;
using Commands.Identity;
using Duende.AccessTokenManagement.OpenIdConnect;
using Marten;
using Wolverine;
using Wolverine.Marten;
using Wolverine.RabbitMQ;

var builder = WebApplication.CreateBuilder(args);
// builder.AddRabbitMQClient("messaging");
var rabbitmqEndpoint = builder.Configuration.GetConnectionString("messaging") ?? throw new Exception("No RabbitMq");
builder.AddNpgsqlDataSource("bff");
builder.Host.UseWolverine(options =>
{
    options.Policies.AutoApplyTransactions();
    options.Policies.AutoApplyTransactions();
    options.UseRabbitMq(new Uri(rabbitmqEndpoint))
        .AutoProvision();

    options.PublishMessage<CreateUser>().ToRabbitQueue("identity").UseDurableOutbox();



});

builder.Services.AddMarten(options => { })
    .UseNpgsqlDataSource()
    .IntegrateWithWolverine()
    .UseLightweightSessions();


builder.WebHost.ConfigureKestrel(options => { options.AddServerHeader = false; });
builder.AddServiceDefaults();
builder.Services.AddHttpContextAccessor();

builder.AddBffYarpReverseProxy();
builder.AddAuthenticationSchemes();

builder.Services.AddOpenIdConnectAccessTokenManagement();

builder.Services.AddAntiforgery(options =>
{
    options.HeaderName = "X-XSRF-TOKEN";
    options.Cookie.Name = "__AsmBFF-XSRF-Token";
    options.Cookie.SameSite = SameSiteMode.Strict;
    options.Cookie.SecurePolicy = CookieSecurePolicy.Always;
});


builder.Services.AddProblemDetails();

var app = builder.Build();

app.UseAuthentication();
app.UseAuthorization();
app.UseStatusCodePages();
app.UseExceptionHandler();
app.UseAntiforgery();

app.MapDefaultEndpoints();
app.MapBffUserApi();
app.MapReverseProxy();
app.Run();