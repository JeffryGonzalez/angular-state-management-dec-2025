
using System.Text.Json;
using System.Text.Json.Serialization;
using System.Threading.Channels;
using Marten;
using Movies.Api.Api.Movies;
using Movies.Api.Api.Movies.Services;
using ServiceDefaults;

var builder = WebApplication.CreateBuilder(args);
builder.Services.ConfigureHttpJsonOptions(options =>
{
    options.SerializerOptions.DictionaryKeyPolicy = JsonNamingPolicy.CamelCase;
    options.SerializerOptions.Converters.Add(new JsonStringEnumConverter()); // I always add this.
});

builder.Services.AddProblemDetails();
builder.AddServiceDefaults();
builder.Services.AddOpenApi();
builder.Services.AddValidation();
var channel = Channel.CreateUnbounded<MovieReviewedChannelRequest>();
 builder.Services.AddSingleton(channel);
builder.Services.AddSingleton<RatingService>();
builder.Services.AddHostedService<RatingsWorker>();

builder.AddNpgsqlDataSource("movies");

builder.Services.AddMarten(options =>
    {

    }).UseNpgsqlDataSource()
    .UseLightweightSessions();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.MapMoviesApi();

app.UseHttpsRedirection();
app.MapDefaultEndpoints();

app.Run();

