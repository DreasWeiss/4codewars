const process = require("process");
const path = require('path');
const addNewRowInMdTable = require("./addNewRowInMdTable");

function updateTable(kataInfo) {
  let { title, kyu, text, kataJS, url, titleCamelCase } = kataInfo;
  // paste kataRow into mdTable
  const kataDirPath = `./katas/${titleCamelCase}`;
  const readmePath = path.join(process.cwd(), "README.md");
  const kataPath = path.join(process.cwd(), `${kyu}kyu.md`);
  const separatorKataTable = "|---|----|---|---|---|";
  const kataRow = `|[${title}](${url})|${kyu}|JS|[path](${kataDirPath})|[solution](${kataDirPath}/kata.js)|`;

  addNewRowInMdTable(readmePath, separatorKataTable, kataRow);
  addNewRowInMdTable(kataPath, separatorKataTable, kataRow);
}

module.exports = updateTable;
