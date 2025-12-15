# Some Conventions Used In This Workspace

## Imports

"Shared" items across apps or libraries should be imported using a "@app-" prefix, and defined in the root `tsconfig.json` file.

Right now these are defined in the root `tsconfig.json` as:

```json
    "paths": {
      "@app-providers/*": ["projects/common/providers/*"],
      "@app-ui/*": ["projects/common/ui/*"],
      "@app-types/*": ["projects/common/types/*"],
      "@app-auth/*": ["projects/common/auth/*"],
      "@app-errors/*": ["projects/common/errors/*"]
    },
```

I _considered_ and experimented with just having a path of `@app-common/*: ["projects/common/*"]` but I think having separate paths for
explicit things keeps the code a little cleaner and has come in handy in debugging. YMMV.

> **Note**: Within any part of your code (either in `common`, or `apps`, a directory named `internal` is _special_. It overrides the sheriff rules so that it is automatically "sameTag", e.g. no other code outside of that "feature" can import it).

> **Note**: Another one, this time about "barrels".
> Reminder, a "barrel" is a folder with an `index.ts` file that re-exports "internal" files to make your `import` statements "cleaner". Since Angular switched to Vite for it's development server, the "Hot Module Reload" is _much_ better. Most of the time, changes in just one source code file only force a reload of that source code file. _However_, if you are importing from a barrel, it has to reload _everything_ from that barrel. This can slow down your "developer flow" and often causes you to lose state. My _current_ take on this is:
> If and when a module (in `common`) stabilizes enough that you want to convert to a barrel, you can, but I think that also means you might be better off converting it to a package that can be versioned and NPM installed, and converting it to a barrel then.

## Workspace Structure

### The `projects` Directory

#### The `apps` Directory

Your team may deliver > 1 "app". Each goes into this directory.

These are forbidden from referencing each other.

They can reference node modules, or things in the common directory (both `type:common` and `type:angular-lib`)

#### The `common` Directory

This directory contains common "stuff" that can be used by each other, or by any of your apps.

Some are tagged by sheriff as a `type:angular-lib`. These are libraries that have a dependency on Angular.

Some are tagged by sheriff as a `type:common`. These are "pure" TypeScript libraries with no dependencies on Angular (or dependencies that
depend on Angular).

A module of `type:angular-lib` can take a dependency on anything with `type:common`, however
`type:common` cannot take a dependency on `type:angular-lib`.
