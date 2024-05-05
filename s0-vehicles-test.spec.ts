import { test, expect } from '@playwright/test';

// Unique name generator function
function unique_name(name: string): string {
    const test_id = 'S0'; // Identifier for this specific test
    return `e2e-${name}${test_id}${process.env.E2E_UNIQUE_CONTEXT}`;
}

test.describe('Vehicle Management E2E Tests', () => {
    test.beforeEach(async ({ page }) => {
        // Ensure that necessary environment variables are set
        if (!process.env.E2E_URL || !process.env.E2E_USER || !process.env.E2E_PASSWORD || !process.env.E2E_UNIQUE_CONTEXT) {
            throw new Error('Environment variables E2E_URL, E2E_USER, E2E_PASSWORD, and E2E_UNIQUE_CONTEXT must be set.');
        }

        // Go to the app landing view specified in environment variable E2E_URL
        await page.goto(process.env.E2E_URL);

        // Login with E2E_USER in input[placeholder="Username"], E2E_PASSWORD in input[placeholder="Password"] clicking button[type="button"]
        await page.fill('input[placeholder="Username"]', process.env.E2E_USER);
        await page.fill('input[placeholder="Password"]', process.env.E2E_PASSWORD);
        await page.click('button[type="button"]');
    });

    test('Vehicle Management Workflow', async ({ page }) => {
        // Move the cursor to the top left corner of the browser window so that the left menu tray can be open
        await page.mouse.move(0, 0);

	// Click on button with class "layout-sidebar-anchor" to keep the left menu tray open
	await page.click('button.layout-sidebar-anchor');
        
        // Click on the menu item with href="/main/gestor-reservas/vehiculos"
        await page.click('a[href="/main/gestor-reservas/vehiculos"]');

	// Assert that on the top there are 5 nav/ol/li elements with the following 5 tokens as their content respectively: 
	// "Main", "/", "Gestor-reservas", "/", "Vehiculos"
	// because users must know where they are and be able to go back to the path that takes them there
	const expectedTokens = ['Main', '/', 'Gestor-reservas', '/', 'Vehiculos'];
	for (let i = 0; i < expectedTokens.length; i++) {
	    await expect(page.locator('nav ol li').nth(i)).toHaveText(expectedTokens[i]);
	}

        // Assert that below these elements there are two buttons with attribute aria-label="New" and aria-label="Delete" 
        // because users must be able to create new vehicles and delete existing vehicles
        await expect(page.locator('button[aria-label="New"]')).toBeVisible();
        await expect(page.locator('button[aria-label="Delete"]')).toBeVisible();

	// Type MATS0${process.env.E2E_UNIQUE_CONTEXT} in input[placeholder="Filter by Matricula..."] 
	// to find out if a record already exists for this test
	await page.fill('input[placeholder="Filter by Matricula..."]', unique_name('MAT'));

	// Check if a tr[data-pc-section="bodyrow"] exists to ensure that the record is deleted if it exists in this test
	const recordExists = await page.locator('tr[data-pc-section="bodyrow"]').count() > 0;
	if (recordExists) {
	    // Click on the second button[span[class="pi-trash"]] to delete the record because the first one is the one on the top
            await page.locator('//button[.//span[contains(@class, "pi-trash")]]').nth(1).click();
            // Click on button[aria-label="Yes"] to confirm deletion
            await page.click('button[aria-label="Yes"]');
	}

        // Click on the aria-label="New" button and type the required information
        // then click on button[type="submit"].
        await page.click('button[aria-label="New"]');
        await page.fill('input#plate', unique_name('MAT'));
        await page.fill('input#vehicleType', unique_name('VAN'));
        await page.fill('input#vehicleTypeDescription', `A van for test S0 and context ${process.env.E2E_UNIQUE_CONTEXT}`);
        await page.fill('span[id="vehicleCapacity"] input', '4');
        await page.click('button[aria-label="Submit"]');

        // Filter by the inserted values
        await page.fill('input[placeholder="Filter by Matricula..."]', unique_name('MAT'));
        await page.fill('input[placeholder="Filter by Vehicle Type..."]', unique_name('VAN'));
        await page.fill('input[placeholder="Filter by Description..."]', `A van for test S0 and context ${process.env.E2E_UNIQUE_CONTEXT}`);
        await page.fill('input[placeholder="Filter by Capacity..."]', '8');

        // Assert that a span with class="p-paginator-current" exists
        // and contains the text "Showing 0 to 0 of 0 businesses" because the record previously inserted will not be matched
        await expect(page.locator('span.p-paginator-current')).toHaveText('Showing 0 to 0 of 0 businesses');

        // Change the 8 by a 4
        await page.fill('input[placeholder="Filter by Capacity..."]', '4');

        // Assert that the span now contains "Showing 1 to 1 of 1 businesses" because the record previously inserted will be matched
        await expect(page.locator('span.p-paginator-current')).toHaveText('Showing 1 to 1 of 1 businesses');

        // Assert that one and only one tr[data-pc-section="bodyrow"] exists because the match happens with the unique record created by this e2
        await expect(page.locator('tr[data-pc-section="bodyrow"]')).toHaveCount(1);

        // Click on button[span[class"pi-pencil"]] to edit the vehicle
        await page.locator('//button[.//span[contains(@class, "pi-pencil")]]').click();

        // Type "One van for test S0 and context ${E2E_UNIQUE_CONTEXT}" in input id="vehicleTypeDescription"
        await page.fill('input#vehicleTypeDescription', `One van for test S0 and context ${process.env.E2E_UNIQUE_CONTEXT}`);

        // Assert that the row is no longer present and that "Showing 0 to 0 of 0 businesses" shows up 
        // because we have replaced "A" by "One" in a field that is being filtered by a term that does not match the new content of it.
        await expect(page.locator('span.p-paginator-current')).toHaveText('Showing 0 to 0 of 0 businesses');

        // Replace "A" by "One" in input[placeholder="Filter by Description..."]
        await page.fill('input[placeholder="Filter by Description..."]', `One van for test S0 and context ${process.env.E2E_UNIQUE_CONTEXT}`);

        // Assert that the row is present and that "Showing 1 to 1 of 1 businesses" shows up 
        // because we have replaced "A" by "One" in the filter term, which does match the new content of it.
        await expect(page.locator('span.p-paginator-current')).toHaveText('Showing 1 to 1 of 1 businesses');

        // Click on the second button[span[class="pi-trash"]] to delete the record because the first one is the one on the top
        await page.locator('//button[.//span[contains(@class, "pi-trash")]]').nth(1).click();
        // Click on button[aria-label="Yes"] to cancel deletion
        await page.click('button[aria-label="No"]');

        // Assert that the row is still present because no deletion has happened
        await expect(page.locator('tr[data-pc-section="bodyrow"]')).toHaveCount(1);

        // Click on the second button[span[class="pi-trash"]] to delete the record because the first one is the one on the top
        await page.locator('//button[.//span[contains(@class, "pi-trash")]]').nth(1).click();
        // Click on button[aria-label="Yes"] to confirm deletion
        await page.click('button[aria-label="Yes"]');
        
        // Assert that the row is removed because a deletion has happened
        await expect(page.locator('tr[data-pc-section="bodyrow"]')).toHaveCount(0);
    });
});

