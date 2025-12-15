import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FeaturePage } from '@app-shell/features/feature-page';
import { ProseBlock } from '@app-ui/prose-block';

@Component({
  selector: 'app-home-pages-greeting',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FeaturePage, ProseBlock],
  template: `
    <ui-feature-page pageName="Angular State Management">
      <ui-prose-block>
        <h2>The Premise</h2>
        <p>
          Who knows how much I'll stick to this, but I've been using a continuity of examples in the
          services classes I teach, which helps us to not have to reestablish the context for each
          class.
        </p>
        <h3>Software Center</h3>
        <p>So, we pretend we are in a company and we are building their "software center".</p>
        <p>
          There are <strong>vendors</strong> that can sell us software that we keep in a
          <strong>catalog</strong> of software that the company supports.
        </p>
        <p>
          Managers that work in the Sofware Center can add or remove Vendors. Folks that work in the
          software center (that aren't necessarily managers) can add or remove software from the
          catalog.
        </p>
        <h3>Help Desk</h3>
        <p>
          The software center also has a <strong>help desk</strong> that can answer questions from
          employees about the software.
        </p>
      </ui-prose-block>
    </ui-feature-page>
  `,
  styles: ``,
})
export class AboutPage {}
