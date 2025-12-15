import { withStorageSync } from '@angular-architects/ngrx-toolkit';

export function withPreferencesStorage(name: string) {
  return withStorageSync(`preferences/${name}`);
}
