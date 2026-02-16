// ==============================================
//  📰  Scrape Headlines from a News Site
// ==============================================
//
//  Run with:  npm run scrape:headlines
//
//  This example grabs all the headlines from Hacker News.

import { chromium } from "playwright";

async function main() {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  console.log("🌐 Going to Hacker News...");
  await page.goto("https://news.ycombinator.com");
  await page.waitForLoadState("domcontentloaded");

  // Grab all story titles
  const headlines = await page.$$eval(".titleline > a", (links) => {
    return links.map((a) => ({
      title: a.textContent,
      url: a.href,
    }));
  });

  console.log(`\n📰 Found ${headlines.length} headlines:\n`);
  headlines.forEach((item, i) => {
    console.log(`  ${i + 1}. ${item.title}`);
    console.log(`     🔗 ${item.url}\n`);
  });

  await browser.close();
  console.log("✅ Done!");
}

main().catch((err) => {
  console.error("❌ Something went wrong:", err.message);
  process.exit(1);
});
