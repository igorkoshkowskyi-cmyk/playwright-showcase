import { SideMenu } from "../components/SideMenu";
import { expect, test } from "../fixtures";
import { InventoryPage } from "../pages/InventoryPage";
import { LoginPage } from "../pages/LoginPage";

const PASS = 'secret_sauce';
const LOGIN = 'standard_user';

test.describe('Saucedemo - Login', () => {
    test('successful login redirect to inventory', async ({ page}) => {
        
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.login(LOGIN, PASS);

        const inventoryPage = new InventoryPage(page);
        
        await inventoryPage.expectLoaded();
    });
    
    test('failed login show error', async ({ page}) => {
        
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        
        //login without pass
        await loginPage.login(LOGIN, '');

        // check that error box appeared with correct error
        await expect(loginPage.errorMessage).toHaveText('Epic sadface: Password is required');
    });
})

test.describe('Saucedemo - Inventory & Cart', () => {
    test('add product to cart updates cart counter', async ({ inventoryPage}) => {
        await inventoryPage.addProductByIndex(1);
        await expect (inventoryPage.cartBadge).toHaveText('1');

        await inventoryPage.addProductByIndex(3);
        await expect (inventoryPage.cartBadge).toHaveText('2');
    });

    test('sort by price low-to-high shows cheapest first', async ({inventoryPage})=> {
        await inventoryPage.sortBy('lohi');
        const prices = await inventoryPage.getProductPrices();
        const sortedPrices= [...prices].sort((a,b) => a - b);

        //check that prices sorted
        expect(prices).toEqual(sortedPrices);

    });

    test('logout returns user to login page', async ({authenticatedPage})=> {
        const sideMenu = new SideMenu(authenticatedPage);

        await sideMenu.openMenu();
        await sideMenu.logoutAction();

        //check that login page opened
        const loginPage = new LoginPage(authenticatedPage);
        await loginPage.expectLoaded();
    });
})