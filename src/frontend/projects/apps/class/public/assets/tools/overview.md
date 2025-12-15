## Misc. Tools and Topics

### Tanstack Query

TanStack Query is a tool that is used in about 1.3 bazillion web apps. Just not Angular. React, Vue, all _live_ on it.

For Angular [Tanstack Query Angular](https://tanstack.com/query/v5/docs/framework/angular/overview)

Basically, about 90% of what I've shown here is encapsulated in this one tool.

- Caching with policies
- Mutations
- Great DevEx (dev tools)

Let's look at it.

### Backend for Frontend

This is _coming_ for you. And you are going to _like_ it. Really.

#### The Pattern

Your team "owns" the API and the APP.

All communication from the app is back to it's origin.

- ZERO CORS ISSUES EVER
- No tokens in the browser (browser is closest to secure with samesite secure cookies)
- Can do things like:
  - XSRF Validation
  - CSP [See Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CSP)

Enabling Technologies:

- YARP
- .NET (best tool for BFF, IMO. )
- Aspire?

##### DEMO
