// ==============================================
//  🕷️  Web Scraper Playground - Starter Script
// ==============================================
//
//  Run this with:  npm run scrape
//
//  This script opens a real browser, goes to a website,
//  and pulls out information from the page.
//  Edit the URL and selectors below to scrape whatever you want!

import { chromium } from "playwright";

// ---- SETTINGS (change these!) ----
const URL_TO_SCRAPE = "https://quotes.toscrape.com"; // a website made for practicing scraping
// -----------------------------------

async function main() {
  // 1. Launch a browser (set headless to false to watch it happen!)
  const browser = await chromium.launch({
    headless: false, // change to true to run without opening a window
  });

  // 2. Open a new page (like a new tab)
  const page = await browser.newPage();

  // 3. Go to the website
  console.log(`🌐 Going to ${URL_TO_SCRAPE} ...`);
  await page.goto(URL_TO_SCRAPE);

  // 4. Wait a moment so the page fully loads
  await page.waitForLoadState("domcontentloaded");

  // 5. Grab all the quotes on the page
  const quotes = await page.$$eval(".quote", (quoteElements) => {
    return quoteElements.map((el) => {
      const text = el.querySelector(".text")?.textContent || "";
      const author = el.querySelector(".author")?.textContent || "";
      return { text, author };
    });
  });

  // 6. Print them out!
  console.log(`\n📜 Found ${quotes.length} quotes:\n`);
  for (const quote of quotes) {
    console.log(`  "${quote.text}"`);
    console.log(`   — ${quote.author}\n`);
  }

  // 7. Close the browser
  await browser.close();
  console.log("✅ Done!");
}

// Run it!
main().catch((err) => {
  console.error("❌ Something went wrong:", err.message);
  process.exit(1);
});
