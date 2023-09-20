import { test } from '@playwright/test'
import { SchedulePage } from "../../models/schedule-page"
import { LoginPage } from '../../models/login-page'

test.describe("Schedule", () => {
    test.setTimeout(600 * 1000) //1min

    test.beforeEach(async ({ page }) => {
        await page.goto('http://qa-challenge-c.planday.com', { waitUntil: 'networkidle' })
    })

    test("shift for today", async ({ page }) => {
        const loginPage = new LoginPage(page)
        await loginPage._login()
        /*
        const schedulePage = new SchedulePage(page, 'Today')
        await schedulePage.scheduleShiftForToday()
        */
        await page.close()
    })
});