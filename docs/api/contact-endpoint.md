# Contact Endpoint Contract

## Endpoint pattern

```http
POST /api/contact
```

Local development base URL:

```text
http://localhost:3000/api/contact
```

Production-ready pattern:

```text
https://your-api-domain.example.com/api/contact
```

## Request headers

```http
Content-Type: application/json
```

## Request body

```json
{
  "name": "Alex Morgan",
  "email": "alex@growthstart.io",
  "company": "GrowthStart",
  "message": "We need stronger visibility and more qualified leads."
}
```

## Success response

Status: `200 OK`

```json
{
  "success": true,
  "message": "Thanks! Your GrowthBridge request has been received.",
  "submissionId": "GB-1710000000000"
}
```

## Validation error response

Status: `400 Bad Request`

```json
{
  "success": false,
  "message": "Invalid request payload.",
  "errors": {
    "message": "Please provide a message with at least 10 characters."
  }
}
```

## Notes

- The mock API in this repository implements this contract.
- The frontend expects JSON in both success and error cases.
- This pattern is suitable for browser testing, curl, and POSTMAN.
