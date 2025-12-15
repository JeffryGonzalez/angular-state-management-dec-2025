import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Authentication } from '@app-auth/authentication';
import { FeaturePage } from '@app-shell/features/feature-page';

@Component({
  selector: 'app-helpdesk-pages-report-problem',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FeaturePage],
  template: `
    <ui-feature-page pageName="Report a Problem">
      <div class="flex flex-row col-span-2 gap-2">
        <div class="w-1/2">
          <h3>We are sorry to hear you are experiencing issues.</h3>
          <p>
            Please provide as much detail as possible about the issue you are facing. This will help
            us resolve it more quickly. {{ auth.userId }}
          </p>
        </div>
        <div>
          <form>
            <fieldset class="fieldset">
              <legend class="fieldset-legend">Tell Us About Your Problem</legend>
              <fieldset class="fieldset">
                <legend class="fieldset-legend">Software Involved</legend>
                <input type="text" class="input" placeholder="My awesome page" />
                <p class="label">You can edit page title later on from settings</p>
              </fieldset>
              <fieldset class="fieldset">
                <legend class="fieldset-legend">Describe the Issue</legend>

                <label class="label" for="description">Description</label>
                <textarea class="textarea" id="description"></textarea>
                <p class="label">
                  Give us as much details as possible. A support tech will get back to you shortly.
                </p>
              </fieldset>
            </fieldset>
          </form>
        </div>
      </div>
    </ui-feature-page>
  `,
  styles: `
    form > fieldset > legend {
      font-size: 2rem;
    }
    fieldset > legend {
      font-size: 1.5rem;
    }
  `,
})
export class ReportProblemPage {
  protected auth = inject(Authentication);
}
