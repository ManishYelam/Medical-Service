// 1. Fetch All Models' Data
// Request (Without Example):
`GET /api/models-data?modelName=<ModelName>`
// Request (With Example):
`GET /api/models-data?modelName=User`

// 2. Fetch Specific Model Data
// Request (Without Example):
`GET /api/models-data?modelName=<ModelName>`
// Request (With Example):
`GET /api/models-data?modelName=User`

// 3. Fetch Data with Filters
// Request (Without Example):
`GET /api/models-data?modelName=<ModelName>&filter=<filterCriteria>`
// Request (With Example):
`GET /api/models-data?modelName=User&filter=role:admin`

// 4. Pagination
// Request (Without Example):
`GET /api/models-data?modelName=<ModelName>&page=<pageNumber>&limit=<limitNumber>`
// Request (With Example):
`GET /api/models-data?modelName=User&page=2&limit=5`

// 5. Error Handling
// Request (Missing Health ID):
`GET /api/models-data?modelName=User`
// Request (Invalid Model Name):
`GET /api/models-data?modelName=InvalidModel`

// 6. Custom Queries
// Request (Without Example):
`GET /api/models-data/custom?modelName=<ModelName>&query=<customQuery>`
// Request (With Example):
`GET /api/models-data/custom?modelName=User&query={"isActive":true}`

// 7. Fetch Records by Date Range
// Request (Without Example):
`GET /api/models-data?modelName=<ModelName>&startDate=<startDate>&endDate=<endDate>`
// Request (With Example):
`GET /api/models-data?modelName=UserLog&startDate=2024-01-01&endDate=2024-12-31`

// 8. Advanced Query Parameters
// Request (Without Example):
`GET /api/models-data?modelName=<ModelName>&filter=<filterCriteria>&page=<pageNumber>&limit=<limitNumber>&sort=<sortCriteria>`
// Request (With Example):
`GET /api/models-data?modelName=User&filter=role:admin&page=1&limit=10&sort=name:asc`

// 9. Fetch Records with Sorting
// Request (Without Example):
`GET /api/models-data?modelName=<ModelName>&sort=<sortCriteria>`
// Request (With Example):
`GET /api/models-data?modelName=User&sort=name:asc`

// 10. Create a New Record
// Request (Without Example):
`POST /api/models-data`
`{
    "modelName": "<ModelName>",
    "data": <dataObject>
}`
// Request (With Example):
`POST /api/models-data`
`{
    "modelName": "User",
    "data": {
        "name": "John Doe",
        "email": "john.doe@example.com",
        "role": "admin"
    }
}`

// 11. Update a Record
// Request (Without Example):
`PUT /api/models-data`
`{
    "modelName": "<ModelName>",
    "data": {
        "id": <recordId>,
        <updatedDataFields>
    }
}`
// Request (With Example):
`PUT /api/models-data`
`{
    "modelName": "User",
    "data": {
        "id": 1,
        "name": "John Updated",
        "role": "user"
    }
}`

// 12. Delete a Record
// Request (Without Example):
`DELETE /api/models-data`
`{
    "modelName": "<ModelName>",
    "id": <recordId>
}`
// Request (With Example):
`DELETE /api/models-data`
`{
    "modelName": "User",
    "id": 1
}`

// 13. Bulk Create
// Request (Without Example):
`POST /api/models-data/bulk`
`{
    "modelName": "<ModelName>",
    "data": [<dataObjects>]
}`
// Request (With Example):
`POST /api/models-data/bulk`
`{
    "modelName": "User",
    "data": [
        {
            "name": "Jane Doe",
            "email": "jane.doe@example.com",
            "role": "admin"
        },
        {
            "name": "Bob Smith",
            "email": "bob.smith@example.com",
            "role": "user"
        }
    ]
}`

// 14. Bulk Update
// Request (Without Example):
`PUT /api/models-data/bulk`
`{
    "modelName": "<ModelName>",
    "data": [<updatedDataObjects>]
}`
// Request (With Example):
`PUT /api/models-data/bulk`
`{
    "modelName": "User",
    "data": [
        {
            "id": 1,
            "name": "John Updated",
            "role": "user"
        },
        {
            "id": 2,
            "name": "Jane Updated",
            "role": "admin"
        }
    ]
}
`
// 15. Bulk Delete
// Request (Without Example):
`DELETE /api/models-data/bulk`
`{
    "modelName": "<ModelName>",
    "ids": [<recordIds>]
}`
// Request (With Example):
`DELETE /api/models-data/bulk`
`{
    "modelName": "User",
    "ids": [1, 2, 3]
}`

// 16. Aggregate Data
// Request (Without Example):
`GET /api/models-data/aggregate?modelName=<ModelName>&operation=<operationType>`
// Request (With Example):
`GET /api/models-data/aggregate?modelName=User&operation=count`

// 17. Transaction Operations
// Request (Without Example):
`POST /api/models-data/transaction`
`{
    "modelName": "<ModelName>",
    "operations": [
        {
            "type": "<operationType>",
            "data": <dataObject>
        }
    ]
}`
// Request (With Example):
`POST /api/models-data/transaction`
`{
    "modelName": "User",
    "operations": [
        {
            "type": "create",
            "data": {
                "name": "Alice",
                "email": "alice@example.com"
            }
        },
        {
            "type": "update",
            "data": {
                "id": 1,
                "role": "admin"
            }
        }
    ]
}`
