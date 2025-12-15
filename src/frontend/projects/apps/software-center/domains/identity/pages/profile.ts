import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { FeaturePage } from '@app-shell/features/feature-page';

import { ProfileDisplay } from './profile-display';
import { IdentityCreateProfileComponent } from './profile-create';
import { profileStore } from '@app-auth/profile/profile';

@Component({
  selector: 'app-identity-pages-profile',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FeaturePage, ProfileDisplay, IdentityCreateProfileComponent],
  template: `
    <ui-feature-page pageName="Your Profile">
      @if (store.hasProfile()) {
        <app-identity-profile-display [profile]="store.profile()!"></app-identity-profile-display>
      } @else {
        <app-identity-create-profile />
      }
    </ui-feature-page>
  `,
  styles: ``,
})
export class ProfilePage {
  store = inject(profileStore);
}
