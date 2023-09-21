# README #

Here you can find information about how to set up and run e2e tests for the Planday QA Challenge using [Playwright Test](https://playwright.dev/).

## How do I get set up? ##

- Clone the repository 
- Check [System Requirements](https://playwright.dev/docs/library/#system-requirements)
- Install dependencies
```bash
npm install
```

- Install browsers via Playwright CLI e.g.
```bash
npx playwright install --with-deps
```

## How to run the tests? ##

- Run all e2e tests (this is configured to run only in chromium)
```bash
npm run e2e
```

Alternatively, you can run specific tests in specific browsers with specific configurations by:
```bash
npx playwright test tests\e2e\TEST_FILE_NAME --config=CONFIG_FILE_NAME --project=BROWSER_NAME
```

For example, to run e2e test in all browswers (chromium, firefox, webkit) use:
```bash
npx playwright test --config=e2e.config.ts
```

In case, you want to use different accounts for the tests, you can specify the environment variable in CLI or by editing the .env file
```bash
USERNAME=someusername PASSWORD=somepassword npx playwright test e2e
```

### Test Results ###

Playwright report of the test run is generated under ../test-results/playwright-report/index.html, and can be viewed in the browswer by:

```bash
npx playwright show-report test-results\playwright-report
```

In case of failed tests, screenshots of the point of failure are saved under ../test-results/artifacts/.

### Headless Mode ###

All browsers are by default configured to run in headless mode. To debug or just to see what is going on, you can edit the corresponding config files

```json
      use: { 
        headless: false,
      }
```
### Contact ###

- Matyas Csepregi (m.csepregi0@gmail.com)

21.09.2023
