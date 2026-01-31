import { test, expect } from '@playwright/test';

test.describe('Negative Functional Tests - Singlish to Sinhala Robustness', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.swifttranslator.com/', { waitUntil: 'networkidle' });
  });

  // Negative Test Cases List
  const negativeScenarios = [
    { id: 'Neg_Fun_0001', input: 'karyaalayayenlaebunulipinayaaeththatamamatalaebunenaehae', expected: 'කර්යාලයයෙන් ලැබුනු ලිපිනය ඇත්තටම මට ලැබුනෙ නැහැ' },
    { id: 'Neg_Fun_0002', input: 'vaessaathapiyamu kandy trip eka yanna.', expected: 'වැස්සත් අපි යමු මහනුවර ට්‍රිප් එක යන්න.' },
    { id: 'Neg_Fun_0003', input: 'shreemathvibhagaya pass kalla pvt job eka set.', expected: 'ශ්‍රීමත් විභාගය පාස් කරලා ප්‍රයිවට් ජොබ් එක සෙට්.' },
    { id: 'Neg_Fun_0004', input: 'mama g@dhara y@n@vaa', expected: 'මම ගෙදර යනවා' },
    { id: 'Neg_Fun_0005', input: 'mamaayethiiye kiyawapu pothha hoda nae.', expected: 'මම ආයෙත් ඊයේ කියවපු පොත හොඳ නෑ' },
    { id: 'Neg_Fun_0006', input: 'Teamsmeetingekee linkeka WhatsAppkarannapuluwanda?', expected: 'ටීම්ස් මීටින් එකේ ලින්ක් එක වට්සැප් කරන්න පුළුවන්ද?' },
    { id: 'Neg_Fun_0007', input: 'Rs.5343kapariganakaya mila adhikaivagee.', expected: 'රු. 5343 ක පරිගණකය මිල අධිකයි වගේ.' },
    { id: 'Neg_Fun_0008', input: 'dhesaembar25ta colombo yanavaa kiyahankoo.', expected: 'දෙසැම්බර් 25 ට කොළඹ යනවා කියහන්කෝ.' },
    { id: 'Neg_Fun_0009', input: '7.30AMta karala office eken off wenna ona.', expected: '7.30 ට කරලා ඔෆිස් එකෙන් off වෙන්න ඕන.' },
    { id: 'Neg_Fun_0010', input: 'adhapaasalyanneevaeenekee trafficnisaa.', expected: 'අද පාසල් යන්නේ නෑ ඒකේ ට්‍රැෆික් නිසා' },
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