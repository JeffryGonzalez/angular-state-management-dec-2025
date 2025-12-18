import { sameTag, SheriffConfig } from '@softarc/sheriff-core';

export const config: SheriffConfig = {
  entryPoints: {
    class: '/projects/apps/class/src/main.ts',
  },
  autoTagging: false,
  // barrels (index.ts files) are disabled to encourage explicit imports. This is better for local apps (not if you publish libraries).
  // Tree shaking will take care of all that stuff on build, and by not using barrels, you get a better dev experience, especially with Vite.
  enableBarrelLess: true, // Things inside a directory called "internal" cannot be imported from other modules.
  modules: {
    // Anything in the projects/apps directory is to be an Angular application (something you can server).

    'projects/apps': {
      '<domain>/features/<feature>': ['domain:<domain>', 'feature:<feature>'],
      '<domain>common/<feature>': ['domain:<domain>', 'type:<feature>'],
      '<domain>/common/external/<api>': ['api:<api>', 'domain:<domain>'],

      'src/app/<type>': ['type:angular-app'],
    },
    // Anything in the common directory that is to be consumed by an Angular application should be `type:angular-lib`.
    'projects/common/app/app-shell': ['type:angular-app-lib'],
    'projects/common/app/providers': ['type:angular-app-lib'],
    'projects/common/app/features': ['type:angular-feature-lib'],
    'projects/common/app/events': ['type:angular-lib'],
    'projects/common/app/prefs': ['type:angular-lib'],

    'projects/common/ui': ['type:angular-lib'],
    // Anything in the common directory that is not Angular specific should be `type:common`.
    'projects/common/types': ['type:common'],
    'projects/common/auth': ['type:angular-lib'],
    'projects/common/errors': ['type:angular-lib'],
    'projects/common/state': ['type:angular-lib'],
  },
  depRules: {
    'type:angular-app': ['type:angular-app-lib', sameTag],
    'type:angular-app-lib': ['type:angular-app', 'type:angular-lib', 'type:common', sameTag],
    'feature:*': [
      'type:angular-feature-lib',
      'type:common',
      'type:feature-lib',
      'type:angular-lib',
      sameTag,
    ],
    'api:movies': ['feature:movies', 'feature:movie-admin'],
    'feature:movie-admin': ['api:movies-api', sameTag],
    'feature:movies': ['api:movies-api', sameTag],
    'api:*': ['type:angular-app-lib', sameTag],
    'type:angular-lib': ['type:common', sameTag],
    'type:angular-feature-lib': ['type:angular-lib', 'type:common', sameTag],
    'domain:*': [
      'type:common',
      'type:angular-feature-lib',
      'type:angular-lib',
      'type:angular-app-lib',
      sameTag,
    ],

    // 'api:*': ['type:angular-app-domain', sameTag],
    // 'feature:*': ['type:angular-lib', 'type:common', 'type:angular-feature-lib', sameTag],
    // 'feature:movie-admin': ['api:movies', 'type:angular-app-lib', sameTag],
    // 'feature:movies': ['api:movies', 'type:angular-app-lib', sameTag],
    root: ['*'],
    // // Angular apps can use Angular libs and common stuff.
    // 'type:angular-app': ['type:angular-lib', 'type:common', 'type:angular-app-lib', sameTag],
    // 'type:angular-app-domain': [
    //   'type:angular-lib',
    //   'type:angular-feature-lib',
    //   'type:angular-app-lib',
    //   'type:common',
    //   'type:api-client',
    //   'feature:*',
    //   sameTag,
    // ],
    // 'type:angular-app-domain-lib': [
    //   'type:angular-lib',
    //   'type:angular-feature-lib',
    //   'type:common',
    //   'type:api-client',
    //   sameTag,
    // ],
    // 'type:angular-app-lib': [
    //   'type:angular-lib',
    //   'type:angular-lib-internal',
    //   'type:common',
    //   sameTag,
    // ],
    // 'type:angular-feature-lib': [
    //   'type:angular-lib',
    //   'type:angular-lib-internal',
    //   'type:common',
    //   sameTag,
    // ],
    // // Angular libs can use other Angular libs and common stuff.
    // 'type:angular-lib': ['type:angular-lib', 'type:common', sameTag],
    // 'type:angular-lib-internal': ['type:angular-feature-lib', 'type:angular-app-lib', sameTag],
    // 'type:api-client': ['type:common', sameTag],
    // // Common stuff can use common stuff.
    // 'type:common': [sameTag],
    // // These are the features, they can access themselves and other angular-libs and common stuff.
    // 'type:feature': [sameTag, 'type:angular-lib', 'type:common'],
  },
};
