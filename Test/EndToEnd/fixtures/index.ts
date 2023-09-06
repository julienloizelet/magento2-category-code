import { test as baseTest } from "@playwright/test";

import AdminCachePage from "../pageObjects/luma/admin/cache";
import AdminLoginPage from "../pageObjects/luma/admin/login";
import AdminSystemConfigPage from "../pageObjects/luma/admin/system-config";
import AdminOkaeliCategoryCodeConfigPage from "../pageObjects/luma/admin/okaeli-category-code/config";
import AdminOkaeliCategoryCodeCategoryOnePage from "../pageObjects/luma/admin/okaeli-category-code/category-one";
import CategoryOnePage from "../pageObjects/luma/category-one";
import screenshotOnFailure from "./helpers/screenshot";

type pages = {
  adminCachePage: AdminCachePage;
  adminLoginPage: AdminLoginPage;
  adminOkaeliCategoryCodeConfigPage: AdminOkaeliCategoryCodeConfigPage;
  adminOkaeliCategoryCodeCategoryOnePage: AdminOkaeliCategoryCodeCategoryOnePage;
  adminSystemConfigPage: AdminSystemConfigPage;
  categoryOnePage: CategoryOnePage;
  screenshotOnFailure: void;
};

const testPages = baseTest.extend<pages>({
  adminCachePage: async ({ page }, use) => {
    await use(new AdminCachePage(page));
  },
  adminLoginPage: async ({ page }, use) => {
    await use(new AdminLoginPage(page));
  },
  adminOkaeliCategoryCodeConfigPage: async ({ page }, use) => {
    await use(new AdminOkaeliCategoryCodeConfigPage(page));
  },
  adminOkaeliCategoryCodeCategoryOnePage: async ({ page }, use) => {
    await use(new AdminOkaeliCategoryCodeCategoryOnePage(page));
  },
  adminSystemConfigPage: async ({ page }, use) => {
    await use(new AdminSystemConfigPage(page));
  },
  categoryOnePage: async ({ page }, use) => {
    await use(new CategoryOnePage(page));
  },
  screenshotOnFailure: [
    async ({ page }, use, testInfo) => {
      await use();
      await screenshotOnFailure({ page }, testInfo);
    },
    { auto: true },
  ],
});

export const test = testPages;
export const expect = testPages.expect;
export const describe = testPages.describe;
