const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  // Navigate to your app
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });

  // Take a screenshot
  await page.screenshot({ path: 'screenshot.png', fullPage: true });

  await browser.close();
})();
