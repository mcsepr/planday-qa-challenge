import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: "./tests/e2e/",
  fullyParallel: true,
  retries:  0,
  workers: 1,

  reporter: [
    ['html', { open: 'never', outputFolder: './test-results/playwright-report/' }],
  ],

  use: {
    headless: false,
    viewport: { width: 1280, height: 720},
    actionTimeout: 10000,
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
  ],
});
