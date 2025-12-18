import { ChangeDetectionStrategy, Component, effect, signal } from '@angular/core';
import { FeaturePage } from '@ht/features/feature-page';

@Component({
  selector: 'app-home-pages-timer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FeaturePage],
  template: `<ui-feature-page pageName="timer">
    <div class="flex flex-col items-center gap-20 p-20">
      <p class="text-5xl font-bold text-blue-400">Angular State Management</p>
      <h1 class="text-2xl font-black text-blue-500">Time Until We Start at 9:30 AM ET</h1>
      <p class="text-5xl font-bold text-accent">{{ timeLeft() }}</p>
    </div>
  </ui-feature-page>`,
  styles: ``,
})
export class TimerPage {
  timeLeft = signal('');

  constructor() {
    let intervalId: number | null = null;
    effect((onCleanup) => {
      intervalId = setInterval(() => {
        const now = new Date();
        const targetTime = new Date(now.toDateString() + ' 09:30:00');
        if (now > targetTime) {
          targetTime.setDate(targetTime.getDate() + 1);
        }
        const timeDiff = targetTime.getTime() - now.getTime();
        const seconds = Math.floor((timeDiff / 1000) % 60);
        const minutes = Math.floor((timeDiff / (1000 * 60)) % 60);

        this.timeLeft.set(`${minutes}m ${seconds}s`);
      }, 1000);

      onCleanup(() => {
        if (intervalId !== null) {
          clearInterval(intervalId);
        }
      });
    });
  }
}
