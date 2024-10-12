
const multer = require('multer');
const fs = require('fs'); 
const path = require('path');     
const scanFileWithVirusTotal = require('./virusTotal');
const storage = multer.diskStorage({
    destination: './uploads/', // Directory where the files will be saved
    filename: (req, file, cb) => {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname)); // Filename structure
    }
  });

function checkFileType(file, cb) {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
  
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb('Error: Images Only!');
    }
  }
  // Initialize upload
const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 }, // File size limit in bytes
    fileFilter: (req, file, cb) => {
      checkFileType(file, cb);
    }
  }).single('test'); // 'myFile' is the name of the form field
  
  // Route to handle file upload
const uploadFile =(req, res) => {      
    upload(req, res, (err) => {
        if (err) {
          res.send('Error uploading file: ' + err);
        } else {
          if (req.file == undefined) {
            res.send('No file selected');
          } else {
            scanFileWithVirusTotal(`C:/Users/vinay/Desktop/capstone/backend/uploads/${req.file.filename}`)
            res.send('File uploaded successfully: ' + req.file.filename);
          }
        }
      });
}   
module.exports = {uploadFile}