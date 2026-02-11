import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: 'e2e',
  timeout: 15000,
  expect: {
    timeout: 10000,
  },
  reporter: 'html',
  use: {
    baseURL: 'https://www.demoblaze.com',
    screenshot: 'only-on-failure',
    trace: 'on-first-retry',
  },
});
