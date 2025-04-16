const multer = require('multer');
const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/'); 
    },
    filename: function(req, file, cb) {
      const uniqueSuffix =  Date.now() + '-' + Math.round.apply(Math.random() * 1e9);

       const filename = file.originalname.split(".")[0];
       cb(null,filename + "-" + uniqueSuffix + ".png"); 
    },
  });

  const productstorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'productuploads/');
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9); 
      const filename = file.originalname.split(".")[0];
      cb(null, filename + "-" + uniqueSuffix + ".png");
    }
  });  
  
  
  module.exports = {
    upload: multer({ storage: storage }),
    productupload: multer({ storage: productstorage }),
  };
  