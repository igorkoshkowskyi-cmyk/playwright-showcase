import { expect, Locator, Page } from '@playwright/test';

export type SortOption = 'az' | 'za' | 'lohi' | 'hilo';

export class InventoryPage {
    readonly page: Page;

    //private locators
    private readonly sortDropdown: Locator;
    private readonly addToCartButton: Locator;

    //public locators
    readonly cartBadge: Locator;
    readonly pageHeader: Locator;

    constructor(page:Page) {
        this.page = page;
        this.pageHeader = page.getByText('Products', { exact: true });
        this.cartBadge = page.locator('.shopping_cart_badge');
        this.sortDropdown = page.locator('select');
        this.addToCartButton = page.getByRole('button', {name: 'Add to cart'});
    }

    //Check that page loaded
    async expectLoaded() {
        await expect(this.page).toHaveURL(/\/inventory\.html$/);
        await expect(this.pageHeader).toBeVisible();
    };

    // add product by name
    async addProductByName(productName: string) {
        const product = this.page.locator('.inventory_item').filter({ hasText: productName });

        await product.getByRole('button', { name: 'Add to cart' }).click();
    };

    // add product by index
    async addProductByIndex(index: number) {
        await this.addToCartButton.nth(index).click();
    };

    // sort by price low-to-high shows cheapest first
    async sortBy(option: SortOption) {
        await this.sortDropdown.selectOption({ value: option });
    };

    async getProductPrices(): Promise<number[]> {
        const pricesText = await this.page.locator('.inventory_item_price').allTextContents();
        const prices = pricesText.map(price => Number(price.replace('$', '')));
        return prices;
    };
}