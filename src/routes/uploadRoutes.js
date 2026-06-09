const express = require("express");
const multer = require("multer");
const fileValidation = require("../middlewares/fileValidation");

const {
  uploadSingle,
  uploadMultiple,
  getHistory
} = require("../controllers/uploadController");

const router = express.Router();

const storage = multer.memoryStorage();

const upload = multer({
  storage
});

router.post(
  "/upload",
  upload.single("image"),
  fileValidation,
  uploadSingle
);

router.post(
  "/upload-multiple",
  upload.array("images", 10),
  uploadMultiple
);

router.get(
  "/history",
  getHistory
);

module.exports = router;