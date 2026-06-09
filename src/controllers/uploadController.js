const fs = require("fs");
const path = require("path");

const compressImage = require("../services/compressionService");
const addWatermark = require("../services/watermarkService");
const saveMetadata = require("../services/metadataService");
const generateHash = require("../services/hashService");
const processImage = require("../services/processImage");

const getHistory = (req, res) => {
  try {
    const metadataPath = path.join(
      __dirname,
      "../../uploads/metadata/history.json"
    );

    const history = JSON.parse(
      fs.readFileSync(metadataPath, "utf-8")
    );

    return res.status(200).json({
      success: true,
      total: history.length,
      history
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

const uploadSingle = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: "NO_FILE"
      });
    }

    const result =
      await processImage(req.file);

    return res.json(result);

  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

const uploadMultiple = async (req, res) => {
  try {
    console.log("MULTIPLE UPLOAD STARTED");

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        error: "NO_FILES"
      });
    }

    const results = [];

    for (const file of req.files) {
      console.log("PROCESSING:", file.originalname);

      const result = await processImage(file);

      console.log("DONE:", file.originalname);

      results.push(result);
    }

    console.log("ALL FILES DONE");

    return res.status(200).json({
      success: true,
      totalFiles: req.files.length,
      results
    });

  } catch (error) {
    console.error("UPLOAD ERROR:", error);

    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

module.exports = {
  uploadSingle,
  uploadMultiple
};

module.exports = {
  uploadSingle,
  uploadMultiple,
  getHistory
};