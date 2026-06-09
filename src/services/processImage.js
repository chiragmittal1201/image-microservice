const uploadToS3 = require("./s3Service");
const fs = require("fs");
const path = require("path");

const compressImage = require("./compressionService");
const addWatermark = require("./watermarkService");
const saveMetadata = require("./metadataService");
const generateHash = require("./hashService");

const processImage = async (file) => {
  const imageHash = generateHash(file.buffer);

  const metadataPath = path.join(
    __dirname,
    "../../uploads/metadata/history.json"
  );

  const history = JSON.parse(
    fs.readFileSync(metadataPath, "utf-8")
  );

  const duplicate = history.find(
    (item) => item.hash === imageHash
  );

  if (duplicate) {
    return {
      success: false,
      filename: file.originalname,
      error: "DUPLICATE_IMAGE"
    };
  }

  // Save Original
  const originalPath = path.join(
    __dirname,
    "../../uploads/originals",
    file.originalname
  );

  fs.writeFileSync(
    originalPath,
    file.buffer
  );

  // Compress
  const compressedBuffer =
    await compressImage(file.buffer);

  // Watermark
  const processedBuffer =
    await addWatermark(compressedBuffer);

  const fileNameWithoutExtension =
    path.parse(file.originalname).name;

  // Save Compressed
  const compressedPath = path.join(
    __dirname,
    "../../uploads/compressed",
    `${fileNameWithoutExtension}.webp`
  );

  fs.writeFileSync(
    compressedPath,
    compressedBuffer
  );

  const compressedUrl =
  await uploadToS3(
    compressedBuffer,
    `compressed/${fileNameWithoutExtension}.webp`,
    "image/webp"
  );

  // Save Processed
  const processedPath = path.join(
    __dirname,
    "../../uploads/processed",
    `${fileNameWithoutExtension}.webp`
  );

  fs.writeFileSync(
    processedPath,
    processedBuffer
  );

  const processedUrl =
  await uploadToS3(
    processedBuffer,
    `processed/${fileNameWithoutExtension}.webp`,
    "image/webp"
  );

  const originalSize = file.size;
  const compressedSize =
    compressedBuffer.length;

  const savedPercentage = (
    ((originalSize - compressedSize) /
      originalSize) *
    100
  ).toFixed(2);

  saveMetadata({
  filename: file.originalname,
  hash: imageHash,

  compressedUrl,
  processedUrl,

  originalSize,
  compressedSize,
  savedPercentage,
  uploadedAt: new Date().toISOString()
});

  return {
  success: true,
  filename: file.originalname,

  compressedUrl,
  processedUrl,

  originalSize,
  compressedSize,
  savedPercentage
};
};

module.exports = processImage;