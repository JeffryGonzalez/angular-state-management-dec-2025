# The Plan.

- Quick look at the form (validations, and Signal Forms)
  - We will do a form with Zod validation later today.
- Add some code to the Movies Admin for operations
  - Delete a movie
  - Reset the reviews
  - Could do add, etc.
- kick out the mock service worksers, start the backend.
  - Bit of auth.
- SSE (Server Sent Events)
  - Create a store that listens for events from the server when others add movie reviews
  - SignalStore with:
    - Reducers
    - Events (actions)
    - Effects
  - Create a Redux Store for app-wide notifications - show integration
- Validation from OpenApi -> Zod
- Quick Tanstack Query Thing.

# When I say "you can't change data you don't own" I mean "that originates from your angular app"
