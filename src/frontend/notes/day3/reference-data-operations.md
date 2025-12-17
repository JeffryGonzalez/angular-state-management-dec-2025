# Reference Data

- How do we get that data?
  - List of Movies
    - httpResource (experimental, but rad, signal based, all that jazz)
    - httpClient (toSignal)
    - rxjs in a store with the rxMethod thing and a service.

- Operation "User Adds a Star Review For A Movie"
  - operands:
    - USer who is always always always authentication/authorization.
      - Authorization: Bearer {{jwt}}
      - Web Pages - you can do that, we do do that, but cookies are better.
    - Movie:
      - You can either:
        - link to it
        - embed it
        - reference it

```http
GET /api/movies/{id}

```

200 Ok
Date: 398393898

```http
POST /api/movies/ratings
Authorization:
Content-Type: application/json

{
  "movie": {
    "id": "6",
    "dateOfblah": "Date from the request"
  },
  "rating": 3,
  "comment": "One of his finest"
}



- Help Desk:
    - Employee Submits an Issue
    - Manager Submits and Issue for an Employee




```

## Delete this jeff

GET /policies/398938983 December 2, 1972

{

    vehicles: [
        { vin: "8398398", ... }
    ]

}

200 Ok
Content-Type: application/json
Date:

ALL DATA OUTSIDE OF THE DATABASE IS CACHED. IT IS STALE, SUSPECT.

EONS OF TIME PASS

POST /policies/389839839/vehicles December 17, 2025

{
///

}

Transaction are Atomic - all or nothing. Which means they are facist monsters.

They are hard to manage, and they are hard to give any leeway on at all.

I have a shopping cart full of stuff, and one of those things is a brand new laptop. It was listed for $999.99 when I added it to the card.

- Who: Jeff
- Cart Items:
  - sku: id-of-laptop, qty: 1, price: 999.99, rel:

SELECT from products where SKU = id-of-laptop where version = 1

price: 999.99
version: 2

HTTP responses can have a header called an "entity tag" (etag)

## Patterns -

"Optimistic"

- I delete it locally, THEN send the request the server, and if I don't get an error, cool.
  if I do, then I have to have some mechanism to "Fix my lie"
  - just refetch the entire collection again.
  - It's fast -- the UI looks good.

"Pessimistic"

- Don't change your local copy AT ALL. Ask the server to do it, if it goes ok, then refetch the data\*
  - refetch.
  - ok, I think I can be in sync by delete that row now.

  - outbox - a sort of automated version of this.
    - keeps us honest - have two buckets. One has our server data, one has our "outgoing" requests.
      - when you do a mutation (POST/PUT/DELETE), put that in the "outbox" and display a pending operation.
      - when it completes, take it out of the outbox, show the pending operation as completed, and then update the state, or whatever.
      - I have code for you that does all of this with NGRX store and interceptors.

The other pattern:

- Eventual Consistency. Change your nouns and verbs.

Instead of saying "this button removes the vehicle from your policy" it says "begin process of removing the vehicle from your policy"

- SSE, Web Sockets
