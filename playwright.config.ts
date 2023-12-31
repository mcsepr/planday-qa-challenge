import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  fullyParallel: true,
  retries:  1,
  workers: 1,

  reporter: [
    ['html', { open: 'never', outputFolder: './test-results/playwright-report/' }],
  ],

  use: {
    headless: true,
    viewport: { width: 1920, height: 1080},
    actionTimeout: 15000,
    ignoreHTTPSErrors: true,
    screenshot: 'only-on-failure',
    video: 'off',
    trace: 'on'
  },
  
  outputDir: 'test-results/artifacts',

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
})
