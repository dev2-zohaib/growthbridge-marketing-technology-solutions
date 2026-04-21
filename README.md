# GrowthBridge Marketing & Technology Solutions Website

A complete static product website for **GrowthBridge Marketing & Technology Solutions** built with plain HTML, CSS, and JavaScript. The project includes a mobile-responsive landing page, a validated contact form, a lightweight mock backend for testing, and Postman-ready artifacts for API demonstration.

## Highlights

- Responsive marketing website tailored to startups, e-commerce brands, SaaS companies, and regional service businesses
- Messaging focused on integrated marketing + technology services, analytics-driven growth, and measurable outcomes
- Conversion-focused contact form with only essential fields: name, email, company, message
- JavaScript client-side validation and API-ready submission flow
- Lightweight Node mock endpoint for local testing and POSTMAN demos
- Basic automated validation tests for the form logic

## Quick start

1. Clone the repository.
2. Start the mock API:
   ```bash
   node mock-api/server.js
   ```
3. Serve the static site from the repository root using any local static file server, for example:
   ```bash
   python3 -m http.server 8080
   ```
4. Open `http://localhost:8080` in your browser.

The frontend submits to `http://localhost:3000/api/contact` by default.

## Scripts

This project intentionally keeps dependencies minimal. For form validation tests, use Node's built-in test runner:

```bash
node --test tests/contact-validation.test.js
```

## Documentation

- Setup and testing guide: [`docs/SETUP_AND_TESTING.md`](docs/SETUP_AND_TESTING.md)
- API contract example: [`docs/api/contact-endpoint.md`](docs/api/contact-endpoint.md)
- Sample request body: [`postman/contact-request-sample.json`](postman/contact-request-sample.json)
- Sample response body: [`postman/contact-response-sample.json`](postman/contact-response-sample.json)
- Postman collection: [`postman/GrowthBridge-Contact-API.postman_collection.json`](postman/GrowthBridge-Contact-API.postman_collection.json)

## Project structure

```text
.
├── assets/
│   ├── css/styles.css
│   └── js/app.js
├── docs/
│   ├── api/contact-endpoint.md
│   └── SETUP_AND_TESTING.md
├── mock-api/server.js
├── postman/
│   ├── GrowthBridge-Contact-API.postman_collection.json
│   ├── contact-request-sample.json
│   └── contact-response-sample.json
├── tests/
│   └── contact-validation.test.js
├── index.html
└── README.md
```

## Notes

- Replace the `CONTACT_ENDPOINT` constant in `assets/js/app.js` when pointing the form to a deployed backend.
- The mock API demonstrates the exact POST contract expected by the frontend and can be exercised in Postman.
