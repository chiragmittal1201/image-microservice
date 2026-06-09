const allowedTypes = [
  "image/jpeg",
  "image/png",
  "image/webp"
];

const fileValidation = (req, res, next) => {
  if (!req.file) {
    return res.status(400).json({
      message: "No file uploaded"
    });
  }

  if (!allowedTypes.includes(req.file.mimetype)) {
    return res.status(400).json({
      message: "Only JPG, PNG and WEBP files are allowed"
    });
  }

  const maxSize = 5 * 1024 * 1024;

  if (req.file.size > maxSize) {
    return res.status(400).json({
      message: "File exceeds 5MB limit"
    });
  }

  next();
};

module.exports = fileValidation;