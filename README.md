# Angular State Management 

## Watch The Space Below - It'll have commands to run and stuff


### Day 2 

In the root folder of your project (probably `~/angular-state-management/src/frontend)`, open a terminal, and then:

```sh
npx gitpick -o JeffryGonzalez/angular-state-management-dec-2025/tree/main/src/frontend/projects/apps/class/domains/movies ./projects/apps/class/domains/movies
```

> Note: `gitpick` is a little different that `degit` that we used yesterday. It allows you to "pick" parts of a github repo and bring them into your project. So the command above is going to my github repo for this class, diving into the `/src/frontend/projects/apps/class/domains/movies` folder and pulling it down to your `.projects/apps/class/domains/movies` directory. The `-o` flag means "overwrite" - which means if you have something in that folder, this will wipe it out.


You can use this to pull *anything* I have - so if you want a folder in your project that has my notes (including my super rad drawings!) you could do something like this:

```sh 
npx gitpick -o JeffryGonzalez/angular-state-management-dec-2025/tree/main/src/frontend/notes jeff-notes
```



### Day 3

I cleaned up the Movies domain. You'll wanna grab a fresh copy:

In the root folder of your project (probably `~/angular-state-management/src/frontend)`, open a terminal, and then:

```sh
npx gitpick -o JeffryGonzalez/angular-state-management-dec-2025/tree/main/src/frontend/projects/apps/class/domains/movies ./projects/apps/class/domains/movies
```

I also added a new domain - "MoviesAdmin" - grab that, too:
```sh
npx gitpick -o JeffryGonzalez/angular-state-management-dec-2025/tree/main/src/frontend/projects/apps/class/domains/movie-admin ./projects/apps/class/domains/movies-admin
```

You'll need to add a route for this. In your `app.routes.ts` add the following route right below the route for movies:

```cs
,
  {
    path: 'movie-admin',
    loadChildren: () =>
      import('../../domains/movie-admin/movie-admin.routes').then((m) => m.movieAddminRoutes),
    data: {
      title: 'Movie Admin',
      linkText: 'Movie Admin',
      iconName: 'solarVideoFrameCut',
      pageTitle: 'Movie Admin Page',
      requiresAuth: true,
      linkDescription: 'Administration of Movies',
    },
  },

```


