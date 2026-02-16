# Web Scraper Playground

A beginner-friendly project for learning web scraping with **Playwright** and Node.js.

## 🎯 Complete Beginner? Start Here!

**Windows Users:** Double-click `START-HERE.bat` to open the interactive guide in your browser!

The project includes **beautiful HTML guides** with:
- 🎨 Beautiful, easy-to-read format with gradient backgrounds
- 🎮 Interactive CSS selector builder
- 📚 All examples with syntax-highlighted code snippets
- 🚨 Troubleshooting help with friendly error messages
- 📖 Learning resources and external links
- 🗺️ Mermaid flowcharts showing your learning journey
- 🔗 Easy navigation between all guides

**Available Guides:**
- [`index.html`](index.html) - Home page with overview of everything
- [`quick-start.html`](quick-start.html) - Get started in 5 minutes
- [`guide.html`](guide.html) - Full interactive guide with examples
- [`learning-path.html`](learning-path.html) - Visual roadmap with Mermaid diagrams
- [`cheatsheet.html`](cheatsheet.html) - Quick reference for all commands
- [`readme.html`](readme.html) - This README in beautiful HTML format

**Or:** Run `npm start` to open the home page.

---

## What is web scraping?

Web scraping means using code to automatically read information from websites — like copying text, links, or images from a page, but letting a script do it for you.

**Playwright** is a tool that lets your code control a real web browser (Chrome, Firefox, etc.). You can tell it to go to a page, click buttons, fill out forms, and read whatever is on the screen.

---

## Getting Started

### 🚀 Quick Start (Windows Users)

**The easiest way:** Just double-click `setup.bat` in this folder! It will:
- Check if Node.js is installed
- Install all dependencies
- Download the browsers
- Get you ready to scrape!

### Manual Setup

**1. Make sure you have Node.js installed**

Open a terminal and run:

```
node --version
```

If you see a version number (like `v18.x.x` or higher), you're good! If not, download Node.js from [https://nodejs.org](https://nodejs.org) (pick the **LTS** version).

**2. Install the project dependencies**

In this project folder, run:

```
npm install
```

This downloads Playwright and the browsers it needs. It may take a few minutes the first time — that's normal, it's downloading a whole browser!

**3. Install Playwright browsers**

```
npx playwright install chromium
```

### 🎯 Run Your First Scraper!

**Complete beginner?** Start with the ultra-simple version:
```
npm run beginner
```

**Ready for more?** Try the main scraper:
```
npm run scrape
```

**Don't want to code?** Use the config-based scraper:
```
npm run config-scrape
```
Just edit `config.json` to change what it scrapes — no code required!

---

## Example Scripts

| Command                     | Difficulty | What it does                                    |
| --------------------------- | ---------- | ----------------------------------------------- |
| `npm run beginner`          | ⭐         | Ultra-simple 20-line scraper (start here!)      |
| `npm run config-scrape`     | ⭐         | No coding! Just edit config.json                |
| `npm run scrape`            | ⭐⭐       | Scrapes quotes from a practice site             |
| `npm run scrape:headlines`  | ⭐⭐       | Grabs headlines from Hacker News                |
| `npm run scrape:links`      | ⭐⭐       | Lists every link on a page                      |
| `npm run scrape:images`     | ⭐⭐       | Finds all images on a Wikipedia page            |
| `npm run scrape:screenshot` | ⭐⭐       | Takes a screenshot of a webpage and saves it    |

---

## 🎓 For Complete Beginners (No Coding!)

### Config-Based Scraping

Don't want to write code yet? Use the config-based scraper!

1. Open `config.json` in a text editor
2. Change the `url` to any website you want
3. Update the `selectors` to match what you want to scrape
4. Run: `npm run config-scrape`

The scraper will automatically:
- Visit your URL
- Extract data using your selectors
- Save results to `results.json`
- Optionally take screenshots

**Example config.json:**
```json
{
  "url": "https://quotes.toscrape.com",
  "showBrowser": true,
  "selectors": {
    "quotes": ".quote .text",
    "authors": ".quote .author"
  },
  "waitTime": 2000,
  "screenshot": false
}
```

No JavaScript knowledge required! Just edit the JSON file.

---

## How to Scrape Your Own Websites

1. **Pick a URL** — Change the `TARGET_URL` or `URL_TO_SCRAPE` variable at the top of any script.

2. **Find the right selectors** — Open the website in Chrome, right-click on something you want to scrape, and click **"Inspect"**. You'll see the HTML. Look for:
   - **Class names** like `.title`, `.price`, `.author` → use them as `".title"`
   - **Tag names** like `<h1>`, `<p>`, `<img>` → use them as `"h1"`
   - **IDs** like `id="main"` → use them as `"#main"`

3. **Use Playwright to grab the data** — The basic pattern is:
   ```javascript
   const data = await page.$$eval("YOUR-SELECTOR", (elements) => {
     return elements.map((el) => el.textContent);
   });
   ```

---

## Useful Playwright Tricks

```javascript
// Go to a page
await page.goto("https://example.com");

// Click a button
await page.click("button.submit");

// Type into a search box
await page.fill("input#search", "hello world");

// Wait for something to appear
await page.waitForSelector(".results");

// Get text from one element
const title = await page.textContent("h1");

// Get text from many elements
const items = await page.$$eval("li", (els) => els.map((e) => e.textContent));

// Take a screenshot
await page.screenshot({ path: "pic.png" });

// Wait a few seconds (useful for slow pages)
await page.waitForTimeout(3000); // 3 seconds
```

---

## Tips

- **`headless: false`** opens a visible browser so you can watch what's happening. Great for debugging!
- **`headless: true`** runs invisibly in the background — faster, but you can't see it.
- If a page takes a while to load, use `await page.waitForSelector(".some-class")` to wait until the content you need is there.
- **Be respectful** — don't scrape too fast or too much. Add `await page.waitForTimeout(1000)` between requests to be polite to servers.
- Some websites don't want to be scraped. Check their `robots.txt` (e.g., `https://example.com/robots.txt`) and terms of service.

---

## 🚨 Troubleshooting

### "node is not recognized" or "npm is not recognized"
**Problem:** Node.js isn't installed or isn't in your PATH.  
**Solution:** Download and install Node.js from [nodejs.org](https://nodejs.org). Make sure to check "Add to PATH" during installation.

### "Cannot find module 'playwright'"
**Problem:** Dependencies aren't installed.  
**Solution:** Run `npm install` in the project folder.

### "Browser not found" or "Executable doesn't exist"
**Problem:** Playwright browsers aren't downloaded.  
**Solution:** Run `npx playwright install chromium`

### The scraper can't find any elements (returns empty array)
**Problem:** Your CSS selector is wrong or the page hasn't loaded yet.  
**Solution:**
1. Right-click the element on the webpage and choose "Inspect"
2. Look at the HTML and find a unique class or ID
3. Add a wait: `await page.waitForSelector(".your-class")`
4. Try `await page.waitForTimeout(3000)` to give the page more time

### "Navigation timeout" or "Page didn't load"
**Problem:** The website is slow or blocking you.  
**Solution:**
- Increase timeout: `await page.goto(url, { timeout: 60000 })`
- Check your internet connection
- Some sites block scrapers — try a different site first

### Script runs but browser window closes immediately
**Problem:** The script finishes before you can see anything.  
**Solution:** Add `await page.waitForTimeout(5000)` before `browser.close()` to keep it open for 5 seconds.

### "Permission denied" or "Access denied"
**Problem:** The website is blocking automated access.  
**Solution:** Some websites don't allow scraping. Try practice sites like quotes.toscrape.com first.

---

## Learn More

- [Playwright Docs](https://playwright.dev/docs/intro) — The official documentation
- [Quotes to Scrape](https://quotes.toscrape.com) — A practice website made for learning scraping
- [Books to Scrape](https://books.toscrape.com) — Another practice site with fake book listings
- [CSS Selectors Guide](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_selectors) — How selectors work

Happy scraping! 🕷️
