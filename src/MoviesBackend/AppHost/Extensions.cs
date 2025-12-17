namespace AppHost;

public static class AsmAppHostExtensions
{
    extension(IDistributedApplicationBuilder builder)
    {
        public IResourceBuilder<ContainerResource> AddMockOidcDevelopmentServer()
        {
            var identity = builder.AddContainer("identity", "ghcr.io/navikt/mock-oauth2-server:3.0.1")
                .WithLifetime(ContainerLifetime.Persistent)
                .WithHttpEndpoint(9069, 8080) // Expose port 9069 on host to 8080 in container
                .WithBindMount("./MockOauth2/",
                    "/app/resources/software/") // Mount local folder to container, contains config and login template
                .WithLifetime(ContainerLifetime.Persistent) // Keep container and data between runs
                .WithEnvironment("JSON_CONFIG_PATH", "/app/resources/software/settings/config.json");

            return identity;
        }
    }

    // a project resource is when we do "builder.AddProject<Projects.SomeApi>("bbb");
    extension(IResourceBuilder<ProjectResource> builder)
    {
        public IResourceBuilder<ProjectResource> WithIdentityOpenIdAuthority(
            IResourceBuilder<ContainerResource> identity)
        {
            builder.WithEnvironment("Authentication__Schemes__OpenIdConnect__Authority",
                () => identity.Resource.GetEndpoint("http").Url + "/asm");
            return builder;
        }

        public IResourceBuilder<ProjectResource> WithIdentityOpenIdBearer(IResourceBuilder<ContainerResource> identity)
        {
            builder.WithEnvironment("Authentication__Schemes__Bearer__Authority",
                () => identity.Resource.GetEndpoint("http").Url + "/asm");
            return builder;
        }
    }
}