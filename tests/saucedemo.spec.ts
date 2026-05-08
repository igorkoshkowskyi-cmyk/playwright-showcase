import { expect, test } from "@playwright/test";

const BASE_URL = 'https://www.saucedemo.com';
const PASS = 'secret_sauce';
const LOGIN = 'standard_user';

test.describe('Saucedemo - Login', () => {
    test('successfull login redirect to inventory', async ({ page}) => {
        await page.goto(BASE_URL);
        
        // Username/Password inputs doesn't have associated <label>, placeholder — stable visible identifier
        await page.getByPlaceholder('Username').fill(LOGIN);
        
        await page.getByPlaceholder('Password').fill(PASS);
        
        // searching for role = button and text is more stable to DOM changes
        await page.getByRole('button', { name: 'Login' }).click();
        
        // check URL as we expect
        await expect(page).toHaveURL(/\/inventory\.html$/);
        
        // check page loaded
        await expect(page.getByText('Products', { exact: true })).toBeVisible();
    });
    
    test('failed login show error', async ({ page}) => {
        await page.goto(BASE_URL);
        
        await page.getByPlaceholder('Username').fill(LOGIN);
        
        await page.getByPlaceholder('Password').fill('');

        await page.getByRole('button', { name: 'Login' }).click();

        // check that error box appeared with correct error
        await expect(page.getByText('Epic sadface: Password is required')).toBeVisible();
    });
})

test.describe('Saucedemo - Inventory & Cart', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(BASE_URL);
        await page.getByPlaceholder('Username').fill(LOGIN);
        await page.getByPlaceholder('Password').fill(PASS);
        await page.getByRole('button', { name: 'Login' }).click();
        await expect(page).toHaveURL(/\/inventory\.html$/);
        await expect(page.getByText('Products', { exact: true })).toBeVisible();
    });

    test('add product to cart updates cart counter', async ({ page}) => {

        //click on any first add to cart product
        await page.getByRole('button', {name: 'Add to cart'}).nth(0).click();
        // check that counter exist and equal 1. Used CSS because no other option avilable
        await expect (page.locator('.shopping_cart_badge')).toHaveText('1');

        await page.getByRole('button', {name: 'Add to cart'}).nth(1).click();
        //check that counter increased
        await expect (page.locator('.shopping_cart_badge')).toHaveText('2');
    });

    test('sort by price low-to-high shows cheapest first', async ({page})=> {
        // select option lo-hi, on this page only one visible select
        await page.locator('select').selectOption({ value: 'lohi' });
        
        //collecting prices
        const pricesText = await page.locator('.inventory_item_price').allTextContents();
        const prices = pricesText.map(price => Number(price.replace('$', '')));
        const sortedPrices = [...prices].sort((a, b) => a - b);
        
        // check that prices sorted correctly
        expect(prices).toEqual(sortedPrices);

    });

    test('logout returns user to login page', async ({page})=> {

        //find hamb menu by role button with specific name
        await page.getByRole('button', {name: 'Open Menu'}).click();

        //find logout by role button with specific name
        await page.getByRole('link', {name: 'Logout'}).click();

        //check that login page opened
        await expect(page.getByPlaceholder('Username')).toBeVisible();
        await expect(page.getByPlaceholder('Password')).toBeVisible();
    });
})