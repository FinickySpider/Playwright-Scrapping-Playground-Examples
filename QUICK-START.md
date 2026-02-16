# 🚀 Quick Start Guide

**Welcome!** This guide will get you scraping in 5 minutes.

## Step 1: Setup (First Time Only)

**Windows:** Double-click `setup.bat`

**Mac/Linux:** Open terminal and run:
```bash
npm install
npx playwright install chromium
```

Wait for it to finish (takes 2-3 minutes).

---

## Step 2: Run Your First Scraper

Open a terminal in this folder and run:

```bash
npm run beginner
```

A browser will open, visit a website, grab some text, and print it! 🎉

---

## Step 3: Try More Examples

```bash
npm run scrape              # Scrape quotes
npm run scrape:headlines    # Scrape news
npm run config-scrape       # Use the config file (no coding!)
```

---

## Step 4: Learn More

**Want the full interactive guide?**

Double-click `START-HERE.bat` (Windows) or run `npm run guide`

**Want to customize?**

- Edit `config.json` to scrape without coding
- Open any `.js` file and change the URL or selectors
- Check the README for detailed explanations

---

## Need Help?

### "node is not recognized"
→ Install Node.js from https://nodejs.org

### "Cannot find module"
→ Run `npm install`

### "Browser not found"
→ Run `npx playwright install chromium`

### Scraper returns empty results
→ Wrong selector! Right-click the element on the page and choose "Inspect" to find the correct one

---

## 🎯 What to Try Next

1. ✅ Run `npm run beginner`
2. ✅ Run `npm run scrape`
3. ✅ Edit `config.json` and run `npm run config-scrape`
4. ✅ Open `scrape.js`, change the URL, and run it again
5. ✅ Open the interactive guide: `START-HERE.bat`

Happy scraping! 🕷️
