import { ErrorHandler } from '@angular/core';
import { Router } from '@angular/router';
import { inject } from '@angular/core';

export class GlobalErrorHandler implements ErrorHandler {
  private readonly router = inject(Router);
  handleError(error: unknown) {
    const url = this.router.url;
    console.group('GlobalErrorHandler Got An Error');

    console.error(GlobalErrorHandler.name, { error, url });
    console.warn('@@ REPLACE THIS WITH CUSTOM ERROR HANDLING LOGIC @@');
    console.groupEnd();
  }
}
