import { Page } from '@playwright/test'
import Expect from '../utility/expect'
import dotenv from 'dotenv';

dotenv.config({ override: true });

export class LoginPage {
    readonly _page: Page
    readonly _expect: Expect

    constructor(page: Page) {
        this._page = page
        this._expect = new Expect(this._page)
    }

    public async _login(){
        await this._expect.elementToBeVisible('#cookie-banner')
        await this._page.locator('#cookie-consent-button').click()
        await this._expect.elementToBeHidden('#cookie-banner')

        await this._expect.elementToBeVisible('body > div.site-wrapper.new-sso > div > div > div > div > div > svg')
        await this._expect.textToBeVerifiedByText('QA Challenge')
        await this._expect.textToBeVerified('#login > div:nth-child(2) > label', 'Username (your email)')
        await this._expect.textToBeVerified('#login > div:nth-child(4) > label', 'Password')
        await this._expect.textToBeVerified('#MainLoginButton', 'Log in')
        await this._expect.textToBeVerified('#login-form__password-forgotten-button', 'Forgot password?')
        await this._expect.textToBeVerified('#login > p', 'Contact your manager if you can\'t log in')
        await this._expect.elementToBeVisible('#toggle-icons-container')
        await this._expect.textToBeVerified('body > div.footer-links > div > div:nth-child(1) > a', 'Need help?')
        await this._expect.textToBeVerified('body > div.footer-links > div > div:nth-child(2) > a', 'Legal')

        await this._page.locator('#Username').fill(String(process.env.USERNAME))
        await this._page.locator('#Password').fill(String(process.env.PASSWORD))

        await this._page.locator('#MainLoginButton').click()
    }
}