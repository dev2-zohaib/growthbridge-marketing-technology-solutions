# Setup, Run, and POSTMAN Testing Guide

## 1. Project overview

This repository contains a static marketing website for **GrowthBridge Marketing & Technology Solutions** plus a lightweight local API that simulates contact form submission.

## 2. Repository structure

- `index.html` - main landing page
- `assets/css/styles.css` - responsive styling
- `assets/js/app.js` - validation and form submission logic
- `mock-api/server.js` - local API-ready mock endpoint
- `docs/api/contact-endpoint.md` - request/response contract
- `postman/` - POSTMAN collection and sample payloads
- `tests/contact-validation.test.js` - validation test coverage

## 3. Run locally

### Start the mock API

```bash
node mock-api/server.js
```

Expected output:

```text
GrowthBridge mock API listening on http://localhost:3000
```

### Serve the static site

Use any local static server from the repo root. Example:

```bash
python3 -m http.server 8080
```

Open:

```text
http://localhost:8080
```

## 4. Contact form behavior

The browser form sends a JSON POST request to:

```text
http://localhost:3000/api/contact
```

Required fields:

- `name`
- `email`
- `company`
- `message`

Validation rules:

- name: minimum 2 characters
- email: valid email format
- company: minimum 2 characters
- message: minimum 10 characters

## 5. POSTMAN testing steps

### Import the collection

Import:

- `postman/GrowthBridge-Contact-API.postman_collection.json`

### Manual request settings

If creating manually in POSTMAN:

- Method: `POST`
- URL: `http://localhost:3000/api/contact`
- Header: `Content-Type: application/json`
- Body: raw JSON

Sample body:

```json
{
  "name": "Alex Morgan",
  "email": "alex@growthstart.io",
  "company": "GrowthStart",
  "message": "We need better lead generation and reporting clarity across our campaigns."
}
```

Expected success response:

```json
{
  "success": true,
  "message": "Thanks! Your GrowthBridge request has been received.",
  "submissionId": "GB-1710000000000"
}
```

Expected validation error example:

```json
{
  "success": false,
  "message": "Invalid request payload.",
  "errors": {
    "email": "Please provide a valid email address."
  }
}
```

## 6. Automated validation test

Run:

```bash
node --test tests/contact-validation.test.js
```

This verifies the validation logic used by the mock API.

## 7. Swapping in a real backend

When a live backend becomes available:

1. Keep the same request/response contract from `docs/api/contact-endpoint.md`.
2. Update `CONTACT_ENDPOINT` in `assets/js/app.js` to the new fully qualified URL.
3. Confirm CORS support if frontend and backend use different origins.
4. Re-run browser and POSTMAN tests.
