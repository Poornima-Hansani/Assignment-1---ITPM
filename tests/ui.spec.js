import { test, expect } from '@playwright/test';

test.describe('UI Performance and Behavior Tests', () => {

  test('Pos_UI_0001: Real-time Sinhala output update validation', async ({ page }) => {

    await page.goto('https://www.swifttranslator.com/', { waitUntil: 'networkidle' });

    const inputField = page.locator('textarea').first();
    const outputField = page.locator('div:has-text("Sinhala") + div').nth(1);

    const testInput = 'mama yanavaa';

    // Type slowly to trigger live translation
    await inputField.click();
await inputField.fill('');

// ✅ real typing events across all browsers
await inputField.type(testInput, { delay: 100 });

// ✅ wait for output to change (stronger than fixed timeout)
await expect
  .poll(async () => (await outputField.innerText()).trim(), { timeout: 25000 })
  .not.toBe('');

    // Wait for translation
    await expect(outputField).not.toBeEmpty({ timeout: 25000 });

    const actualOutput = await outputField.innerText();
    console.log('Pos_UI_0001 Actual Output: ' + actualOutput);

    await expect(outputField).toHaveText(/මම\s+යනවා/, { timeout: 25000 });
  });

});
