// @ts-check
import { test, expect } from "../fixtures";
import { CATEGORY_CODE_1, CATEGORY_CODE_ALT } from "../helpers/constants";

test.describe("Category page", () => {
  test.beforeAll(async () => {
    console.debug(
      "Please ensure that you have set a catalog_category_code_test_code_1.xml file in the correct folder before running this test"
    );
  });

  test("can set default config", async ({
    adminOkaeliCategoryCodeConfigPage,
    adminOkaeliCategoryCodeCategoryOnePage,
    adminCachePage,
  }) => {
    await adminOkaeliCategoryCodeConfigPage.setDefaultConfig();
    await adminOkaeliCategoryCodeCategoryOnePage.setCategoryCode(
      CATEGORY_CODE_1
    );
    await adminCachePage.navigateTo();
    await adminCachePage.flushMagentoCache();
  });

  test("Should display the category with layout modification", async ({
    categoryOnePage,
    page,
  }) => {
    await categoryOnePage.navigateTo();
    const visible = await page.isVisible("#page-title-heading");
    expect(visible).toBe(false);
  });

  test("Should not display the category with modification as category code has changed", async ({
    categoryOnePage,
    page,
    adminOkaeliCategoryCodeCategoryOnePage,
    adminCachePage,
  }) => {
    await adminOkaeliCategoryCodeCategoryOnePage.setCategoryCode(
      CATEGORY_CODE_ALT
    );
    await adminCachePage.navigateTo();
    await adminCachePage.flushMagentoCache();

    await categoryOnePage.navigateTo();
    const visible = await page.isVisible("#page-title-heading");
    expect(visible).toBe(true);
  });
});
