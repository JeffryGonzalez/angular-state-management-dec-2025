using AppHost;
using Scalar.Aspire;

var builder = DistributedApplication.CreateBuilder(args);

var identity = builder.AddMockOidcDevelopmentServer();

var username = builder.AddParameter("username", "user");
var password = builder.AddParameter("password", "password");
var postgres = builder.AddPostgres("postgres", username, password, 5432)
    .WithLifetime(ContainerLifetime.Persistent)
    .WithImage("postgres:17.5");

var scalar = builder.AddScalarApiReference();
var moviesDb = postgres.AddDatabase("movies");

var moviesApi = builder.AddProject<Projects.Movies_Api>("movies-api")
    .WithIdentityOpenIdAuthority(identity)
    .WithIdentityOpenIdBearer(identity)
    .WithReference(moviesDb)
    .WaitFor(postgres);

scalar.WithApiReference(moviesApi);

var bff = builder.AddProject<Projects.MoviesBff>("gateway")
    .WithReference(moviesApi)
    .WithIdentityOpenIdAuthority(identity)
    .WaitFor(moviesApi);

builder.Build().Run();