# dp-spec - S3 - Transfer operator landing view
## Summary
Corresponds to e2e-spec - S3 - Transfer operator landing view (https://...)

## Database Migration: 
Transfer Services Table:
The following fields will be added to the transfer_services table:
```
Incidents (Foreign key)
```

## Backend Entity Creation:
I will introduce a new entity named Incident, which will contain the following fields:
 
```
id (Primary_key)
date (LocalDate)
observations (String)
transferService (Foreign KEY)
```

## Table in the DB:
● Need to create a table for the above entity in the bookings schema of the database.

## Repository:
● Will create a new repository named IncidentRepository
● The repository will be extended with JpaRepository to provide necessary methods.

## Service:
● Will create a new service named IncidentService
● The service layer will contain all the business logic for the following end-points.

## Controller End-Points:
Will create a new controller named IncidentController which will contain the following end-points:
● getAll
● getById
● create
● update

## Frontend Overview:
To enhance the structure of our code, I will use small components and will put them 'TransferServicesComponents' folder. These components will be designed for shared elements. This approach not only enhances code maintainability but also sets the stage for future scalability. I will move TransferServicesForm into a standalone page rather than using a model. Additionally, I will ensure that the design is responsive, ensuring a seamless user experience.

### Header Component:
To initiate this restructuring, I will commence by creating a Header component. This component will encompass:
● Day Reservation heading and selected date information
● Create New Button: Facilitating the creation of new items.
● Date Field: An interactive field for date selection

### Table Component:
Following the Header component, the Table component will be developed to present structured data in a tabular format. It will incorporate features such as:
● Header for export CSV dropdown filter and keyword search
● Sorting: Both ascending and descending options for improved data presentation.
● Car category icon display
● Filtering functionality on complete table, by using search field on table.
● FE Pagination of table data.
● Status indication using capsules and colored text

### Page for Creating New Bookings:
Upon clicking the "New Booking" option, users will be directed to a new page where they can input necessary details for creating a new booking. I will use the Autocomplete component for origin, destination, conductors, and service code and will add dynamic data in it by fetching them from related stores. Upon submission, a new record will be generated.

### Page for Updating data:
When a user selects a reference no or edit button in the table, a new page will open with the booking details. Users can edit the data. I will use the same form which we are using for creating new booking. Upon saving, the changes will be saved against that booking.
