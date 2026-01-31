import { test, expect } from '@playwright/test';

test.describe('Positive Functional Tests - Singlish to Sinhala', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.swifttranslator.com/', { waitUntil: 'networkidle' });
  });

  // Positive Test Cases List
  const testScenarios = [
    { id: 'Pos_Fun_0001', input: 'aayubovan!', expected: 'ආයුබොවන්!' },
    { id: 'Pos_Fun_0002', input: 'mama adha gedhara enavaa. ', expected: 'මම අද ගෙදර එනවා. ' },
    { id: 'Pos_Fun_0003', input: 'heta udhaeesana vaahanaya enavaa.', expected: 'හෙට උදෑසන වාහනය එනවා. ' },
    { id: 'Pos_Fun_0004', input: 'poddak inna, mama enakal.', expected: 'පොඩ්ඩක් ඉන්න, මම එනකල්.' },
    { id: 'Pos_Fun_0005', input: 'vaedak karanna epaa.', expected: 'වැඩක් කරන්න එපා.' },
    { id: 'Pos_Fun_0006', input: 'api anidhdhaa enavaa. ', expected: 'අපි අනිද්දා එනවා. ' },
    { id: 'Pos_Fun_0007', input: 'mata NIC eka mathaka naehae.', expected: 'මට NIC එක මතක නැහැ.' },
    { id: 'Pos_Fun_0008', input: 'paasala nivaadu nisaa api gamata yamu.', expected: 'පාසල නිවාඩු නිසා අපි ගමට යමු.' },
    { id: 'Pos_Fun_0009', input: 'Zoom meeting eka 11ta thiyenne.', expected: 'Zoom meeting එක 11ට තියෙන්නෙ.' },
    { id: 'Pos_Fun_0010', input: 'Rs. 1500k dhiilaa badu gaththaa.', expected: 'Rs. 1500ක් දීලා බඩු ගත්තා.' },
    { id: 'Pos_Fun_0011', input: 'oyaage phone number eka dhenna.', expected: 'ඔයාගෙ phone number එක දෙන්න.' },
    { id: 'Pos_Fun_0012', input: 'bus booking system eka vaeda.', expected: 'bus booking system එක වැඩ.' },

    {
      id: 'Pos_Fun_0013',
      input: 'lankavee dheesaguna dheparththumenthuva pavasanne adha rathri kaalayeedhi dhivayinee bohoo pradheesha khipayakata thadha vaesi aethiviya haeki bavayi. visheeshayenma basnaahira saha sabaragamuva palathvala minissu praveesham viya yuthuyi',
      expected: 'ලන්කවේ දේසගුන දෙපර්ත්තුමෙන්තුව පවසන්නෙ අද රත්‍රි කාලයේදි දිවයිනේ බොහෝ ප්‍රදේශ ක්හිපයකට තද වැසි ඇතිවිය හැකි බවයි. විශේශයෙන්ම බස්නාහිර සහ සබරගමුව පලත්වල මිනිස්සු ප්‍රවේශම් විය යුතුයි'
    },

    { id: 'Pos_Fun_0014', input: 'oyaage time table eka mata dhenna', expected: 'ඔයාගෙ time table එක මට දෙන්න' },
    { id: 'Pos_Fun_0015', input: 'mama 30 kg barayi', expected: 'මම 30 kg බරයි' },
    { id: 'Pos_Fun_0016', input: '12/05/2026 kiyanne mage birthday eka', expected: '12/05/2026 කියන්නෙ mage birthday එක' },
    { id: 'Pos_Fun_0017', input: 'maamaa kaeema eka kaevaadha?', expected: 'මාමා කෑම එක කැවාද?' },
    { id: 'Pos_Fun_0018', input: 'adha meyalage kaeema hari rahayi.', expected: 'අද මෙයලගෙ කෑම හරි රහයි.' },
    { id: 'Pos_Fun_0019', input: 'karunaakarala mata udhav karanna.', expected: 'කරුනාකරල මට උදව් කරන්න.' },
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
