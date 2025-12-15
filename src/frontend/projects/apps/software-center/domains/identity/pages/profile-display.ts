import { Component, ChangeDetectionStrategy, input, computed } from '@angular/core';
import { UserProfile } from '@app-auth/profile/profile';
import { KvpDisplay } from '@app-ui/kvp-display';

@Component({
  selector: 'app-identity-profile-display',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [KvpDisplay],
  template: `
    <div class="grid lg:grid-cols-2 gap-4 ">
      <ui-kvp-display label="Personal Information" [item]="personalInfo()"></ui-kvp-display>
      <ui-kvp-display label="Contact Information" [item]="contactInfo()"></ui-kvp-display>
    </div>
  `,
  styles: ``,
})
export class ProfileDisplay {
  profile = input.required<UserProfile>();

  personalInfo = computed(() => {
    return {
      ['First Name']: this.profile().info?.firstName,
      ['Last Name']: this.profile().info?.lastName,
      ['Middle Initial']: this.profile().info?.mi ?? 'n/a',
    };
  });
  contactInfo = computed(() => {
    return {
      ['Email']: this.profile().contactInfo?.email,
      ['Phone']: this.profile().contactInfo?.phone,
      ['Prefers']: this.profile().contactInfo?.preferredContactMethod,
    };
  });
}
