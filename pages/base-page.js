import { Page } from '@playwright/test';

export class BasePage {
    constructor(page) {
        this.page = page;
    }
}

export { expect, Page } from '@playwright/test';
