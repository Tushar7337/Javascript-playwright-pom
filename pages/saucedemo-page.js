import { BasePage, expect } from "./base-page";

export class SauceDemo extends BasePage{
    // Login Screen Locator
    userNameId = this.page.locator("//input[@id='user-name']");
    passwordId = this.page.locator("//input[@id='password']");
    loginSubmitButtonId = this.page.locator("//input[@id='login-button']");

    // Dashboard Locator
    dashboardProduct = this.page.locator("[data-test='title']");

    // Add To Cart Scenario Locator
    sauceLabOnsieProduct = this.page.locator('[data-test="add-to-cart-sauce-labs-onesie"]');
    shoppingCartIcon = this.page.locator('[data-test="shopping-cart-link"]')
    verifyProductFromCart = this.page.locator('[data-test="item-2-title-link"]')

    // Navigating to SauceDemo Website
    async gotoSaucedemoLoginPage(){
        await this.page.goto("https://www.saucedemo.com/");
        await this.page.waitForLoadState('networkidle');
    }

    // Login with valid creds
    async loginSauceDemoAppwithValidCreds(userName,password){
        await this.userNameId.fill(userName);
        await this.passwordId.fill(password)
        await this.loginSubmitButtonId.click();
        await this.page.waitForLoadState('networkidle');
        await expect(this.dashboardProduct).toBeVisible()
    }

    // Add Product in Cart
    async validateProductsFromHomeScreen(){
        const products = this.page.locator("//div[@class='inventory_item_name ']");
        await expect(products).toHaveCount(6);
    }

    // Validate Product Added in Cart
    async addProductToCart(){
        await this.sauceLabOnsieProduct.click();
        await this.shoppingCartIcon.click();
        await expect(this.verifyProductFromCart).toBeVisible();
    }

}
