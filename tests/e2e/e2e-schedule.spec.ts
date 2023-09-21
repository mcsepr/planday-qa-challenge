import { test } from '@playwright/test'
import { SchedulePage } from "../../models/schedule-page"
import { LoginPage } from '../../models/login-page'
import { HomePage } from '../../models/home-page';

test.describe("Schedule", () => {
    test.setTimeout(600 * 1000) //1min

    test.beforeEach(async ({ page }) => {
        await page.goto('http://qa-challenge-c.planday.com', { waitUntil: 'networkidle' })
    })

    const dates = ['today'/*, 'yesterday', 'tomorrow'*/]
    for (const date in dates){
        test(`shift for ${dates[date]}`, async ({ page }) => {
            const loginPage = new LoginPage(page)
            await loginPage.verify()
            await loginPage.login()
            
            const homePage = new HomePage(page)
            await homePage.verify()
            await homePage.selectMenuOption('/schedule')

            const schedulePage = new SchedulePage(page)
            await schedulePage.verify()
            await schedulePage.scheduleShiftForDate(dates[date])
            
            await page.close()
        })
    }
});