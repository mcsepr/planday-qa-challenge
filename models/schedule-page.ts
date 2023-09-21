import { Page } from '@playwright/test'
import Expect from '../utility/expect'

export class SchedulePage {
    readonly _page: Page
    readonly _expect: Expect
    readonly _date: string

    constructor(page: Page) {
        this._page = page
        this._expect = new Expect(this._page)
    }

    //TO-DO: Add verification of main elements
    public async verify(){
        await this._expect.pageToHaveURL('/schedule');
    }

    public async scheduleShiftForDate(date: string){
        await this._deleteExistingShifts()
        await this._pickDate(date)
        await this._verifyShiftModal()
        await this._createShift()
        await this._approveAllShifts()
    }

    private async _deleteExistingShifts(){
        await this._page.locator('text=Today').first().click() //Click 'Today' to center the calendar
        let numberOfExistingShifts = await this._page.locator('.shift-tile__inner').count()
        if (numberOfExistingShifts > 0) {
            for (let i = 0; i < numberOfExistingShifts; i++) {
                const box = await this._page.locator('.shift-tile__inner').locator(`nth=${i}`).boundingBox()
                if ( box != null ) {
                    await this._page.mouse.click(box.x + box.width / 2, box.y + 1)
                    await this._expect.elementToBeVisible('.edit-shift-modal')
                    await this._page.getByText('Delete', { exact: true }).click()
                    await this._expect.elementByTextToBeVisible('Delete shift')
                    await this._expect.elementByTextToBeVisible('Are you sure?')
                    await this._expect.elementByTextToBeVisible('Cancel')
                    await this._expect.elementByTextToBeVisible('Delete shift')
                    await this._expect.elementByTextToBeVisible('Are you sure?')
                    await this._page.getByText('Delete', { exact: true }).click()
                    await this._expect.elementToBeHidden('.edit-shift-modal')
                }
            }
        }
    }

    private async _pickDate(date: string){
        let columnNumber: number
        switch(date){
            case 'yesterday':
                columnNumber = 4
                break
            case 'today':
                columnNumber = 5
                break
            case 'tomorrow':
                columnNumber = 6
                break
            default:
                columnNumber = -1
                console.log('invalid date')
                break
        }
        await this._page.getByText('Today', { exact: true }).first().click() //Click 'Today' to center the calendar
        const gridToClick = `div.virtualized-board__row.virtualized-board__row--last > div:nth-child(${columnNumber})`
        await this._page.locator(gridToClick).hover() //Hover to verify that the blue icon appears
        await this._expect.elementToBeVisible(`${gridToClick} > div > div > div > svg > use`)
        await this._page.locator(gridToClick).click() //Click the icon
    }

    private async _verifyShiftModal(){
        await this._expect.elementToBeVisible('.edit-shift-modal')
        await this._expect.elementToContainText('.edit-shift-header__manchet', 'CREATE SHIFT FOR ')
        await this._expect.elementToBeVisible('.edit-shift-header__title')
        await this._expect.elementToContainText('#shiftType > div', 'Normal')
        await this._expect.elementToBeVisible('#employee_id-label')
        await this._expect.elementToBeVisible('#employee_id')
        await this._expect.elementToBeVisible('#positionOrGroup-label')
        await this._expect.elementToBeVisible('#positionOrGroup')
        await this._expect.elementToContainText('div.aside-section.shift-form__breaks-aside > span', '0m') //automatically becomes 30m when shift time is set
        await this._expect.elementToContainText('div.action-row > div > span', 'Approve')
        await this._expect.elementToBeVisible('.switch__knob')
        await this._expect.elementToBeVisible('.shift-form > div:nth-child(2) > ul')
        await this._expect.elementToContainText('.shift-form > div:nth-child(2) > ul > li:nth-child(1)', 'Comment')
        await this._expect.elementToContainText('.shift-form > div:nth-child(2) > ul > li:nth-child(2)', 'Wage')
        await this._expect.elementToContainText('.shift-form > div:nth-child(2) > ul > li:nth-child(3)', 'Copy shift')
        await this._expect.elementToContainText('.shift-form > div:nth-child(2) > ul > li:nth-child(4)', 'Supplement')
        await this._expect.elementToBeVisible('#description')
        await this._expect.elementToContainText('.notify-options__header', 'Notify Employee')
        await this._expect.elementToBeVisible('.notify-options__body')
        await this._expect.elementToContainText('.edit-shift-modal__footer-buttons-wrapper > li:nth-child(1) > button', 'Cancel')
        await this._expect.elementToContainText('.edit-shift-modal__footer-buttons-wrapper > li:nth-child(2) > button', 'Create')
    }

    private async _createShift(){
        await this._page.locator('#shiftStartEnd_start').fill('9 am') //Set start time
        await this._page.locator('#shiftStartEnd_end').fill('5 pm') //Set end time
        //await this._page.locator('.switch__knob').click() //Could approve shift here
        await this._page.locator('.edit-shift-modal__footer-buttons-wrapper > li:nth-child(2) > button').click() //Create shift
    }

    private async _approveAllShifts(){
        await this._page.locator('text=Today').first().click() //Click 'Today' to center the calendar
        let numberOfExistingShifts = await this._page.locator('.shift-tile__inner').count()
        if (numberOfExistingShifts > 0) {
            for (let i = 0; i < numberOfExistingShifts; i++) {
                const box = await this._page.locator('.shift-tile__inner').locator(`nth=${i}`).boundingBox()
                if ( box != null ) {
                    await this._page.mouse.click(box.x + box.width / 2, box.y + 1)
                    await this._page.locator('.switch__knob').click()
                }
            }
        }
    }
}