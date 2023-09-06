import { expect, Page } from "@playwright/test";

export default class AdminOkaeliCategoryCodeCategoryOnePage {
  page: Page;
  url: string;

  constructor(page: Page) {
    this.url = "admin/catalog/category/edit/id/3/";
    this.page = page;
  }

  public async navigateTo(check = true) {
    await this.page.goto(this.url);
    if (check) {
      await expect(this.page).toHaveTitle(/Category 1/);
    }
  }

  public async setCategoryCode(categoryCode: string) {
    await this.navigateTo();
    await this.page.getByLabel("Category Code").fill(categoryCode);
    await this.save();
  }

  public async save(check = true) {
    await this.page
      .getByRole("button", { name: "Save" })
      .click({ delay: 500, clickCount: 1 });
    if (check) {
      await expect(this.page.locator(".message-success").first()).toContainText(
        /You saved the category./
      );
    }
  }
}
