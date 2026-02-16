# 📝 Playwright Cheat Sheet

## Basic Template

```javascript
import { chromium } from "playwright";

async function scrape() {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  
  await page.goto("YOUR-URL-HERE");
  
  // Your scraping code here
  
  await browser.close();
}

scrape();
```

---

## Navigation

```javascript
// Go to a page
await page.goto("https://example.com");

// Click something
await page.click("button.submit");

// Fill in a form
await page.fill("input#email", "test@example.com");

// Press a key
await page.press("input", "Enter");

// Go back/forward
await page.goBack();
await page.goForward();
```

---

## Finding Elements (Selectors)

| What you want | Selector | Example HTML |
|---------------|----------|--------------|
| By class | `.classname` | `<div class="classname">` |
| By ID | `#idname` | `<div id="idname">` |
| By tag | `tagname` | `<h1>`, `<p>`, `<a>` |
| Multiple classes | `.class1.class2` | `<div class="class1 class2">` |
| Child element | `.parent .child` | `<div class="parent"><span class="child">` |
| Direct child | `.parent > .child` | Direct descendant only |
| By attribute | `[href]` | `<a href="...">` |
| Specific attribute | `[href="/about"]` | Exact match |

---

## Getting Data

```javascript
// Get text from ONE element
const text = await page.textContent("h1");

// Get text from MANY elements
const items = await page.$$eval("li", els => 
  els.map(el => el.textContent)
);

// Get an attribute (like href, src, class, etc.)
const url = await page.getAttribute("a", "href");

// Get multiple pieces of data
const data = await page.$$eval(".product", products => {
  return products.map(p => ({
    name: p.querySelector(".name")?.textContent,
    price: p.querySelector(".price")?.textContent,
  }));
});

// Check if element exists
const exists = await page.locator(".element").count() > 0;
```

---

## Waiting for Things

```javascript
// Wait for an element to appear
await page.waitForSelector(".results");

// Wait for page to load
await page.waitForLoadState("domcontentloaded");
await page.waitForLoadState("networkidle"); // wait for all network requests

// Wait a specific time (milliseconds)
await page.waitForTimeout(3000); // 3 seconds

// Wait for navigation
await page.waitForNavigation();
```

---

## Screenshots & PDFs

```javascript
// Take a screenshot
await page.screenshot({ path: "screenshot.png" });

// Full page screenshot
await page.screenshot({ 
  path: "full.png", 
  fullPage: true 
});

// Screenshot of specific element
await page.locator(".element").screenshot({ path: "element.png" });

// Save as PDF
await page.pdf({ path: "page.pdf" });
```

---

## Browser Options

```javascript
// Visible browser (good for learning)
const browser = await chromium.launch({ 
  headless: false 
});

// Invisible browser (faster)
const browser = await chromium.launch({ 
  headless: true 
});

// Slow down actions (easier to watch)
const browser = await chromium.launch({ 
  headless: false,
  slowMo: 1000 // 1 second delay between actions
});

// Custom window size
const page = await browser.newPage();
await page.setViewportSize({ width: 1920, height: 1080 });
```

---

## Common Patterns

### Pattern 1: Get All Links
```javascript
const links = await page.$$eval("a", anchors => 
  anchors.map(a => ({
    text: a.textContent,
    url: a.href
  }))
);
```

### Pattern 2: Get All Images
```javascript
const images = await page.$$eval("img", imgs => 
  imgs.map(img => ({
    src: img.src,
    alt: img.alt
  }))
);
```

### Pattern 3: Login to a Site
```javascript
await page.goto("https://example.com/login");
await page.fill("#username", "myusername");
await page.fill("#password", "mypassword");
await page.click("button[type='submit']");
await page.waitForNavigation();
```

### Pattern 4: Scroll to Load More
```javascript
// Scroll to bottom
await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

// Wait for new content
await page.waitForTimeout(2000);
```

### Pattern 5: Handle Popups
```javascript
// Click something that opens a new tab
const [newPage] = await Promise.all([
  page.waitForEvent('popup'),
  page.click('a[target="_blank"]')
]);

// Work with the new page
await newPage.waitForLoadState();
const text = await newPage.textContent('h1');
```

---

## Error Handling

```javascript
try {
  await page.goto("https://example.com");
  const data = await page.textContent(".selector");
  console.log(data);
} catch (error) {
  console.error("Something went wrong:", error.message);
  
  if (error.message.includes("timeout")) {
    console.log("Page took too long to load");
  } else if (error.message.includes("Target closed")) {
    console.log("Browser was closed");
  }
} finally {
  await browser.close();
}
```

---

## Tips & Best Practices

✅ **DO:**
- Use `headless: false` while learning
- Add waits for dynamic content
- Check if elements exist before accessing them
- Use try/catch for error handling
- Be respectful - add delays between requests

❌ **DON'T:**
- Scrape too fast (can get you blocked)
- Ignore robots.txt
- Hardcode credentials in your scripts
- Forget to close the browser
- Assume elements will always be there

---

## Debugging Tips

```javascript
// See what Playwright sees - pause execution
await page.pause();

// Print current URL
console.log(await page.url());

// Print page title
console.log(await page.title());

// Get the full HTML
const html = await page.content();
console.log(html);

// Screenshot when something goes wrong
try {
  // ... your code
} catch (error) {
  await page.screenshot({ path: "error.png" });
  throw error;
}
```

---

## Need More Help?

- 📘 [Playwright Docs](https://playwright.dev/docs/intro)
- 🎯 Run examples in this project
- 🌐 Practice on test sites like quotes.toscrape.com
- 🔍 Use browser DevTools (F12) to inspect elements
