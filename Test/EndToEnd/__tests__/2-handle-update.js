/* eslint-disable no-undef */
const {
    onLoginPageLoginAsAdmin,
    goToAdmin,
    setDefaultConfig,
    goToPublicPage,
    setDefaultCategoryCode,
} = require("../utils/helpers");

const { CATEGORY_CODE_ALT } = require("../utils/constants");

describe(`Check handle update`, () => {
    beforeAll(async () => {
        console.debug(
            "Please ensure that you have set a catalog_category_code_test_code_1.xml file in the correct folder before running this test",
        );
        await goToAdmin();
        await onLoginPageLoginAsAdmin();
        await setDefaultConfig();
        await setDefaultCategoryCode();
    });

    it("Should display the category with layout modification", async () => {
        // Disable http cache
        await page.route(/category-1/, route => route.continue());
        await goToPublicPage("/category-1.html");
        visible = await page.isVisible("#page-title-heading");
        await expect(visible).toBe(false);
    });

    it("Should not display the category with modification as category code has changed", async () => {
        await goToAdmin();
        await setDefaultCategoryCode(CATEGORY_CODE_ALT);
        await goToPublicPage("/category-1.html");
        visible = await page.isVisible("#page-title-heading");
        await expect(visible).toBe(true);
    });
});
