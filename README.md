# GrowthBridge Marketing & Technology Solutions Website

A modern, responsive marketing website for **GrowthBridge Marketing & Technology Solutions** built from scratch with semantic HTML, modular CSS, and lightweight JavaScript. The site is designed to be simple to run locally, easy to deploy, and suitable as a polished lead-generation presence.

## Highlights

- Strong positioning around measurable ROI, analytics-driven decision-making, and the combination of marketing expertise with engineering capability
- Dedicated sections for services, industries, differentiators/results, process, and contact
- Accessible semantic structure with skip link, labeled form controls, keyboard-visible focus states, and responsive navigation
- Static-site-friendly contact form configured for **Netlify Forms** with client-side validation and UI success/error states
- Lightweight Vite setup for local development and deployment
- Unit tests for form validation logic using Vitest

## Tech Stack

- **Vite** for local development and production build
- **HTML5** for the document structure
- **CSS3** for custom responsive styling
- **Vanilla JavaScript (ES modules)** for interaction and form handling
- **Vitest + jsdom** for validation tests

## Project Structure

```text
.
├── index.html
├── success.html
├── package.json
├── vite.config.js
├── src
│   ├── main.js
│   └── styles.css
└── tests
    ├── form.test.js
    └── setup.js
```

## Local Setup

### Prerequisites

- Node.js 18+
- npm 9+

### Install dependencies

```bash
npm install
```

### Run locally

```bash
npm run dev
```

The site will be available at the local Vite URL shown in your terminal, typically `http://localhost:5173`.

### Run tests

```bash
npm test
```

### Create a production build

```bash
npm run build
```

## Architecture Summary

- `index.html` contains the full landing page structure and Netlify-compatible form markup.
- `src/styles.css` provides the complete visual system, responsive layout, and accessible interaction states.
- `src/main.js` handles the mobile navigation toggle, reusable form validation rules, and async submission flow with clear feedback states.
- `success.html` provides a static confirmation page for deployments that redirect on successful form submission.
- `tests/form.test.js` validates the lead form rules so the most critical interaction has automated coverage.

## Contact Form Deployment Notes

This project is ready for static hosting. The form is currently implemented in a production-friendly static approach:

### Netlify Forms

The form already includes:

- `data-netlify="true"`
- `netlify`
- hidden `form-name`
- `method="POST"`
- `action="/success.html"`

When deployed to Netlify, submissions can be captured without adding a custom backend.

### Formspree or another endpoint

If you prefer Formspree or a custom serverless endpoint:

1. Replace the `postToEndpoint()` fetch target in `src/main.js`
2. Update the form `action` and attributes in `index.html`
3. Keep the existing validation and status UI as-is

## Accessibility Notes

- Uses semantic landmarks: header, nav, main, section, footer
- Includes a skip link for keyboard users
- Maintains visible focus indicators
- Associates each form field with a label and error messaging container
- Uses `aria-live` and `role="status"` for submission feedback

## Deployment Options

- **Netlify**: recommended for the included form setup
- **Vercel**: suitable for the static site, with form handling switched to Formspree or serverless functions
- **GitHub Pages**: suitable for the static site if using an external form processor

## Repository

GitHub repository: https://github.com/dev2-zohaib/growthbridge-marketing-technology-solutions

## Maintenance Notes

- Update messaging in `index.html` as service offerings evolve
- Extend tests in `tests/` if form fields or interaction logic change
- Replace example fallback email text in `src/main.js` with a production inbox before launch
