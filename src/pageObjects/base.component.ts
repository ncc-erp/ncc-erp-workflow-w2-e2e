import type { Locator, Page } from "@playwright/test";

export abstract class BaseComponent {
  protected host: Locator;
  constructor(
    readonly page: Page,
    _host?: Locator
  ) {
    this.host = _host ? _host : this.page.locator("body");
  }
}
