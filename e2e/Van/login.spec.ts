import { test, expect } from '@playwright/test';

test.describe('Login Flow', () => {
  test.describe('Login tests', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/');
    });

    test('should login with correct credentials', async ({ page }) => {
      await page.locator('#narvbarx').locator('[data-target="#logInModal"]').click();

      await page.locator('#logInModal #loginusername').fill('test@test.com');
      await page.locator('#logInModal #loginpassword').fill('test');
      await page.locator('#logInModal').getByRole('button', { name: 'Log in' }).click();

      await expect(page.locator('#nameofuser')).toContainText('test@test.com');
    });

    test('should show a browser prompt when the username incorrect', async ({ page }) => {
      const dialogPromise = new Promise<string>((resolve) => {
        page.once('dialog', (dialog) => {
          resolve(dialog.message());
          dialog.accept();
        });
      });

      await page.locator('#narvbarx').locator('[data-target="#logInModal"]').click();
      await page.locator('#logInModal #loginusername').fill('testincorrect@test.com');
      await page.locator('#logInModal #loginpassword').fill('test');
      await page.locator('#logInModal').getByRole('button', { name: 'Log in' }).click();

      const dialogMessage = await dialogPromise;
      expect(dialogMessage).toBe('User does not exist.');
    });

    test('should show a browser prompt when the password is incorrect', async ({ page }) => {
      const dialogPromise = new Promise<string>((resolve) => {
        page.once('dialog', (dialog) => {
          resolve(dialog.message());
          dialog.accept();
        });
      });

      await page.locator('#narvbarx').locator('[data-target="#logInModal"]').click();
      await page.locator('#logInModal #loginusername').fill('test@test.com');
      await page.locator('#logInModal #loginpassword').fill('testincorrect');
      await page.locator('#logInModal').getByRole('button', { name: 'Log in' }).click();

      const dialogMessage = await dialogPromise;
      expect(dialogMessage).toBe('Wrong password.');
    });

    test('should show a browser prompt when the username is empty', async ({ page }) => {
      const dialogPromise = new Promise<string>((resolve) => {
        page.once('dialog', (dialog) => {
          resolve(dialog.message());
          dialog.accept();
        });
      });

      await page.locator('#narvbarx').locator('[data-target="#logInModal"]').click();
      await page.locator('#logInModal #loginusername').fill('');
      await page.locator('#logInModal #loginpassword').fill('testincorrect');
      await page.locator('#logInModal').getByRole('button', { name: 'Log in' }).click();

      const dialogMessage = await dialogPromise;
      expect(dialogMessage).toBe('Please fill out Username and Password.');
    });

    test('should show a browser prompt when the password is empty', async ({ page }) => {
      const dialogPromise = new Promise<string>((resolve) => {
        page.once('dialog', (dialog) => {
          resolve(dialog.message());
          dialog.accept();
        });
      });

      await page.locator('#narvbarx').locator('[data-target="#logInModal"]').click();
      await page.locator('#logInModal #loginusername').fill('test@test.com');
      await page.locator('#logInModal #loginpassword').fill('');
      await page.locator('#logInModal').getByRole('button', { name: 'Log in' }).click();

      const dialogMessage = await dialogPromise;
      expect(dialogMessage).toBe('Please fill out Username and Password.');
    });

    test('should show a browser prompt when both fields are empty', async ({ page }) => {
      const dialogPromise = new Promise<string>((resolve) => {
        page.once('dialog', (dialog) => {
          resolve(dialog.message());
          dialog.accept();
        });
      });

      await page.locator('#narvbarx').locator('[data-target="#logInModal"]').click();
      await page.locator('#logInModal #loginusername').fill('');
      await page.locator('#logInModal #loginpassword').fill('');
      await page.locator('#logInModal').getByRole('button', { name: 'Log in' }).click();

      const dialogMessage = await dialogPromise;
      expect(dialogMessage).toBe('Please fill out Username and Password.');
    });

    test('should open and close the login modal', async ({ page }) => {
      await page.locator('#narvbarx').locator('[data-target="#logInModal"]').click();
      const modal = page.locator('#logInModal');
      await expect(modal).toBeVisible();

      await modal.locator('button.close').click();
      await expect(modal).not.toBeVisible();

      await page.locator('#narvbarx').locator('[data-target="#logInModal"]').click();
      await expect(modal).toBeVisible();

      await modal.locator('button.btn-secondary').filter({ hasText: 'Close' }).click();
      await expect(modal).not.toBeVisible();
    });

    test('should redirect to the home page after successful login', async ({ page }) => {
      await page.locator('#narvbarx').locator('[data-target="#logInModal"]').click();
      await page.locator('#logInModal #loginusername').fill('test@test.com');
      await page.locator('#logInModal #loginpassword').fill('test');
      await page.locator('#logInModal').getByRole('button', { name: 'Log in' }).click();

      await page.locator('#nameofuser').getByText('test@test.com').click();

      await expect(page).toHaveURL(/#/);
    });
  });
});