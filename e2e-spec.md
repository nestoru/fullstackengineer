# Introduction
This e2e-spec is provided only as a showcase.
Code the following e2e-spec using Playwright. The code for the e2e-spec (or e2e-impl) must contain a comment per line of the e2e and right below that comment the implementation for it. The test must fail if any environment variable is not set and contains a value.
Name the test with the scenario number and the title followed by "-test.ts".
Selectors should really be attributes in each element with a name matching "e2e-id", for example "e2e-id='password'".
e2e

# e2e-spec - S0 - Vehicles
```
Go to the app landing view specified in environment variable E2E_URL
Login with E2E_USER in input[placeholder="Username"], E2E_PASSWORD in input[placeholder="Password"] clicking button[type="button"]
Move the cursor to the top left corner of the browser window so that the left menu tray can be open
Click on button[class="layout-sidebar-anchor" to keep left menu tray open
Click on the menu item with href="/main/gestor-reservas/vehiculos"
Assert that on the top there are 5 nav/ol/li elements with the following 5 tokens as their content respectively: Main / Gestor-reservas / Vehiculos because users must know where they are and able to go back to the path that takes them there
Assert that below these elements there are two buttons with attribute aria-label="New" and aria-label="Delete" because users must be able to create new vehicles and delete existing vehicles
Type MATS0${E2E_UNIQUE_CONTEXT} in input[placeholder="Filter by Matricula..."] to find out if a record already exists for this test
Check if a tr[data-pc-section="bodyrow"] exists to ensure that the record is deleted if it exists in this test
Click on the second button[span[class="pi-trash"]] to delete the record because the first one is the one on the top
Click on button[aria-label="Yes"] to confirm deletion
Click on the aria-label="New" button and type the following information: MATS0${E2E_UNIQUE_CONTEXT} in input id="plate"; VANS0${E2E_UNIQUE_CONTEXT} in id="vehicleType"; "A van for test S0 and context ${E2E_UNIQUE_CONTEXT}" in input id="vehicleTypeDescription"; and 4 in span[id="vehicleCapacity"]/input; then click on button[type="submit"].

 Type MATS0${E2E_UNIQUE_CONTEXT} in input[placeholder="Filter by Matricula..."]; VANS0${E2E_UNIQUE_CONTEXT} in input[placeholder="Filter by Vehicle Type..."]; "A van for test S0 and context ${E2E_UNIQUE_CONTEXT}" in input[placeholder="Filter by Description..."]; and 8 in input[placeholder="Filter by Capacity..."].
Assert that a span with class="p-paginator-current" exists and contains the text "Showing 0 to 0 of 0 businesses" because the record previously inserted will not be matched.
Change the 8 by a 4.
Assert that the span now contains "Showing 1 to 1 of 1 businesses" because the record previously inserted will be matched.
Assert that one and only one tr[data-pc-section="bodyrow"] exists because the match happens with the unique record created by this e2e
Click on button[span[class"pi-pencil"]] to edit the vehicle
Type "One van for test S0 and context ${E2E_UNIQUE_CONTEXT}" in input id="vehicleTypeDescription"
Assert that the row is no longer present and that "Showing 0 to 0 of 0 businesses" shows up because we have replaced "A" by "One" in a field that is being filtered by a term that does not match the new content of it.
Replace "A" by "One" in input[placeholder="Filter by Description..."]
Assert that the row is present and that "Showing 1 to 1 of 1 businesses" shows up because we have replaced "A" by "One" in the filter term, which does match the new content of it.
Click on the second button[span[class="pi-trash"]] to delete the record because the first one is the one on the top
Click on button[aria-label="No"] to cancel deletion
Assert that the row is still present because no deletion has happened
Click on the second button[span[class="pi-trash"]] to delete the record because the first one is the one on the top
Click on button[aria-label="Yes"] to confirm the action
Assert that the row is removed because a deletion has happened
```
