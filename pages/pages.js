import { Page } from '@playwright/test';
import { OrangeHrm } from './orange-hrm-page';


export const Pages = (page) => {
    return {
        orangehrm: new OrangeHrm(page),

    };
};
