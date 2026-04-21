const CONTACT_ENDPOINT = 'http://localhost:3000/api/contact';

const form = document.querySelector('#contact-form');
const statusBox = document.querySelector('#form-status');

const validators = {
  name: (value) => value.trim().length >= 2 ? '' : 'Please enter your name.',
  email: (value) => /^(?:[a-zA-Z0-9_'^&/+-])+(?:\.(?:[a-zA-Z0-9_'^&/+-])+)*@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/.test(value.trim()) ? '' : 'Please enter a valid email address.',
  company: (value) => value.trim().length >= 2 ? '' : 'Please enter your company name.',
  message: (value) => value.trim().length >= 10 ? '' : 'Please share a brief message with at least 10 characters.'
};

function setFieldError(fieldName, message) {
  const input = form.elements[fieldName];
  const errorNode = document.querySelector(`[data-error-for="${fieldName}"]`);

  if (!input || !errorNode) return;

  input.classList.toggle('is-invalid', Boolean(message));
  errorNode.textContent = message;
}

function validateForm(values) {
  const errors = {};

  Object.entries(validators).forEach(([field, validator]) => {
    const message = validator(values[field] || '');
    setFieldError(field, message);

    if (message) {
      errors[field] = message;
    }
  });

  return errors;
}

function setStatus(message, type = '') {
  statusBox.textContent = message;
  statusBox.className = `form-status ${type}`.trim();
}

async function submitLead(payload) {
  const response = await fetch(CONTACT_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  const result = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(result.message || 'Form submission failed.');
  }

  return result;
}

if (form) {
  Array.from(form.elements).forEach((element) => {
    if (element.name && validators[element.name]) {
      element.addEventListener('blur', () => {
        const value = form.elements[element.name].value;
        const message = validators[element.name](value);
        setFieldError(element.name, message);
      });
    }
  });

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const payload = {
      name: form.elements.name.value,
      email: form.elements.email.value,
      company: form.elements.company.value,
      message: form.elements.message.value
    };

    const errors = validateForm(payload);
    if (Object.keys(errors).length > 0) {
      setStatus('Please fix the highlighted fields and try again.', 'error');
      return;
    }

    setStatus('Submitting your growth review request...', '');

    try {
      const result = await submitLead(payload);
      form.reset();
      Object.keys(validators).forEach((field) => setFieldError(field, ''));
      setStatus(result.message || 'Thanks! Your request has been submitted.', 'success');
    } catch (error) {
      setStatus(error.message || 'Unable to submit the form right now.', 'error');
    }
  });
}

window.GrowthBridgeContact = {
  validateForm,
  submitLead,
  CONTACT_ENDPOINT
};
