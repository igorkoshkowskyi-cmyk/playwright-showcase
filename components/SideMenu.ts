import {Page, Locator} from '@playwright/test';

export class SideMenu {
    readonly page: Page;

    private readonly openMenuBtn: Locator;
    private readonly logoutBtn: Locator;

    constructor (page:Page) {
        this.page = page;

        this.openMenuBtn = page.getByRole('button', {name: 'Open Menu'});
        this.logoutBtn = page.getByRole('link', {name: 'Logout'});
    }

    // open menu action
    async openMenu() {
        await this.openMenuBtn.click();
    };

    // logout action
    async logoutAction() {
        await this.logoutBtn.click();
    };
};