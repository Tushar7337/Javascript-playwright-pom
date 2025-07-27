import { test, expect } from '@playwright/test';
import { Pages } from '../pages/pages';
import * as data from "../tests/data/this.json"
import { after, afterEach } from 'node:test';


test.describe('Orange HRM', () => {
    test('verify the search result and make sure only disabled users are getting listed', async ({ page }) => {
        const pages = Pages(page);
        await pages.orangehrm.goToLoginPage();
        await pages.orangehrm.loginWithValidCredential(data.validData.userName, data.validData.password);
        await pages.orangehrm.filterWithAdminUser();
        await pages.orangehrm.verifyUserStatusAfterFilter(data.errorMessage)

    });
});

afterEach("Close Browser", async ({page}) => {
    await page.close()
})
