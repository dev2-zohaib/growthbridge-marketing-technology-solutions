const test = require('node:test');
const assert = require('node:assert/strict');

const { validatePayload } = require('../mock-api/server');

test('validatePayload returns no errors for a valid payload', () => {
  const errors = validatePayload({
    name: 'Alex Morgan',
    email: 'alex@growthstart.io',
    company: 'GrowthStart',
    message: 'We need help improving lead quality and reporting.'
  });

  assert.deepEqual(errors, {});
});

test('validatePayload flags missing and invalid fields', () => {
  const errors = validatePayload({
    name: 'A',
    email: 'not-an-email',
    company: '',
    message: 'short'
  });

  assert.equal(errors.name, 'Please provide your name.');
  assert.equal(errors.email, 'Please provide a valid email address.');
  assert.equal(errors.company, 'Please provide your company name.');
  assert.equal(errors.message, 'Please provide a message with at least 10 characters.');
});
