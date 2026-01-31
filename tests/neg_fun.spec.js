import { test, expect } from '@playwright/test';

test.describe('Negative Functional Tests - Singlish to Sinhala Robustness', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.swifttranslator.com/', { waitUntil: 'networkidle' });
  });

  // Negative Test Cases List
  const negativeScenarios = [
    { id: 'Neg_Fun_0001', input: 'mamagedharayanavaa', expected: 'මම ගෙදර යනවා' },
    { id: 'Neg_Fun_0002', input: 'mama sunaQQQgu vunee', expected: 'මම සුනඛු වුනේ' },
    { id: 'Neg_Fun_0003', input: 'mama @#$% balannee', expected: 'මම @#$% බලන්නේ' },
    { id: 'Neg_Fun_0004', input: 'mama gedhra yanavaa', expected: 'මම ගෙදර යනවා' },
    { id: 'Neg_Fun_0005', input: 'MaMa GeDhaRa YaNaVaa', expected: 'මම ගෙදර යනවා' },
    { id: 'Neg_Fun_0006', input: 'mam4 g3dhar4 y4n4v44', expected: 'මම ගෙදර යනවා' },
    { id: 'Neg_Fun_0007', input: 'mama gedhara yana', expected: 'මම ගෙදර යන' },
    { id: 'Neg_Fun_0008', input: 'kana kanna oonee', expected: 'කන කන්න ඕනේ' },
    { id: 'Neg_Fun_0009', input: 'mamaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa gedhara yanavaa', expected: 'මම ගෙදර යනවා' },
    { id: 'Neg_Fun_0010', input: 'මම ගෙදර යනවා', expected: 'මම ගෙදර යනවා' },
  ];

  for (const scenario of negativeScenarios) {
    test(`${scenario.id}: Testing Robustness with "${scenario.input}"`, async ({ page }) => {
      const inputField = page.locator('textarea').first();
      const outputField = page.locator('div:has-text("Sinhala") + div').nth(1);

      // Single Input
      await inputField.fill(scenario.input);

      // waiting 2 minitues to translate sentence
      await page.waitForTimeout(2000);

      // ✅ ensure output had time to render before comparing
      const actualOutput = await outputField.innerText();
      console.log(`${scenario.id} Actual Output: ${actualOutput}`);

      await expect(outputField).not.toHaveText(scenario.expected, { timeout: 25000 });
    });
  }
});