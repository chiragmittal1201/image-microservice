const fs = require("fs");
const path = require("path");

const saveMetadata = (data) => {
  const metadataPath = path.join(
    __dirname,
    "../../uploads/metadata/history.json"
  );

  let history = [];

  if (fs.existsSync(metadataPath)) {
    history = JSON.parse(
      fs.readFileSync(metadataPath, "utf-8")
    );
  }

  history.push(data);

  fs.writeFileSync(
    metadataPath,
    JSON.stringify(history, null, 2)
  );
};

module.exports = saveMetadata;