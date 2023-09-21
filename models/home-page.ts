import { Page } from '@playwright/test'
import Expect from '../utility/expect'

export class HomePage {
    readonly _page: Page
    readonly _expect: Expect

    constructor(page: Page) {
        this._page = page
        this._expect = new Expect(this._page)
    }
    
    public async verify(){
        await this._expect.pageToHaveURL('/home');
        await this._expect.elementToBeVisible('#root > div > header')
        await this._expect.elementToBeVisible('#container-dashboard > div > div > div > h1')
        await this._expect.elementToContainText('#container-dashboard > div > div > div > h1', 'Hi')
        await this._expect.elementByTextToBeVisible('QA Challenge')
        await this._expect.elementByTextToBeVisible('Edit dashboard')
        await this._expect.elementByTextToBeVisible('Get started')
        await this._expect.elementToBeVisible('body > div.intercom-lightweight-app > div')
    }

    public async selectMenuOption(menuOption: string){
        //await this._expect.elementByTextToBeVisible(menuOption)
        await this._page.locator(`[href*="${menuOption}"]`).first().click()
    }
}