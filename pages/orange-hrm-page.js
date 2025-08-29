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
    disabledDeleteButton = this.page.locator("//i[@class='oxd-icon bi-trash']")
    
    // Add Admin first
    addAdminButton = this.page.locator("//button[text()=' Add ']")
    clickAdminUserRoleDropDown = this.page.locator("(//div[@class='oxd-select-text-input'])[1]")
    addAdminRoleOption = this.page.locator('option', {name:'Admin'})
    employeeNameTextbox = this.page.locator("//input[@placeholder='Type for hints...']")
    clickAdminStatusDropDown = this.page.locator("(//div[@class='oxd-select-text-input'])[2]")
    adminStatusOption = this.page.locator('option', {name:'Disabled'})
    usernameTextbox = this.page.locator("(//input[@class='oxd-input oxd-input--active'])[2]")
    addAdminpassword = this.page.locator("(//input[@type='password'])[1]")
    addAdminConfPassword = this.page.locator("(//input[@type='password'])[2]")
    saveNewAdminButton = this.page.locator("//button[text()=' Save ']")
    disabledDeleteButtons = this.page.locator("text=Disabled").nth(1); // ('button', { name: 'Search' })

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

    async verifyDesabledUserListDisplayed(){
        await this.page.waitForLoadState('networkidle')
        //console.log(this.disabledDeleteButton.length)

        // Assert that at disabled admin user is present
        await expect(this.disabledDeleteButtons).toBeVisible();
    }

    async verifyUserStatusAfterFilter(expectdMessage){
        await this.page.waitForLoadState('networkidle')
        await expect(this.noDataFound).toContainText(expectdMessage)

    }

    async addNewAdmin(unqName, pass){
        await this.adminMenuOption.click();
        await this.page.waitForTimeout(3000);
        const name = await this.page.textContent("//p[@class='oxd-userdropdown-name']")
        console.log(name) 
        await this.addAdminButton.click();
        await this.clickAdminUserRoleDropDown.click();
        await this.clickAdminUserRoleDropDown.press('ArrowDown');
        await this.clickAdminUserRoleDropDown.press('Enter')

        //await this.addAdminRoleOption.click()
        await this.employeeNameTextbox.fill(name)
        await this.page.waitForTimeout(3000);
        await this.employeeNameTextbox.press('ArrowDown')
        await this.employeeNameTextbox.press('Enter')
        await this.clickAdminStatusDropDown.click();
        await this.clickAdminStatusDropDown.press('ArrowDown');
        await this.clickAdminStatusDropDown.press('ArrowDown');
        await this.clickAdminStatusDropDown.press('Enter')
        //await this.adminStatusOption.click();
        await this.usernameTextbox.fill(unqName);
        await this.addAdminpassword.fill(pass);
        await this.addAdminConfPassword.fill(pass);
        await this.saveNewAdminButton.click();
        await this.page.waitForTimeout(3000);

    }
}
