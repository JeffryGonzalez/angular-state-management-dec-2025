## Ngrx Signal Store

Here's where I get more opinionated on tooling, etc. I try not to in the earlier classes.

The [Ngrx Signal Store](https://ngrx.io/guide/signals/signal-store) rocks.

### Why Not The Global Redux Store?

First off, why not both? They can (as we will see) interoperate easily.

One advantage of the Signal Store is the ability to think about data more "locally".

This is important for a number of reasons:

- The caching stuff we've been talking about.
  - Fetch as late as possible
- Developer Friction
  - As we know, our job, especially in UI, is "coding around and finding out" (CAFO).
  - Needing a "global" definition of your state _before_ you can even start coding is hard.
    - I've seen _many_ developers just by pass the whole thing. Symptoms include huge subscribes and pipes in components.

We'll talk a lot about this. I want your thoughts.
