const { test, expect } = require('@playwright/test');

test('DuckDuckGo logo is visible', async ({ page }) => {
    await page.goto('https://duckduckgo.com/');
    const isLogoVisible = await page.isVisible('#logo_homepage_link');
    await expect(isLogoVisible).toBe(true);
});
