const express = require("express");
const router = express.Router()
const wrapperController = require('@/middleware/wrapperController')
const loadDataController = require('../controllers/loadData')

const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {  cb(null, 'Downloads/');  }
  ,filename: (req, file, cb) => { cb(null, Date.now() +'_'+ file.originalname );  }
});

const upload = multer({ storage: storage });

router.post("/", upload.any(), wrapperController(loadDataController.saveData));

module.exports = router;