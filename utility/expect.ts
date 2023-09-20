import { Page, expect } from "@playwright/test";

export default class Expect {
  private _page: Page

  constructor (page: Page) {
    this._page = page
  }

  async textToBeVerifiedByText(text: string){
    const element = await this._page.locator(`text=${text}`)
    expect(await element.innerText()).toBe(text)
  }
 
  async textToBeVerifiedBeforeTimeout(selector: string, text: string, timeOut_s = 5) {
    const element = await this._page.waitForSelector(selector + ' >> text=' + text, { timeout: timeOut_s * 1000 })
    expect(await element.innerText()).toBe(text)
  }

  async textToBeVerified(selector: string, text: string) {
    const element = await this._page.locator(selector)
    expect(await element.innerText()).toContain(text)
  }

  async elementToBeHidden(selector: string){
    const element = await this._page.locator(selector)
    await element.waitFor({state: 'hidden'})
  }

  async elementToBeVisible(selector: string){
    const element = await this._page.locator(selector)
    await element.waitFor({state: 'visible'})
  }

  async elementToBeEnabled(selector: string){
    const element = await this._page.locator(selector)
    await expect(element).toBeEnabled()
  }

  async elementToBeDisabled(selector: string){
    const element = await this._page.locator(selector)
    await expect(element).toBeDisabled()
  }

  async elementToHaveClass(selector: string, className: string){
    const element = await this._page.locator(selector)
    await expect(element).toHaveClass(className)
  }

  async elementToHaveId(selector: string, id: string){
    const element = await this._page.locator(selector)
    id = id.replace('#', '')
    await expect(element).toHaveId(id)
  }

  async elementToHaveAttribute(selector: string, attr: string, attrValue: string){
    const element = await this._page.locator(selector)
    await expect(element).toHaveAttribute(attr, attrValue)
  }

  async elementToBeChecked(selector: string){
    const element = await this._page.locator(selector)
    await expect(element.isChecked()).toBeTruthy()
  }
}