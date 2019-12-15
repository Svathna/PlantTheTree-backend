const multer = require('multer');

module.exports = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req: any, file: any, cb: any) => {
    if (!file.mimetype.match(/jpe|jpeg|png|gif$i/)) {
      cb(new Error('File is not supported'), false);
      return;
    }

    cb(null, true);
  },
  limits: {
    fileSize: 3200000,
  },
});
