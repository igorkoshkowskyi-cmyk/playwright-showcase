import { test as base, Page } from '@playwright/test';
import { InventoryPage } from '../pages/InventoryPage';

type MyFixtures = {
    authenticatedPage: Page;
    inventoryPage: InventoryPage;
};

export const test = base.extend<MyFixtures>({
    authenticatedPage: async ({ page }, use) => {
        // Page is pre-authenticated via storageState (see playwright.config.ts).
        // We just navigate to inventory page.
        const inventoryPage = new InventoryPage(page);
        await inventoryPage.goto();
        await use(page);
        
        // TEARDOWN: ничего не нужно — Playwright сам закроет page
    },

    inventoryPage: async ({authenticatedPage},use) => {
        const inventoryPage = new InventoryPage(authenticatedPage);
        await inventoryPage.expectLoaded();
        await use(inventoryPage);
    }
});

export { expect } from '@playwright/test';