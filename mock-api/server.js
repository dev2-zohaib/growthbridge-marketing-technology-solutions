const http = require('http');

const PORT = 3000;

function validatePayload(payload = {}) {
  const errors = {};

  if (!payload.name || payload.name.trim().length < 2) {
    errors.name = 'Please provide your name.';
  }

  if (!payload.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email.trim())) {
    errors.email = 'Please provide a valid email address.';
  }

  if (!payload.company || payload.company.trim().length < 2) {
    errors.company = 'Please provide your company name.';
  }

  if (!payload.message || payload.message.trim().length < 10) {
    errors.message = 'Please provide a message with at least 10 characters.';
  }

  return errors;
}

function sendJson(response, statusCode, payload) {
  response.writeHead(statusCode, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  });
  response.end(JSON.stringify(payload, null, 2));
}

const server = http.createServer((request, response) => {
  if (request.method === 'OPTIONS') {
    response.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    });
    response.end();
    return;
  }

  if (request.url !== '/api/contact' || request.method !== 'POST') {
    sendJson(response, 404, {
      success: false,
      message: 'Route not found.'
    });
    return;
  }

  let rawBody = '';

  request.on('data', (chunk) => {
    rawBody += chunk;
  });

  request.on('end', () => {
    let payload;

    try {
      payload = JSON.parse(rawBody || '{}');
    } catch (error) {
      sendJson(response, 400, {
        success: false,
        message: 'Request body must be valid JSON.'
      });
      return;
    }

    const errors = validatePayload(payload);

    if (Object.keys(errors).length > 0) {
      sendJson(response, 400, {
        success: false,
        message: 'Invalid request payload.',
        errors
      });
      return;
    }

    sendJson(response, 200, {
      success: true,
      message: 'Thanks! Your GrowthBridge request has been received.',
      submissionId: `GB-${Date.now()}`
    });
  });
});

if (require.main === module) {
  server.listen(PORT, () => {
    console.log(`GrowthBridge mock API listening on http://localhost:${PORT}`);
  });
}

module.exports = {
  server,
  validatePayload
};
