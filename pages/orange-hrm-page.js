import { BasePage } from "./base-page";
const {expect} = require('@playwright/test')

export class OrangeHrm extends BasePage{
    usenameInput = this.page.locator("//input[@name='username']");
    passwordInput = this.page.locator("//input[@name='password']");
    loginButton = this.page.locator("//button[text()=' Login ']");
    adminMenuOption = this.page.locator("//span[text()='Admin']")
    userRoleDrpDown = this.page.locator("(//div[@class='oxd-select-text-input'])[1]");
    adminOption = this.page.getByRole('option', {name:'Admin'})
    statusDropDown = this.page.locator("(//div[@class='oxd-select-text-input'])[2]");
    disabledUserOption = this.page.getByRole('option', {name:'Disabled'});
    searchButton = this.page.locator("//button[text()=' Search ']")
    noDataFound = this.page.locator("//span[text()='No Records Found']")

    async goToLoginPage(){
        await this.page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
        await this.page.waitForLoadState('networkidle');
    }

    async loginWithValidCredential(username, password){
        await this.usenameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    async filterWithAdminUser(){
        await this.adminMenuOption.click();
        await this.page.waitForLoadState('networkidle');
        await this.userRoleDrpDown.click();
        await this.adminOption.click();
        await this.statusDropDown.click();
        await this.disabledUserOption.click();
        await this.searchButton.click();        
    }

    async verifyUserStatusAfterFilter(expectdMessage){
        await this.page.waitForLoadState('networkidle')
        await expect(this.noDataFound).toContainText(expectdMessage)

    }
}
