const { check } = require('express-validator/check');

function validatePassword(passwordField: string) {
  // do the check and return that same thing
  return check(passwordField).isLength({ min: 8 });
}

export { validatePassword };
