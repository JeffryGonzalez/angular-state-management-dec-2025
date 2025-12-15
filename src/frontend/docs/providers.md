# Providing Services

## Components

If you provide it on the `providers:[]` for a component
it will create a new instance of that service for that component
and it will live as long as the component lives.

> Note: This is true even if it is registered "higher" or has "provided in root".

- Fetch as late as possible, and as frequently as possible.

// todo: There is an option.

## When you provide in a routes `providers:[]`

- it is available for that route and all it's children.
- it is created when the first `inject` is used.
- but it doesn't go away. until they close the app.

## If you provide it in the app's providers

It should only be provided here.

Probalby shouldn't hold state (reference data, stores, etc.)

spoiler: "store" is a name given to a type of data that represents the state of an activity by a particular user.
example: a shopping cart.

Reference data: like price lists, stuff to fill dropdowns, lookups, etc.

- How "stale" can this be?
