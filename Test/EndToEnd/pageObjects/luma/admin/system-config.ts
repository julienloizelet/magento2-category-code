import { expect, Page } from "@playwright/test";

export default class AdminSystemConfigPage {
  page: Page;
  url: string;

  constructor(page: Page) {
    this.url = "/admin/admin/system_config";
    this.page = page;
  }

  public async navigateTo(check = true) {
    await this.page.goto(this.url);
    if (check) {
      await expect(this.page).toHaveTitle(/Configuration/);
    }
  }

  public async saveConfig(check = true) {
    await this.page
      .getByRole("button", { name: "Save Config" })
      .click({ delay: 500, clickCount: 2 });
    if (check) {
      await expect(this.page.locator(".message-success").first()).toContainText(
        /You saved the configuration./
      );
    }
  }
}
