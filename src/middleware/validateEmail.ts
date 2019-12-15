const { check } = require('express-validator/check');

function validateEmail(emailField: string) {
  return check(emailField)
    .isEmail()
    .normalizeEmail();
}

export { validateEmail };
