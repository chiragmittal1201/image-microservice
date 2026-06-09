const sharp = require("sharp");

const compressImage = async (buffer) => {
  return await sharp(buffer)
    .webp({ quality: 80 })
    .toBuffer();
};

module.exports = compressImage;