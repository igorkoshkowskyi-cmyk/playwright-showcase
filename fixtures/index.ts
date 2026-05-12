import { test as base, Page } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';

const PASS = 'secret_sauce';
const LOGIN = 'standard_user';

type MyFixtures = {
    authenticatedPage: Page;
    inventoryPage: InventoryPage;
};

export const test = base.extend<MyFixtures>({
    authenticatedPage: async ({ page }, use) => {
        // SETUP: логин через UI
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.login(LOGIN, PASS);
        
        // Передаём залогиненную page в тест
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