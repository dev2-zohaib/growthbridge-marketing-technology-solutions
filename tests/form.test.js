import { describe, expect, it } from 'vitest';
import { validateField, validateFormData } from '../src/main.js';

describe('contact form validation', () => {
  it('rejects invalid email addresses', () => {
    const result = validateField('email', 'not-an-email');
    expect(result.isValid).toBe(false);
    expect(result.message).toContain('valid work email');
  });

  it('accepts complete valid form data', () => {
    const result = validateFormData({
      name: 'Taylor Morgan',
      email: 'taylor@example.com',
      company: 'GrowthBridge Prospect',
      businessType: 'SaaS company',
      budget: '$15k - $50k',
      message: 'We need better attribution, reporting, and paid acquisition performance.'
    });

    expect(result.isValid).toBe(true);
    expect(result.message?.isValid).toBeUndefined();
  });

  it('flags messages that are too short', () => {
    const result = validateField('message', 'Need help');
    expect(result.isValid).toBe(false);
  });
});
