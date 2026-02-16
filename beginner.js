// ==============================================
//  🎓 ULTRA-BEGINNER: Your First Web Scraper
// ==============================================
//
//  Run this with:  npm run beginner
//
//  This is the SIMPLEST possible scraper.
//  Every line is explained in plain English!

// Step 1: Import Playwright (this is the scraping tool)
import { chromium } from "playwright";

// Step 2: Create our main function (this is where our code runs)
async function myFirstScraper() {
  
  try {
    // Open a browser (like opening Chrome on your computer)
    const browser = await chromium.launch({ headless: false });
    
    // Open a new tab
    const page = await browser.newPage();
    
    // Go to a website
    console.log("🌐 Going to example.com...");
    await page.goto("https://example.com");
    
    // Read the big heading on the page
    const heading = await page.textContent("h1");
    
    // Print it out!
    console.log("\n✅ Success! The heading says:", heading);
    
    // Wait a moment so you can see it
    console.log("\nℹ️  Keeping browser open for 5 seconds...");
    await page.waitForTimeout(5000);
    
    // Close the browser
    await browser.close();
    console.log("\n🎉 Your first scraper worked! Try modifying the URL or selector now.");
    
  } catch (error) {
    console.error("\n❌ Oops! Something went wrong:", error.message);
    console.log("\n💡 Common fixes:");
    console.log("   1. Make sure you ran: npm install");
    console.log("   2. Make sure you ran: npx playwright install chromium");
    console.log("   3. Check your internet connection");
    console.log("\n   Still stuck? Try running setup.bat");
  }
}

// Run the scraper!
myFirstScraper();
