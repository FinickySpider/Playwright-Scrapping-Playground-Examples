# Web Scraper Playground

A beginner-friendly project for learning web scraping with **Playwright** and Node.js.

## What is web scraping?

Web scraping means using code to automatically read information from websites — like copying text, links, or images from a page, but letting a script do it for you.

**Playwright** is a tool that lets your code control a real web browser (Chrome, Firefox, etc.). You can tell it to go to a page, click buttons, fill out forms, and read whatever is on the screen.

---

## Getting Started

### 1. Make sure you have Node.js installed

Open a terminal and run:

```
node --version
```

If you see a version number (like `v18.x.x` or higher), you're good! If not, download Node.js from [https://nodejs.org](https://nodejs.org) (pick the **LTS** version).

### 2. Install the project dependencies

In this project folder, run:

```
npm install
```

This downloads Playwright and the browsers it needs. It may take a few minutes the first time — that's normal, it's downloading a whole browser!

### 3. Run your first scraper!

```
npm run scrape
```

This will open a browser window, go to a practice website, and print out quotes it finds on the page. Watch the browser — you'll see it happen live!

---

## Example Scripts

| Command                    | What it does                                      |
| -------------------------- | ------------------------------------------------- |
| `npm run scrape`           | Scrapes quotes from a practice site               |
| `npm run scrape:headlines` | Grabs headlines from Hacker News                  |
| `npm run scrape:links`     | Lists every link on a page                        |
| `npm run scrape:images`    | Finds all images on a Wikipedia page              |
| `npm run scrape:screenshot`| Takes a screenshot of a webpage and saves it      |

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

## Learn More

- [Playwright Docs](https://playwright.dev/docs/intro) — The official documentation
- [Quotes to Scrape](https://quotes.toscrape.com) — A practice website made for learning scraping
- [Books to Scrape](https://books.toscrape.com) — Another practice site with fake book listings
- [CSS Selectors Guide](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_selectors) — How selectors work

Happy scraping! 🕷️
