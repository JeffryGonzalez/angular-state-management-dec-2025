import { inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterStateSnapshot, TitleStrategy } from '@angular/router';

class AppTitleStrategy extends TitleStrategy {
  readonly title = inject(Title);

  constructor(private readonly defaultTitle: string = '') {
    super();
  }

  override buildTitle(routerState: RouterStateSnapshot): string | undefined {
    let route = routerState.root;
    let pageTitle = route.data['pageTitle'];
    while (route.firstChild) {
      route = route.firstChild;
      if (route.data['pageTitle']) {
        pageTitle = route.data['pageTitle'];
      }
    }
    return pageTitle;
  }
  override updateTitle(routerState: RouterStateSnapshot) {
    const title = this.buildTitle(routerState);
    if (title !== undefined) {
      this.title.setTitle(`${this.defaultTitle} - ${title}`);
    } else {
      this.title.setTitle(this.defaultTitle);
    }
  }
}

export function provideAppTitleStrategy(defaultTitle?: string) {
  return {
    provide: TitleStrategy,
    useFactory: () => new AppTitleStrategy(defaultTitle),
  };
}
