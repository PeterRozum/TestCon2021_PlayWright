const { test, expect } = require('@playwright/test');

test('DuckDuckGo logo is visible', async ({ page }) => {
    await page.goto('https://duckduckgo.com/');
    const isLogoVisible = await page.isVisible('#logo_homepage_link');
    expect(isLogoVisible).toBe(true);
});

test('DuckDuckGo search results contains expected text', async ({ page }) => {
    await page.goto('https://duckduckgo.com/');
    await page.fill('#search_form_input_homepage', 'Test');
    await page.click('#search_button_homepage');
    const firstResultTest = await page.textContent("#r1-0");
    
    expect(firstResultTest).toContain("Test");
});

test('DuckDuckGo search for "Microsoft word cheat sheet"', async ({ page }) => {
    await page.goto('https://duckduckgo.com/');
    await page.fill('#search_form_input_homepage', 'Microsoft word cheat sheet');
    await page.click('#search_button_homepage');
    await page.waitForNavigation();

    await page.click("span.chomp--link__mr");
    expect(await page.isVisible('h6.cheatsheet__title:has-text("Formatting")')).toBe(true);
});

test('DuckDuckGo url shortening works', async ({ page }) => {
    await page.goto('https://duckduckgo.com/');
    await page.fill('#search_form_input_homepage', 'shorten www.wikipedia.com');
    await page.click('#search_button_homepage');
    await page.waitForNavigation();
    const shortenedUrl = await page.getAttribute("#shorten-url", 'value');
    await page.goto(shortenedUrl);
    const newPageUrl = page.url();
    
    expect(newPageUrl).toBe("https://www.wikipedia.org/");
});

