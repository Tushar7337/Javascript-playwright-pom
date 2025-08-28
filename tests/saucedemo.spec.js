import { test, expect } from '@playwright/test';
import { Pages } from '../pages/pages';
import { time } from 'console';
import * as data from "../tests/data/this.json";
import { after, afterEach } from 'node:test';

test.describe('SauceDemo Application', () => {


    test('Validate displaying 6 products on home screen', async ({page}) =>{

    const pages = Pages(page);
    await pages.saucedemo.gotoSaucedemoLoginPage();
    await pages.saucedemo.loginSauceDemoAppwithValidCreds(data.saucedemo.user, data.saucedemo.pass);
    await pages.saucedemo.validateProductsFromHomeScreen();
  
    });

    test('Verify Product is added in the cart', async({page}) =>{
    const pages = Pages(page);
    await pages.saucedemo.gotoSaucedemoLoginPage();
    await pages.saucedemo.loginSauceDemoAppwithValidCreds(data.saucedemo.user, data.saucedemo.pass);
    await pages.saucedemo.addProductToCart()
    });
    
});

afterEach("Close Browser", async ({page}) => {
    await page.close()
})
