import { Page } from '@playwright/test';
import { OrangeHrm } from './orange-hrm-page';
import { SauceDemo } from './saucedemo-page';


export const Pages = (page) => {
    return {
        orangehrm: new OrangeHrm(page),
        saucedemo: new SauceDemo(page)

    };
};
