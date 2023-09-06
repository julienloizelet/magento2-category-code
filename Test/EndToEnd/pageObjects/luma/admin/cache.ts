import { expect, Page } from "@playwright/test";

export default class AdminCachePage {
  page: Page;
  url: string;

  constructor(page: Page) {
    this.url = "/admin/admin/cache";
    this.page = page;
  }

  public async navigateTo(check = true) {
    await this.page.goto(this.url);
    if (check) {
      await expect(this.page).toHaveTitle(/Cache Management/);
    }
  }

  public async flushMagentoCache(check = true) {
    await this.page
      .getByRole("button", { name: "Flush Magento Cache" })
      .click();
    if (check) {
      await expect(this.page.locator(".message-success")).toContainText(
        /The Magento cache storage has been flushed./
      );
    }
  }
}
