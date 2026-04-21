const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.querySelector('.site-nav');

if (navToggle && siteNav) {
  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    siteNav.classList.toggle('is-open');
  });

  siteNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navToggle.setAttribute('aria-expanded', 'false');
      siteNav.classList.remove('is-open');
    });
  });
}

const fieldRules = {
  name: {
    validate: (value) => value.trim().length >= 2,
    message: 'Please enter your full name.'
  },
  email: {
    validate: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
    message: 'Please enter a valid work email.'
  },
  company: {
    validate: (value) => value.trim().length >= 2,
    message: 'Please enter your company name.'
  },
  businessType: {
    validate: (value) => value.trim().length > 0,
    message: 'Please select a business type.'
  },
  budget: {
    validate: (value) => value.trim().length > 0,
    message: 'Please select a monthly budget range.'
  },
  message: {
    validate: (value) => value.trim().length >= 20,
    message: 'Please share at least 20 characters about your goals.'
  }
};

function showFieldState(fieldName, isValid, message = '') {
  const field = document.getElementById(fieldName);
  const errorNode = document.getElementById(`${fieldName}-error`);

  if (!field || !errorNode) {
    return;
  }

  field.setAttribute('aria-invalid', String(!isValid));
  errorNode.textContent = isValid ? '' : message;
}

export function validateField(fieldName, value) {
  const rule = fieldRules[fieldName];
  if (!rule) {
    return { isValid: true, message: '' };
  }

  const isValid = rule.validate(value);
  return {
    isValid,
    message: isValid ? '' : rule.message
  };
}

export function validateFormData(values) {
  return Object.entries(fieldRules).reduce(
    (accumulator, [fieldName]) => {
      const result = validateField(fieldName, values[fieldName] ?? '');
      accumulator[fieldName] = result;
      accumulator.isValid = accumulator.isValid && result.isValid;
      return accumulator;
    },
    { isValid: true }
  );
}

async function postToEndpoint(form, formData) {
  if (window.location.protocol === 'file:') {
    return { ok: true, mode: 'demo' };
  }

  const response = await fetch('/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams(formData).toString()
  });

  return { ok: response.ok, mode: 'network' };
}

const form = document.getElementById('contact-form');

if (form) {
  const statusNode = document.getElementById('form-status');

  Object.keys(fieldRules).forEach((fieldName) => {
    const field = document.getElementById(fieldName);
    if (!field) {
      return;
    }

    field.addEventListener('blur', () => {
      const result = validateField(fieldName, field.value);
      showFieldState(fieldName, result.isValid, result.message);
    });
  });

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const values = Object.fromEntries(formData.entries());
    const validation = validateFormData(values);

    Object.entries(fieldRules).forEach(([fieldName]) => {
      const result = validation[fieldName];
      showFieldState(fieldName, result.isValid, result.message);
    });

    if (!validation.isValid) {
      if (statusNode) {
        statusNode.textContent = 'Please correct the highlighted fields and try again.';
        statusNode.dataset.state = 'error';
      }
      return;
    }

    const submitButton = form.querySelector('button[type="submit"]');
    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = 'Sending...';
    }

    if (statusNode) {
      statusNode.textContent = 'Submitting your inquiry...';
      statusNode.dataset.state = 'pending';
    }

    try {
      const result = await postToEndpoint(form, formData);

      if (!result.ok) {
        throw new Error('Request failed');
      }

      form.reset();
      Object.keys(fieldRules).forEach((fieldName) => showFieldState(fieldName, true));

      if (statusNode) {
        statusNode.textContent =
          result.mode === 'demo'
            ? 'Demo mode: your message is valid and ready for deployment to a forms backend.'
            : 'Thanks! Your inquiry has been submitted successfully.';
        statusNode.dataset.state = 'success';
      }
    } catch (error) {
      if (statusNode) {
        statusNode.textContent = 'There was an issue submitting the form. Please email hello@growthbridge.example or try again later.';
        statusNode.dataset.state = 'error';
      }
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = 'Send inquiry';
      }
    }
  });
}
