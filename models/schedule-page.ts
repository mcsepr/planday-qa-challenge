import { Page } from '@playwright/test'
import Expect from '../utility/expect'

export class SchedulePage {
    readonly _page: Page
    readonly _expect: Expect
    readonly _date: string

    constructor(page: Page, date: string) {
        this._page = page
        this._expect = new Expect(this._page)
        this._date = date
    }

    public async scheduleShiftForToday(){
        await this._selectMenuOption()
        await this._verifySchedulePage()
        await this._createShift()
        await this._approveShift()
    }

    private async _selectMenuOption(){
        
    }

    private async _verifySchedulePage(){
        
    }

    private async _createShift(){
        
    }

    private async _approveShift(){
        
    }
}