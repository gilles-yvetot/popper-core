/**
 * @jest-environment jest-playwright-preset
 * @flow
 */
import { screenshot, scroll } from '../utils/playwright.js';

const hack = async (page) => {
  // HACK: fixes issue with tables on GitHub Actions
  if (Boolean(process.env.CI) && process.env.BROWSER !== 'chromium') {
    await page.addStyleTag({ content: 'table { margin-left: 4px; }' });
  }
};

it('should position popper on right when reference is in table', async () => {
  await page.goto(`${TEST_URL}/table/basic.html`);
  await hack(page);

  await scroll(page, 'html', 100);

  expect(await screenshot(page)).toMatchImageSnapshot();
});

it('should position popper on right when reference and popper are in table', async () => {
  await page.goto(`${TEST_URL}/table/same.html`);
  await hack(page);

  await scroll(page, 'html', 100);

  expect(await screenshot(page)).toMatchImageSnapshot();
});

it('should position popper on right when reference is in table inside offsetParents', async () => {
  await page.goto(`${TEST_URL}/table/offset-parent.html`);
  await hack(page);

  await scroll(page, 'html', 100);

  expect(await screenshot(page)).toMatchImageSnapshot();
});

it('should position popper on right when reference and popper are in table inside offsetParents', async () => {
  await page.goto(`${TEST_URL}/table/same-offset-parent.html`);
  await hack(page);

  await scroll(page, 'html', 100);

  expect(await screenshot(page)).toMatchImageSnapshot();
});
