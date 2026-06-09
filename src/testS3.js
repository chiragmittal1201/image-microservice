require("dotenv").config();
const uploadToS3 = require(
  "./services/s3Service"
);

const run = async () => {
  try {
    const url = await uploadToS3(
      Buffer.from("Hello AWS"),
      "test.txt",
      "text/plain"
    );

    console.log(url);

  } catch (error) {
    console.error(error);
  }
};

run();