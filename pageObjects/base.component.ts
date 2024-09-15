import type { Page } from "@playwright/test";

export abstract class BaseComponent {
  constructor(readonly page: Page) {}
}
