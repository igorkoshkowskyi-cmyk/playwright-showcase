import {expect, Page, Locator} from '@playwright/test';

export class LoginPage {
    readonly page: Page;

    // private for actions
    private readonly usernameInput: Locator;
    private readonly passwordInput: Locator;
    private readonly loginButton: Locator;

    // public for assert
    readonly errorMessage: Locator; 

    constructor(page:Page) {
        this.page = page;
        this.usernameInput = page.getByPlaceholder('Username');
        this.passwordInput = page.getByPlaceholder('Password');
        this.loginButton = page.getByRole('button', { name: 'Login' })
        this.errorMessage = page.getByText(/^Epic sadface:/)
    }

    // open base page
    async goto() {
        await this.page.goto('/');
    }

    //Check that page loaded
    async expectLoaded() {
        await expect(this.page).toHaveURL('/');
        await expect(this.passwordInput).toBeVisible();
        await expect(this.usernameInput).toBeVisible();
    };

    // login action with @username @password 
    async login (username: string, password: string) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }
}