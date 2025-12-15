## Reference Data

A _lot_ of data we need in our UI is "reference data" - that is data that is used to inform the user so they can perform opertions. We'll talk about those in the next section, "Mutations".

### Data on the Inside vs. Data on the Outside

There is no such thing as a "distributed transaction".

See Pat Helland's [Data on the Outside vs. Data on the Inside](https://queue.acm.org/detail.cfm?id=3415014)

### Distributed Messaging Patterns

Let's discuss _optimal_ structure for reference data.

To do that we'll have to start with thinking about why we need that data. What is it's special purpose?

- Operations
- Operands
  - References to other data
  - Data

#### Versioning

Being specific about what versions we are working with.

HTTP Responses _always_ have a `Date`.

Can use `etag`s or just embed versions.

#### Caching

- Browser Caching based on `cache-control` headers.
- Caching based on "location" in application
  - Why I _detest_ the "just make everything `{providedIn: 'root'}` guidance.
- Caching using:
  - Redux Store
  - Signal Store
  - Reload Strategies
    - Timer?
    - Mutations?
    - Switching tabs?
  - Using an Interceptor
