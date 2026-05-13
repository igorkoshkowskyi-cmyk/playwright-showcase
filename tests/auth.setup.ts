import {test as setup} from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';

const authFile = 'playwright/.auth/user.json';

const PASS = 'secret_sauce';
const LOGIN = 'standard_user';

setup('authenticate', async ({page}) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(LOGIN, PASS);

    const inventoryPage = new InventoryPage(page);
    await inventoryPage.expectLoaded();

    await page.context().storageState({path: authFile});
});