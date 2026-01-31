const { test } = require('@playwright/test');

test('Pos_Fun_0001 – Convert simple daily sentence', async ({ page }) => {
  // 1. Open Swift Translator
  await page.goto('https://www.swifttranslator.com/');

  // 2. Enter Singlish input
  await page.fill('textarea', 'mama gedhara yanavaa');

  // 3. Wait for Sinhala output to update
  await page.waitForTimeout(2000);

  // Note:
  // Sinhala output is observed manually and recorded in Excel
});