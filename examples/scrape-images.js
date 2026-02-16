// ==============================================
//  🖼️  Scrape All Images from a Page
// ==============================================
//
//  Run with:  npm run scrape:images
//
//  This example finds every image on a page and lists
//  the image URLs and alt text.

import { chromium } from "playwright";

// Change this to any URL you want!
const TARGET_URL = "https://en.wikipedia.org/wiki/Web_scraping";

async function main() {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  console.log(`🌐 Going to ${TARGET_URL}...`);
  await page.goto(TARGET_URL);
  await page.waitForLoadState("domcontentloaded");

  // Find all <img> tags
  const images = await page.$$eval("img", (imgs) => {
    return imgs
      .map((img) => ({
        src: img.src,
        alt: img.alt || "(no description)",
        width: img.naturalWidth,
        height: img.naturalHeight,
      }))
      .filter((img) => img.src.startsWith("http")); // skip data URIs
  });

  console.log(`\n🖼️  Found ${images.length} images:\n`);
  images.forEach((img, i) => {
    console.log(`  ${i + 1}. ${img.alt}`);
    console.log(`     📐 ${img.width}x${img.height}`);
    console.log(`     🔗 ${img.src}\n`);
  });

  await browser.close();
  console.log("✅ Done!");
}

main().catch((err) => {
  console.error("❌ Something went wrong:", err.message);
  process.exit(1);
});
