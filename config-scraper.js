// ==============================================
//  ⚙️  Config-Based Scraper (No Code Needed!)
// ==============================================
//
//  Run with:  npm run config-scrape
//
//  Edit config.json to change what gets scraped!
//  You don't need to touch this file at all.

import { chromium } from "playwright";
import fs from "fs";

async function runConfigScraper() {
  // Read the config file
  const config = JSON.parse(fs.readFileSync("./config.json", "utf8"));

  console.log("🔧 Using configuration from config.json");
  console.log(`🌐 URL: ${config.url}`);

  // Launch browser
  const browser = await chromium.launch({
    headless: !config.showBrowser,
  });

  const page = await browser.newPage();

  try {
    // Go to the URL from config
    await page.goto(config.url);
    await page.waitForLoadState("domcontentloaded");

    // Optional: wait a bit for dynamic content
    if (config.waitTime > 0) {
      await page.waitForTimeout(config.waitTime);
    }

    // Scrape using configured selectors
    const results = {};

    for (const [name, selector] of Object.entries(config.selectors)) {
      try {
        const elements = await page.$$eval(selector, (els) =>
          els.map((el) => el.textContent?.trim())
        );
        results[name] = elements;
        console.log(`\n✅ Found ${elements.length} items for "${name}"`);
      } catch (err) {
        console.log(`\n⚠️  Could not find "${name}" using selector: ${selector}`);
        results[name] = [];
      }
    }

    // Display results
    console.log("\n📊 Results:\n");
    console.log(JSON.stringify(results, null, 2));

    // Optional: take screenshot
    if (config.screenshot) {
      await page.screenshot({ path: config.screenshotPath });
      console.log(`\n📸 Screenshot saved to ${config.screenshotPath}`);
    }

    // Save results to file
    fs.writeFileSync("results.json", JSON.stringify(results, null, 2));
    console.log("\n💾 Results saved to results.json");
  } catch (error) {
    console.error("\n❌ Error:", error.message);
    console.log("\n💡 Tip: Check that your URL and selectors in config.json are correct!");
  } finally {
    await browser.close();
    console.log("\n✅ Done!");
  }
}

runConfigScraper();
