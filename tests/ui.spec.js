import { test, expect } from '@playwright/test';

test.describe('UI Performance and Behavior Tests', () => {

  test('Pos_UI_0001: Real-time Sinhala output update validation', async ({ page }) => {

    await page.goto('https://www.swifttranslator.com/', { waitUntil: 'networkidle' });

    const inputField = page.locator('textarea').first();
    const outputField = page.locator('div:has-text("Sinhala") + div').nth(1);

    // UI test case input
    const testInput = 'mama yanavaa';
    await inputField.pressSequentially(testInput, { delay: 100 });

    // Waiting to trnaslate
    await page.waitForTimeout(2000);

    // ✅ FIX: wait until something appears first (same method, longer timeout)
    await expect(outputField).not.toBeEmpty({ timeout: 25000 });

    // Getting actual output
    const actualOutput = await outputField.innerText();
    console.log('Pos_UI_0001 Actual Output: ' + actualOutput);

    // ✅ FIX: now validate real-time output (same method, longer timeout)
    await expect(outputField).toHaveText('මම යනවා', { timeout: 25000 });
  });

});