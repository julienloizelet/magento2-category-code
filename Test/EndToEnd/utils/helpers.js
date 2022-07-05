/* eslint-disable no-undef */
const fs = require("fs");

const {
    ADMIN_URL,
    M2_URL,
    ADMIN_LOGIN,
    ADMIN_PASSWORD,
    TIMEOUT,
    CATEGORY_CODE_1,
} = require("./constants");

const wait = async (ms) => new Promise((resolve) => setTimeout(resolve, ms));

jest.setTimeout(TIMEOUT);

const fillInput = async (optionId, value) => {
    await page.fill(`[id=${optionId}]`, `${value}`);
};
const fillByName = async (name, value) => {
    await page.fill(`[name=${name}]`, `${value}`);
};

const selectElement = async (selectId, valueToSelect) => {
    await page.selectOption(`[id=${selectId}]`, `${valueToSelect}`);
};

const selectByName = async (selectName, valueToSelect) => {
    await page.selectOption(`[name=${selectName}]`, `${valueToSelect}`);
};

const goToAdmin = async (endpoint = "") => {
    await page.goto(`${ADMIN_URL}${endpoint}`, { waitUntil: "networkidle" });
};

const goToPublicPage = async (endpoint = "") => {
    return page.goto(`${M2_URL}${endpoint}`);
};

const ensureConfigVisibilty = async () => {
    let visible = await page.isVisible("#catalog_frontend");
    if (!visible) {
        await page.click("#catalog_frontend-head");
        await wait(1500);
    }
    visible = await page.isVisible("#catalog_frontend");
    await expect(visible).toBeTruthy();
};

const onAdminGoToSettingsPage = async (direct = true) => {
    if (direct) {
        await page.goto(
            `${ADMIN_URL}admin/system_config/edit/section/catalog/`,
            {
                waitUntil: "networkidle",
            },
        );
    } else {
        await page.click("#menu-magento-backend-stores > a");
        await page.waitForLoadState("networkidle");
        await page.click(
            '#menu-magento-backend-stores .item-system-config:has-text("Configuration") ',
        );
        await page.waitForLoadState("networkidle");
        await wait(3000);
        await page.click(
            '#system_config_tabs .config-nav-block:has-text("Catalog")',
        );
        await wait(1500);
        await page.click('.config-nav-block li:has-text("Catalog")');
    }
};

const onAdminSaveSettings = async (successExpected = true) => {
    await page.click("#save");
    await wait(3000);
    if (successExpected) {
        await expect(page).toMatchText("#messages", /You saved/);
    }
};

const goToSettingsPage = async (direct = true) => {
    await goToAdmin();
    await onAdminGoToSettingsPage(direct);
    await ensureConfigVisibilty();
};

const setDefaultConfig = async (save = true, direct = true) => {
    await goToSettingsPage(direct);
    await wait(1500);
    // Enable layout update
    await selectElement("catalog_frontend_okaeli_category_layout_update", "1");
    await wait(1500);
    if (save) {
        await onAdminSaveSettings();
    }
};

const setDefaultCategoryCode = async (code = CATEGORY_CODE_1) => {
    await goToAdmin("catalog/category/edit/id/3/");
    await fillByName("okaeli_category_code", code);
    await onAdminSaveSettings();
};

const flushCache = async () => {
    await goToAdmin();
    await page.click("#menu-magento-backend-system > a");
    await page.waitForLoadState("networkidle");

    await page.click(
        '#menu-magento-backend-system .item-system-cache:has-text("Cache Management") ',
    );
    await page.waitForLoadState("networkidle");
    await expect(page).toMatchTitle(/Cache Management/);
    await page.click("#flush_magento");
    await page.waitForLoadState("networkidle");
    await expect(page).toMatchText(
        "#messages",
        "The Magento cache storage has been flushed.",
    );
};

const onLoginPageLoginAsAdmin = async () => {
    await page.fill("#username", ADMIN_LOGIN);
    await page.fill("#login", ADMIN_PASSWORD);
    await page.click(".action-login");
    await page.waitForLoadState("networkidle");
    // On first login only, there is a modal to allow admin usage statistics
    adminUsage = await page.isVisible(".admin-usage-notification");
    if (adminUsage) {
        await page.click(".admin-usage-notification .action-secondary");
        await page.waitForLoadState("networkidle");
    }

    await expect(page).toMatchTitle(/Dashboard/);
};

const getFileContent = async (filePath) => {
    if (fs.existsSync(filePath)) {
        return fs.readFileSync(filePath, "utf8");
    }
    return "";
};

const deleteFileContent = async (filePath) => {
    if (fs.existsSync(filePath)) {
        return fs.writeFileSync(filePath, "");
    }
    return false;
};

module.exports = {
    wait,
    goToAdmin,
    goToPublicPage,
    goToSettingsPage,
    onAdminGoToSettingsPage,
    onAdminSaveSettings,
    flushCache,
    onLoginPageLoginAsAdmin,
    fillInput,
    fillByName,
    selectElement,
    selectByName,
    getFileContent,
    deleteFileContent,
    setDefaultConfig,
    setDefaultCategoryCode,
};
