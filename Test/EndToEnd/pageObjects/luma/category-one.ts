import { expect, Page } from "@playwright/test";

export default class CategoryOnePage {
  page: Page;
  url: string;

  constructor(page: Page) {
    this.url = "/category-1.html";
    this.page = page;
  }

  public async navigateTo(check = true) {
    await this.page.goto(this.url);
    if (check) {
      await expect(this.page).toHaveTitle(/Category 1/);
    }
  }
}
