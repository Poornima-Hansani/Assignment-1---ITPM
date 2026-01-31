import { test, expect } from '@playwright/test';

test.describe('Positive Functional Tests - Singlish to Sinhala', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.swifttranslator.com/', { waitUntil: 'networkidle' });
  });

  // Positive Test Cases List
  const testScenarios = [
    { id: 'Pos_Fun_0001', input: 'mama gedhara yanavaa', expected: 'මම ගෙදර යනවා' },
    { id: 'Pos_Fun_0002', input: 'mama gedhara yanavaa, haebaeyi vahina nisaa dhaenma yannee naee ', expected: 'මම ගෙදර යනවා, හැබැයි වහින නිසා දැන්ම යන්නේ නැහැ' },
    { id: 'Pos_Fun_0003', input: 'oya enavaanam mama balan innavaa', expected: 'ඔය එනවානම් මම බලන් ඉන්නවා ' },
    { id: 'Pos_Fun_0004', input: 'oyaa kavadhdha enna hithan inne?', expected: 'ඔයා කවද්ද එන්න හිතන් ඉන්නේ?' },
    { id: 'Pos_Fun_0005', input: 'mata kiyanna', expected: 'මට කියන්න' },
    { id: 'Pos_Fun_0006', input: 'mama iiyee gedhara giyaa ', expected: 'මම ඊයේ ගෙදර ගියා ' },
    { id: 'Pos_Fun_0007', input: 'mama dhaen vaeda karanavaa', expected: 'මම දැන් වැඩ කරනවා' },
    { id: 'Pos_Fun_0008', input: 'mama heta enavaa', expected: 'මම හෙට එනවා' },
    { id: 'Pos_Fun_0009', input: 'mama ehema karannee naehae', expected: 'මම එහෙම කරන්නේ නැහැ' },
    { id: 'Pos_Fun_0010', input: 'api yamu', expected: 'අපි යමු' },
    { id: 'Pos_Fun_0011', input: 'aayuboovan!', expected: 'ආයුබෝවන්!' },
    { id: 'Pos_Fun_0012', input: 'karuNaakaralaa eka poddak balanna', expected: 'කරුණාකරලා එක පොඩ්ඩක් බලන්න' },

    {
      id: 'Pos_Fun_0013',
      input: 'mata oona',
      expected: 'මට ඕන'
    },

    { id: 'Pos_Fun_0014', input: 'hari hari', expected: 'හරි හරි' },
    { id: 'Pos_Fun_0015', input: 'WiFi eka vaeda karannee naehae', expected: 'WiFi එක වැඩ කරන්නේ නැහැ' },
    { id: 'Pos_Fun_0016', input: 'siiyaa Colombo yanna hadhannee', expected: 'සීයා Colombo යන්න හදන්නේ' },
    { id: 'Pos_Fun_0017', input: 'oyaagee NIC eka gennaavadha?', expected: 'ඔයාගේ NIC එක ගෙන්නාවද?' },
    { id: 'Pos_Fun_0018', input: 'supiri!', expected: 'සුපිරි!' },
    { id: 'Pos_Fun_0019', input: 'oya hariyata vaeda karanavaadha?', expected: 'ඔය හරියට වැඩ කරනවාද?' },
    { id: 'Pos_Fun_0020', input: 'oyaage yaaluvaata kohomadha?', expected: 'ඔයාගෙ යාලුවාට කොහොමද?' },
    { id: 'Pos_Fun_0021', input: 'poth kiyavanna mama aasayi.', expected: 'පොත් කියවන්න මම ආසයි.' },
    { id: 'Pos_Fun_0022', input: 'oyaa vahaama enna.', expected: 'ඔයා වහාම එන්න.' },

    { id: 'Pos_Fun_0023', input: 'mat aoyaagen  udhavvak karaganna puLuvandha? ', expected: 'mat අඔයාගෙන්  උදව්වක් කරගන්න පුළුවන්ද? ' },

    { id: 'Pos_Fun_0024', input: 'ow, mama balannam.', expected: 'ow, මම බලන්නම්.' },
    { id: 'Pos_Fun_0025', input: 'samaavenna, eeka maage athvaeradhiimak.', expected: 'සමාවෙන්න, ඒක මාගෙ අත්වැරදීමක්.' },
  ];

  //for loop
  for (const data of testScenarios) {
    test(`${data.id}: ${data.input}`, async ({ page }) => {
      const inputField = page.locator('textarea').first();
      const outputField = page.locator('div:has-text("Sinhala") + div').nth(1);

      // Input items
      await inputField.fill(data.input);

      // waiting ti translate
      await page.waitForTimeout(2000);

      // ✅ fix: more time for slow browsers
      await expect(outputField).not.toBeEmpty({ timeout: 25000 });

      // Display actual output
      const actualOutput = await outputField.innerText();
      console.log(`${data.id} Actual Output: ${actualOutput}`);

      // ✅ fix: more time for slow browsers
      await expect(outputField).toHaveText(data.expected, { timeout: 25000 });
    });
  }
});
