test.only('customer completes checkout', async ({ page }) => {
  const password = 'unsafe-demo-password';
  await page.locator('//button[@id="buy"]').click({ force: true });
  await page.waitForTimeout(3000);
  await page.locator('.product:nth-child(2)').click();
});
