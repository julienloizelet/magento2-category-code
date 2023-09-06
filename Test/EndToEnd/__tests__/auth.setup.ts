import { test as setup } from "../fixtures";
import { adminName, adminPwd } from "../helpers/constants";

const authFile = "__tests__/.auth/user.json";

setup("authenticate", async ({ adminLoginPage, page }) => {
  await adminLoginPage.navigateTo();
  await adminLoginPage.login(adminName, adminPwd);
  // End of authentication steps.
  await page.context().storageState({ path: authFile });
});
