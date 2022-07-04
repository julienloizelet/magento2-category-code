/* eslint-disable no-undef */
const {
    goToAdmin,
    onLoginPageLoginAsAdmin,
    setDefaultConfig,
    fillByName,
    onAdminSaveSettings,
    setDefaultCategoryCode,
} = require("../utils/helpers");

const { CATEGORY_CODE_1 } = require("../utils/constants");

describe(`Extension configuration`, () => {
    it("Should login to M2 admin", async () => {
        await goToAdmin();
        await onLoginPageLoginAsAdmin();
    });

    it("Should set default config", async () => {
        await setDefaultConfig(true, false);
    });

    it("Should add code to Category 1", async () => {
        await setDefaultCategoryCode();
    });

    it("Should failed add the same code to Category 2", async () => {
        await goToAdmin("catalog/category/edit/id/10/");
        await fillByName("okaeli_category_code", CATEGORY_CODE_1);
        await onAdminSaveSettings(false);
        await expect(page).toMatchText(
            "#messages",
            /Set a unique value and try again/,
        );
    });
});
