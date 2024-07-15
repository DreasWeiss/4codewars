const fs = require("fs");

function addNewRowInMdTable(path, separator, row) {
    fs.readFile(path, "utf8", (err, data) => {
      if (err) {
        return console.error(`err with reading file: ${path}`, err);
      }
      const lines = data.split("\n");
      const separatorIndex = lines.findIndex(
        (line) => line.trim() === separator
      );
      if (separatorIndex === -1) {
        return console.error("Table separator was not found");
      }
      lines.splice(separatorIndex + 1, 0, row);
      const updatedData = lines.join("\n");
      fs.writeFile(path, updatedData, "utf8", (err) => {
        if (err) {
          return console.error("Err write file:", err);
        }
        console.log(`${row} - succesfully added in ${path}`);
      });
    });
}

module.exports = addNewRowInMdTable;