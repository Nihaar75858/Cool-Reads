// backend/gridFsStorage.js
const crypto = require('crypto');
const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');
const path = require('path');

// Mongo URI
const mongoURI = 'mongodb://localhost:27017/booky';

const storage = new GridFsStorage({
  url: mongoURI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      const filename = `${crypto.randomBytes(16).toString('hex')}${path.extname(file.originalname)}`;
      const fileInfo = {
        filename: filename,
        bucketName: 'uploads' // this will be the GridFS bucket name
      };
      resolve(fileInfo);
    });
  }
});

const upload = multer({ storage });
module.exports = upload;
