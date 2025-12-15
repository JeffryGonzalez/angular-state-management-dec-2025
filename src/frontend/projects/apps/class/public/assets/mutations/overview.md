## Mutations

Programmers love that word, "mutations". We also like "idempotency".

> **Note**: This is going to be a _brief_ section, because we are going to spend a bunch of time talking about this in upcoming sections, in particular the [Patterns](/patterns) section coming up.

By "mutations" we mean we have a use case in our application where data (especially data we don't "own", e.g. data on the outside), has to be changed.

In HTTP terms this usually (or should) mean you are using one of the "non safe" operations - namely `POST`, `PUT` or `DELETE`.

> **Note**: Do not use `GET` to perform mutations.

### Best Practices

Don't mutate. If you are creating APIs, prefer to create new versions of things as opposed to changing things.

This can make your life so much better, and make it so we don't have to be a jerk all the time (e.g. "Sorry, can't do that update because some other person changed it!")

#### However - this one is _immutable_

Do not change data you don't own. And by "own" I mean it isn't either component state, or service state related to your own application instance. And even then be suspect.

Roughly there are three types of data we work with.

## Documents

"Individual" pieces of data, like the data about a specific movie or a specific employee. Identified by a URI like:

- `https://api.superapi.com/movies/32`
- `https://api.company.com/employees/12`

These should be invalidated during a mutation, and either:

- Use the response returned from the API to replace it (if any).
- Refetch that document after the operation.
- Challenge: Other places in your app may have a reference to that document, so there has to be a mechanism to let them know the milk is spoiled.

## Collections

Groups of related things. Arrays, basically. You know, a "collection".

- `https://api.superapi.com/movies/`
- `https://api.company.com/employees/`

Note that documents can have _subordinate resources_ that are collections, or other documents:

- `https://api.company.com/employees/13/performance-reviews`
- `https://api.company.com/employees/13/manager`

Same rules as documents - don't change them.

We'll look at patterns later, but if you do "change one" you are asking the "origin" to change it,
and usually you are changing a specific document within a collection (are you going to change _all_ employees? rare.)

- Patterns
  - Optimistic
  - Pessimistic
  - Outbox

Best Practice: After a mutation of a member of a collection, invalidate and refetch the entire collection.

## Stores

This is what "apps" like we build in Angular _live for_.

"The employee Bob Smith wants to reserve a specific meeting room on this date in this building".

Sometimes the server will want a copy of the "store" for persistance. ("We noticed you have stuff in your cart!")

These are "transactions" and have references to shared state.

Think of forms in Angular. Drop down lists, etc. All reference data.
