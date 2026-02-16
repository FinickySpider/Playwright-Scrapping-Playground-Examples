// ==============================================
//  📸  Take a Screenshot of Any Webpage
// ==============================================
//
//  Run with:  npm run scrape:screenshot
//
//  This example opens a page and saves a screenshot
//  as a PNG file. Great for seeing what the scraper "sees".

import { chromium } from "playwright";

// Change this to any URL!
const TARGET_URL = "https://quotes.toscrape.com";
const OUTPUT_FILE = "screenshot.png";

async function main() {
  const browser = await chromium.launch({ headless: true }); // headless is fine for screenshots
  const page = await browser.newPage();

  // Set a desktop-sized window
  await page.setViewportSize({ width: 1280, height: 720 });

  console.log(`🌐 Going to ${TARGET_URL}...`);
  await page.goto(TARGET_URL);
  await page.waitForLoadState("domcontentloaded");

  // Take a screenshot!
  await page.screenshot({ path: OUTPUT_FILE, fullPage: true });
  console.log(`📸 Screenshot saved to ${OUTPUT_FILE}`);

  await browser.close();
  console.log("✅ Done!");
}

main().catch((err) => {
  console.error("❌ Something went wrong:", err.message);
  process.exit(1);
});
