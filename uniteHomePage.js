const { test, expect } = require('@playwright/test');

test.before(async ({ page }) => {
  // Navigate to the NCCARE360 homepage before running the tests
  await page.goto('https://nccare360.resources.uniteus.io/');
});

test('Check NCCARE360 homepage loads correctly', async ({ page }) => {
  // Check if the page title is 'Unite Us - Resource Directory'
  const title = await page.title();
  expect(title).toBe('Unite Us - Resource Directory');
});

test('Fill in "Program or Organization Name" search field and click search button', async ({ page }) => {
  // Find the search input element
  const searchInput = await page.$('input[name="searchInput"]');
  // Assert that the search input is found
  expect(searchInput).not.toBeNull(); 
  
  if (searchInput) {
    // Fill in the search input field with the value 'Service'
    await page.fill('input[name="searchInput"]', 'Service');
    
    // Click on the search icon button
    await page.click('img.search-text');
    
    // Define the expected dynamic text
  const expectedText = 'ABA Teaching';
  
  // Wait for the presence of the element with class 'h5.h5.name'
  const element = await page.waitForSelector('h5.h5.name');
  
  // Get the text content of the element
  const text = await element.textContent();
  
  // Assert that the text content matches the expected dynamic text
  expect(text).toBe(expectedText);
    
  } else {
    // Throw an error if the search input element is not found
    throw new Error('Search input element not found');
  }
});

test('Fill in "Program or Organization Name" search field and click "Enter"', async ({ page }) => {
  // Fill in the search input field with the value 'Service'
  await page.fill('input[name="searchInput"]', 'Service');
  
  // Press the Enter key to submit the search
  await page.press('input[name="searchInput"]', 'Enter');
});
