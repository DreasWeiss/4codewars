const fs = require("fs");

function createFile(dirPath, textContent) {
  fs.writeFile(dirPath, textContent, (err) => {
    if (err) {
      console.error("An error occurred while writing the file:", err);
    } else {
      let file = dirPath.split("/").pop();
      console.log(`File ${file} created successfully!`);
    }
  });
}

module.exports = createFile;
