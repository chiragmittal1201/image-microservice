const sharp = require("sharp");
const path = require("path");

const addWatermark = async (imageBuffer) => {
  const logoPath = path.join(
    __dirname,
    "../../public/logo.png"
  );

  const resizedLogo = await sharp(logoPath)
    .resize({ width: 120 })
    .png()
    .toBuffer();

  return await sharp(imageBuffer)
    .composite([
      {
        input: resizedLogo,
        gravity: "southeast"
      }
    ])
    .toBuffer();
};

module.exports = addWatermark;