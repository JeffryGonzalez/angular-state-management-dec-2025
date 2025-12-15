using Commands.Identity;
using HelpDesk.Api;
using JasperFx.Core;
using Marten;
using Wolverine;
using Wolverine.Marten;
using Wolverine.RabbitMQ;

var builder = WebApplication.CreateBuilder(args);
// builder.AddRabbitMQClient("messaging");
var rabbitmqEndpoint = builder.Configuration.GetConnectionString("messaging") ?? throw new Exception("No RabbitMq");

builder.AddNpgsqlDataSource("helpdesk");
builder.Host.UseWolverine(options =>
{
    options.Policies.AutoApplyTransactions();
    options.Policies.AutoApplyTransactions();
    options.LocalQueueFor<CreateUser>().UseDurableInbox();
    options.UseRabbitMq(new Uri(rabbitmqEndpoint)).AutoProvision();
    options.Discovery.IncludeAssembly(typeof(IdentityHandlers).Assembly);

    options.ListenToRabbitQueue("identity")
        .PreFetchCount(100)
        .ListenerCount(5) // use 5 parallel listeners
        .CircuitBreaker(cb =>
        {
            cb.PauseTime = 1.Minutes();
            // 10% failures will cause the listener to pause
            cb.FailurePercentageThreshold = 10;
        })
        .UseDurableInbox();



});

builder.Services.AddMarten(options => { })
    .UseNpgsqlDataSource()
    .IntegrateWithWolverine()
    .UseLightweightSessions();


builder.AddServiceDefaults();
builder.Services.AddOpenApi();



var app = builder.Build();



app.MapOpenApi();
app.MapDefaultEndpoints();
app.Run();