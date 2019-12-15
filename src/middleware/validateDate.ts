import { Request, Response, NextFunction } from 'express';

function validateDate(dateField: string) {
  // return the promise expected
  return (req: Request, res: Response, next: NextFunction) => {
    // get body
    const { body } = req;
    // get date
    const date = body[dateField];
    // define pattern
    const datePattern = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/;
    // check if it matches
    const matchesPattern = datePattern.test(date);
    // sanity check
    if (!matchesPattern) {
      // error out
      return res.status(400).json({ success: false, message: `${dateField} is invalid` });
    }

    next();
  };
}

export { validateDate };
