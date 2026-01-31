const { test, expect } = require('@playwright/test');

const negativeCases = [
  { id: 'Neg_Fun_0001', input: 'mamagedharayanavaa' },
  { id: 'Neg_Fun_0002', input: 'mama sunaQQQgu vunee' },
  { id: 'Neg_Fun_0003', input: 'mama @#$% balannee' },
  { id: 'Neg_Fun_0004', input: 'mama gedhra yanavaa' },
  { id: 'Neg_Fun_0005', input: 'MaMa GeDhaRa YaNaVaa' },
  { id: 'Neg_Fun_0006', input: 'mam4 g3dhar4 y4n4v44' },
  { id: 'Neg_Fun_0007', input: 'mama gedhara yana' },
  { id: 'Neg_Fun_0008', input: 'kana kanna oonee' },
  { id: 'Neg_Fun_0009', input: 'mamaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa gedhara yanavaa' },
  { id: 'Neg_Fun_0010', input: 'මම ගෙදර යනවා' }
];

test.describe('Negative Functional Tests - Singlish to Sinhala Robustness', () => {
  for (const data of negativeCases) {
    test(`${data.id}: Testing Robustness with "${data.input}"`, async ({ page }) => {
      await page.goto('https://www.swifttranslator.com/', { waitUntil: 'networkidle' });

      const inputField = page.locator('textarea, input[type="text"]').first();
      const outputField = page.locator('div:has-text("Sinhala") + div').nth(1);

      await inputField.fill('');
      await inputField.type(data.input, { delay: 80 });

      // Negative case → output MAY be empty or partially converted
      const output = (await outputField.innerText()).trim();
      console.log(`${data.id} Actual Output:`, output);
    });
  }
});
