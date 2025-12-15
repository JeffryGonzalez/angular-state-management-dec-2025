## About This Class

This is a pilot class. Weird, right?

Help me out - remember most of you aren't the typical, excpected audience for this class.

But I want to give you good stuff.

### Expected Progression

#### Start with Component State

Low-level state, in a component, emphasis on signals.

#### Browser State

Touch on the browser APIs for persisting state. Talk about how that works with SSR/SSG.

> **Note**: I won't be able to help myself -- I'll have to show some the new, experimental SignalForms stuff in Angular 21. I'll sprinkle it through the class.

#### Reference Data State

Define what this is (spoiler, basically immutable, readonly data used as operands in a transaction).

Introduce the:

- `resource`
- `rxResource`
- `httpResource`

Discuss how `async/await` is the new hawtness.

Begin talking about caching **C.R.E.A.M.**.

> **Spoiler**: It's _all_ we do. Let's just be honest about it. And have a plan.

#### Mutations

How to handle API state and local state mutations.

- `POST`, `PUT`, `DELETE`, etc.
- The venerable `httpClient`

### Tools that Can Help

#### NGRX Signal Store

Uses:

- `SignalState` in components
  - hint: Mostly not convinced
- `SignalStore`
  - Features "in the box":
    - `withState`
    - `withComputed`
    - `withHooks`
    - `withProps`
    - `withEntities`

  We'll spend some time looking at the `@ngrx/signals/events` tools.
  - `withReducer`
  - `eventGroup` and `event`
  - `withEffects`
  - `injectDispatch` - (my _favorite_)

### Side-Hike

Let's pause and talk a little bit about coupling.

- Temporal Coupling in Teams
  - "I can't do this until you do that"
- The need for "overarching" "standards" and technical concerns.
  - Auth, caching, invalidation, etc.
  - Often our apps become various lenses through which a lot of the same data is seen.

### Good old Redux

<img src="./assets/home/dan.jpg" alt="Saint Dan" width="400" />

Q: Is it still needed? What is it good for?

A: Yes! (sometimes), Technical and Cross-cutting concerns.

Also it's good because we have a _huge_ investment in code for it.

> **Note**: Because it was hard to learn isn't a good enough reason to keep it.

### Interplace of NGRX Store, Selectors, and Signal Store and Components

- `store.selectSignal(selectorFunction)`
- Aggregator Stores
- [Ngrx Operators](https://ngrx.io/guide/operators/operators)
- [rxJs Interop](https://angular.dev/ecosystem/rxjs-interop)

## Big Themes To Address

We want to make sure we have a nuanced way of thinking about state in our applications. Coming up with some common definitions, and ways of thinking about it.

### How Project Structure Helps

- I promise I won't harp on this _too_ much, but so many of the the "state" problems I've helped teams with is because their code base grows and is the wild west. Things get _brittle_. Complexity gets vomited all over the application. I want to show you a _few_ things that can help.

- [Sheriff](https://sheriff.softarc.io/)
  - Using with ESLint (and caring for your eslint config)
  - Defining boundaries
- Angular Libraries, NPM Packages, Mono Repos and All That.
- Using Types to Enforce "Standards" - Making the right thing the easiest thing.

## More Tools

- Validation of API Requests and Responses
  - [Standard Schema](https://github.com/standard-schema)
  - Example:
    - Zod
    - Valibot
  - Schema Ownership
    - Usually (see below, BFF), someone else "owns" the schema. It's their API, and you are just using it.
      - Get Receipts
      - Generating Schema from OpenApi Specs
        - IMO, one of the _best_ things in .NET 10 is the OpenApi stuff. Much easier and more "standard".
        - We'll do some of this.
      - Generating Typescript Types from Zod.
      - Generating Zod Validations from OpenApi
        - Not 100% - but really good.
      - And the "big" thing - You can use these directly as the validations in your forms.

- Tanstack Query
  - I'm going to show this. I use it, and have for _years_ (mostly in React and Vue apps).
    - It is _amazing_.
