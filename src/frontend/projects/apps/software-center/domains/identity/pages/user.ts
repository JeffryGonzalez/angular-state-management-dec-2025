import { TitleCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Authentication } from '@app-auth/authentication';
import { FeaturePage } from '@app-shell/features/feature-page';
import { UiButtonDirective } from '@app-ui/buttons/button';
import { UiBadgeDirective } from '@app-ui/badges/badge';
@Component({
  selector: 'app-home-pages-greeting',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [UiButtonDirective, TitleCasePipe, FeaturePage, UiBadgeDirective],
  template: `
    <ui-feature-page pageName="Home">
      @if (authState.isLoggedIn === false) {
        <button appUiButton [btnBehavior]="'active'" (click)="authState.login('/user')">
          Log In
        </button>
      } @else {
        <h4 class="font-bold">Welcome, {{ authState.user()?.name | titlecase }}!</h4>
        <div class="flex flex-row gap-2 items-center p-4">
          @if (authState.isSoftwareCenterEmployee) {
            <span appUiBadge badgeColor="success">✔︎ Software Center Employee</span>
          }
          @if (authState.isSoftwareCenterManager) {
            <span appUiBadge badgeColor="success">✔︎ Software Center Manager</span>
          }
        </div>

        <button appUiButton btnColor="warning" (click)="authState.logout('/')">Log Out</button>
      }
    </ui-feature-page>
  `,
  styles: ``,
})
export class User {
  protected authState = inject(Authentication);
}
