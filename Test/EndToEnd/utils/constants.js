const { M2_URL, DEBUG, TIMEOUT } = process.env;
const ADMIN_URL = `${M2_URL}/admin/`;
const ADMIN_LOGIN = "admin";
const ADMIN_PASSWORD = "admin123";
const CATEGORY_CODE_1 = "test_code_1";
const CATEGORY_CODE_ALT = "other_code";

module.exports = {
    ADMIN_URL,
    ADMIN_LOGIN,
    ADMIN_PASSWORD,
    M2_URL,
    DEBUG,
    TIMEOUT,
    CATEGORY_CODE_1,
    CATEGORY_CODE_ALT,
};
