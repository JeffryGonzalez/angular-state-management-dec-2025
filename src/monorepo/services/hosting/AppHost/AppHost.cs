using System.Security.Cryptography.X509Certificates;
using AppHost;

var builder = DistributedApplication.CreateBuilder(args);
// Load your custom certificates
builder.AddDockerComposeEnvironment("compose");
var identity = builder.AddMockOidcDevelopmentServer();

var angularFrontend = builder
    .AddNpmApp("angular-frontend", "../../../frontend/", "start:home:aspire")
    .WithEnvironment("PORT", () => "4250")
    // .WithEnvironment("PORT", "4250")
     .WithHttpEndpoint(targetPort:4250, port:4200)
    .PublishAsDockerFile()
    .WithExplicitStart();

var username = builder.AddParameter("username", "user");
var password = builder.AddParameter("password", "password");
var postgres = builder.AddPostgres("postgres", username, password, 5432)
    .WithLifetime(ContainerLifetime.Persistent)
    .WithImage("postgres:17.5"); // You can use "custom" images too.

var rabbit = builder.AddRabbitMQ("messaging").WithLifetime(ContainerLifetime.Persistent);



var helpdeskDb = postgres.AddDatabase("helpdesk");
var bffdb = postgres.AddDatabase("bff");

var helpDeskApi = builder.AddProject<Projects.HelpDesk_Api>("help-desk")
    .WithReference(helpdeskDb)
    .WithIdentityOpenIdAuthority(identity)
    .WithReference(rabbit)

    .WithIdentityOpenIdBearer(identity)
    .WaitFor(helpdeskDb)
    .WaitFor(rabbit);


var xGateway = builder.AddProject<Projects.AsmBff>("gateway")
    .WithIdentityOpenIdAuthority(identity)
    .WithReference(bffdb)
    .WaitFor(bffdb)
    .WithReference(rabbit)
    .WithIdentityOpenIdBearer(identity)
    .WithReference(helpDeskApi)
    .WaitFor(helpDeskApi)
    .WaitFor(rabbit)
    .WithReference(angularFrontend);
builder.Build().Run();