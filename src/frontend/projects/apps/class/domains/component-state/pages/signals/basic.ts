import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { ProseBlock } from '@app-ui/prose-block';

@Component({
  selector: 'app-signal-basic',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ProseBlock],
  template: `
    <div class=" flex flex-row items-center gap-2 w-fit bg-secondary  p-4 rounded-lg">
      <button class="btn btn-circle btn-warning" (click)="counter.set(counter() - 1)">-</button>
      <span class="stat text-secondary-content">{{ counter() }}</span>
      <button class="btn btn-circle btn-success" (click)="counter.set(counter() + 1)">+</button>
    </div>
    @if (counter() === 6) {
      <div class="py-20 flex flex-col items-center">
        <div class="animate__animated animate__bounce pb-16">
          <p class="text-4xl text-red-600 shadow-2xl shadow-amber-200 bg-black p-4">It's DAN!</p>
        </div>
        <div class="hover-3d">
          <!-- content -->
          <figure class="max-w-100 rounded-2xl">
            <img src="assets/home/dan.jpg" alt="3D card" />
          </figure>
          <!-- 8 empty divs needed for the 3D effect -->
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    }
    @if (counter() === 7) {
      <div class="py-20 flex flex-col items-center">
        <div class="animate__animated animate__hinge animate__delay-2s pb-16">
          <p class="text-4xl text-red-600 shadow-2xl shadow-amber-200 bg-black p-4">It's JEFF!</p>

          <div class="hover-3d">
            <!-- content -->
            <figure class="max-w-100 rounded-2xl">
              <img src="assets/home/jeff.jpeg" alt="3D card" />
            </figure>
            <!-- 8 empty divs needed for the 3D effect -->
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      </div>
    }
  `,
  styles: ``,
})
export class Basic {
  counter = signal(0);
}
