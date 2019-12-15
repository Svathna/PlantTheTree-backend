import { Request, Response, NextFunction } from 'express';
const { check, validationResult } = require('express-validator/check');

function validateString(stringField: string, allowSpaces: boolean = false) {
  if (allowSpaces) {
    return check(stringField)
      .trim()
      .isLength({ min: 2 })
      .matches(/^[\w\-\s]+$/);
  }
  return check(stringField)
    .trim()
    .isLength({ min: 2 })
    .isAlpha();
}
export { validateString };
