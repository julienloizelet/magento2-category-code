// @ts-check
import { test } from "../fixtures";

test.describe("Extension configuration", () => {
  test.beforeEach(async ({ adminOkaeliCategoryCodeConfigPage }) => {
    await adminOkaeliCategoryCodeConfigPage.navigateTo();
  });

  test("can set default config", async ({
    adminOkaeliCategoryCodeConfigPage,
  }) => {
    await adminOkaeliCategoryCodeConfigPage.setDefaultConfig();
  });
});
