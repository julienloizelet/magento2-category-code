import AdminSystemConfigPage from "../system-config";

export default class AdminOkaeliCategoryCodeConfigPage extends AdminSystemConfigPage {
  public async goToConfigSection() {
    await this.page.getByRole("tab", { name: "Catalog " }).click();
    await this.page.getByRole("link", { name: "Catalog", exact: true }).click();
    // Show storefornt fieldset
    try {
      await this.page.waitForSelector("#catalog_frontend", { timeout: 2000 });
    } catch (error) {
      await this.page.click("#catalog_frontend-head");
    }
  }

  private async setDefault() {
    await this.page
      .getByRole("combobox", {
        name: "[GLOBAL] Add category code handle",
      })
      .selectOption("1");
  }

  public async setDefaultConfig(check = true) {
    await this.navigateTo(check);
    await this.goToConfigSection();
    await this.setDefault();
    await this.saveConfig();
  }

  public async disableFront(check = true) {
    await this.navigateTo(check);
    await this.goToConfigSection();
    await this.page
      .getByRole("combobox", {
        name: "[GLOBAL] Add category code handle",
      })
      .selectOption("0");
    await this.saveConfig();
  }
}
