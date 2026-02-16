// ==============================================
//  🔗  Scrape All Links from a Page
// ==============================================
//
//  Run with:  npm run scrape:links
//
//  This example grabs every link (<a> tag) on a page
//  and prints out where they go.

import { chromium } from "playwright";

// Change this to any URL you want to scan!
const TARGET_URL = "https://quotes.toscrape.com";

async function main() {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  console.log(`🌐 Going to ${TARGET_URL}...`);
  await page.goto(TARGET_URL);
  await page.waitForLoadState("domcontentloaded");

  // Grab all <a> tags on the page
  const links = await page.$$eval("a", (anchors) => {
    return anchors
      .map((a) => ({
        text: a.textContent?.trim() || "(no text)",
        url: a.href,
      }))
      .filter((link) => link.url.startsWith("http")); // only real URLs
  });

  console.log(`\n🔗 Found ${links.length} links:\n`);
  links.forEach((link, i) => {
    console.log(`  ${i + 1}. "${link.text}"`);
    console.log(`     → ${link.url}\n`);
  });

  await browser.close();
  console.log("✅ Done!");
}

main().catch((err) => {
  console.error("❌ Something went wrong:", err.message);
  process.exit(1);
});
