import { test } from "@playwright/test";


const PASS = 'secret_sauce';
const LOGIN = 'standard_user';
test.describe('Strict mode exploration', () => {

    test.beforeEach(async({page}) => {
        await page.goto('https://www.saucedemo.com');
        await page.getByPlaceholder('Username').fill(LOGIN);
        await page.getByPlaceholder('Password').fill(PASS);
        await page.getByRole('button', { name: 'Login' }).click();  
    });

    test.fail('strict mode violation - intentional', async ({page}) => {
        //not unique by default
        const addCartButton = page.getByRole('button', {name: 'Add to cart'});
        await addCartButton.click();
    });

    test('solution fix via .first()', async ({page}) =>{
        const addCartButton = page.getByRole('button', {name: 'Add to cart'}).first();
        await addCartButton.click();
    });
        
    test('solution fix via .nth(2)', async ({page}) =>{
        const addCartButton = page.getByRole('button', {name: 'Add to cart'}).nth(2);
        await addCartButton.click();
    });
        
    test('solution fix via .filter() with sibling text', async ({page}) =>{
        const addCartButton = page.locator('.inventory_item').filter({hasText:'Sauce Labs Backpack'}).getByRole('button', {name: 'Add to cart'});
        await addCartButton.click();
    });
})