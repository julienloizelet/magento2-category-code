import type { Page, TestInfo } from "@playwright/test";

export default async function screenshotOnFailure(
  { page }: { page: Page },
  testInfo: TestInfo
) {
  if (testInfo.status !== testInfo.expectedStatus) {
    // Get a unique place for the screenshot.
    const screenshotPath = testInfo.outputPath(`failure.jpeg`);
    // Add it to the report.
    testInfo.attachments.push({
      name: "screenshot",
      path: screenshotPath,
      contentType: "image/jpeg",
    });
    // Take the screenshot itself.
    const buffer = await page.screenshot({
      path: screenshotPath,
      timeout: 5000,
      quality: 20,
    });
    if (process.env.CI) {
      console.debug("Screenshot:", buffer.toString("base64"));
    }
  }
}
