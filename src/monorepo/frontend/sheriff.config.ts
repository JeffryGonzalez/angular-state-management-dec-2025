import { sameTag, SheriffConfig } from '@softarc/sheriff-core';

export const config: SheriffConfig = {
  entryPoints: {
    home: '/projects/apps/home/src/main.ts',
  },
  autoTagging: false,
  // barrels (index.ts files) are disabled to encourage explicit imports. This is better for local apps (not if you publish libraries).
  // Tree shaking will take care of all that stuff on build, and by not using barrels, you get a better dev experience, especially with Vite.
  enableBarrelLess: true, // Things inside a directory called "internal" cannot be imported from other modules.
  modules: {
    // Anything in the projects/apps directory is to be an Angular application (something you can server).
    'projects/apps/<domain>': {
      // Within each app, anything in a domain folder is a feature module.
      'domains/<feature>': ['type:angular-app-domain', 'feature:<feature>'],
      // Give it all access to itself.
      'src/app/<type>': ['type:angular-app'],
    },
    // Anything in the common directory that is to be consumed by an Angular application should be `type:angular-lib`.
    'projects/common/app-shell/application': ['type:angular-app-lib'],
    'projects/common/app-shell/providers': ['type:angular-app-lib'],
    'projects/common/app-shell/features': ['type:angular-feature-lib'],
    'projects/common/app-shell/internal': ['type:angular-lib-internal'],
    'projects/common/ui': ['type:angular-lib'],
    // Anything in the common directory that is not Angular specific should be `type:common`.
    'projects/common/types': ['type:common'],
    'projects/common/auth': ['type:angular-lib'],
    'projects/common/errors': ['type:angular-lib'],
  },
  depRules: {
    // Common stuff can use common stuff.
    'type:common': [sameTag],
    // Angular apps can use Angular libs and common stuff.
    'type:angular-app': ['type:angular-lib', 'type:common', 'type:angular-app-lib', sameTag],
    // Angular libs can use other Angular libs and common stuff.
    'type:angular-lib': ['type:angular-lib', 'type:common', sameTag],
    // These are the features, they can access themselves and other angular-libs and common stuff.
    'type:feature': [sameTag, 'type:angular-lib', 'type:common'],
    // Not really using this, but a place holder.
    'feature:*': ['type:angular-lib', 'type:common', 'type:angular-feature-lib', sameTag],
    'type:angular-app-lib': [
      'type:angular-lib',
      'type:angular-lib-internal',
      'type:common',
      sameTag,
    ],
    'type:angular-feature-lib': [
      'type:angular-lib',
      'type:angular-lib-internal',
      'type:common',
      sameTag,
    ],
    'type:angular-app-domain': ['type:angular-lib', 'type:angular-feature-lib'],
    'type:angular-lib-internal': ['type:angular-feature-lib', 'type:angular-app-lib', sameTag],
    root: ['*'],
  },
};
