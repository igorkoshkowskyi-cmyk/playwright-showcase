import { expect, test } from "@playwright/test";

const BASE_URL = 'https://www.saucedemo.com';
const PASS = 'secret_sauce';
const LOGIN = 'standard_user';

test.describe('Saucedemo - Login', () => {
    test('successfull login redirect to inventory', async ({ page}) => {
        await page.goto(BASE_URL);
        //
        await page.getByPlaceholder('Username').fill(LOGIN);
        //
        await page.getByPlaceholder('Password').fill(PASS);
        //
        await page.getByRole('button', { name: 'Login' }).click();
        //
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
        //
        await page.getByTitle('Products')
    });
    
    test('failed login show error', async ({ page}) => {

    });
})