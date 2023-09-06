import { expect, Page } from "@playwright/test";

export default class AdminLoginPage {
  page: Page;
  url: string;

  constructor(page: Page) {
    this.url = "/admin";
    this.page = page;
  }

  public async navigateTo(check = true) {
    await this.page.goto(this.url);
    if (check && (await this.page.locator(".action-login").isVisible())) {
      await expect(this.page).toHaveTitle(/Magento Admin/);
    }
  }

  public async login(username: string, password: string, check = true) {
    await this.page.getByPlaceholder("user name").fill(username);
    await this.page.getByPlaceholder("password").fill(password);

    await this.page.getByRole("button", { name: "Sign in" }).click();
    if (check) {
      // On first login only (fresh install), there is a modal to allow admin usage statistics
      try {
        await this.page.waitForSelector(
          ".admin-usage-notification .action-secondary",
          { timeout: 3000 }
        );
        console.debug("Admin usage notification popup appears.");
        await this.page.click(".admin-usage-notification .action-secondary");
      } catch (error) {
        console.debug("Admin usage notification popup didn't appear.");
      }

      await expect(this.page).toHaveTitle(/Dashboard/);
      await expect(this.page.locator(".admin-user-account-text")).toHaveText(
        username
      );
    }
  }

  public async logout() {
    await this.page.goto(this.url + "/admin/auth/logout");
    await expect(this.page.locator(".message-success")).toContainText(
      /You have logged out./
    );
  }
}
