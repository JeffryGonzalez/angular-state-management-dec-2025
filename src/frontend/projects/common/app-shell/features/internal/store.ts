import { computed, inject } from '@angular/core';

import { withDevtools } from '@angular-architects/ngrx-toolkit';
import { getRouterSelectors } from '@ngrx/router-store';
import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { Store } from '@ngrx/store';
import { FeatureChildRoute } from '../../../types/routing/feature-routing';

export type LinkDocument = {
  name: string;
  readonly path: string[] | string | undefined;
  data: { linkText: string };
};
export type LinkFolder = LinkDocument & {
  documents: LinkDocument[];
};
type SectionState = {
  current: FeatureChildRoute | null;
  originalPath: string;
  currentPath: string;
};

export const sectionStore = signalStore(
  withDevtools('Section Store'),
  withState<SectionState>({
    current: null,
    originalPath: '',
    currentPath: '',
  }),
  withComputed((store) => {
    return {
      getFolders: computed(() => {
        const current = store.current();
        if (!current) {
          return [];
        }
        // let fc = 1;
        let dc = 1;

        const homeDocuments = current.children

          .flat()
          .map((c) => c as FeatureChildRoute)
          .filter((c) => c.path !== '' && c.children.length === 0)
          .map((c) => c as unknown as LinkDocument);

        const homeFolder: LinkFolder = {
          name: 'Home',
          path: ['.'],
          data: { linkText: 'Home' },
          documents: homeDocuments
            // .filter(doc => )
            .map((doc) => {
              return (<LinkDocument>{
                name: `Home-doc${dc++}`,
                path: doc.path,
                data: { linkText: doc.data.linkText || 'Document' },
              }) as LinkDocument;
            }),
        };

        const nonHomeFolders = current.children.flat().filter((c) => {
          return c.children && c.children.length > 0;
        });

        const otherFolders: LinkFolder[] = nonHomeFolders
          .map((folder) => folder as FeatureChildRoute)
          .map((folder) => {
            return {
              name: folder.data.linkText,
              data: { linkText: folder.data.linkText },
              path: ['.', folder.path],
              documents: folder.children
                .map((c) => c.children)
                .flat()
                .map((c) => c as FeatureChildRoute)
                .map((doc) => {
                  return (<LinkDocument>{
                    name: `Home-doc${dc++}`,
                    path: ['.', folder.path, doc.path],
                    data: { linkText: doc.data.linkText || 'Document' },
                  }) as LinkDocument;
                }),
            } as LinkFolder;
          });

        return [homeFolder, ...otherFolders];
      }),
    };
  }),

  withMethods((store) => {
    return {
      setCurrent: (route: FeatureChildRoute) => patchState(store, { current: route }),
    };
  }),
  withHooks({
    onInit(store) {
      const reduxStore = inject(Store);

      const rq = reduxStore.selectSignal(getRouterSelectors().selectUrl);

      const path = rq();

      patchState(store, { originalPath: path, currentPath: rq() });
    },
  }),
);
