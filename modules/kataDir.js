const fs = require("fs");
const path = require("path");
const createFile = require("./createFile");

async function kataDir(kataInfo) {
  let { title, kyu, text, kataJS, url, titleCamelCase } = kataInfo;

  // create new kata dir
  const kataDirPath = `./katas/${titleCamelCase}`;
  if (!fs.existsSync(kataDirPath)) {
    fs.mkdirSync(kataDirPath);
    console.log(`Directory: ${titleCamelCase} - created successfully`);
  } else {
    console.log(`Directory: ${titleCamelCase} - already exists.`);
  }

  // create md file - kata's task info
  const readme = `# ${title}
    ${kyu} kyu
    [link to kata](${url})
    <br/>
    [my solution]('./kata.js')
    <br/>
    <br/>
    ${text}`;
  const kataReadmePath = `${kataDirPath}/README.md`;
  createFile(kataReadmePath, readme);

  // create kata.js with katas func
  const kataJsPath = `${kataDirPath}/kata.js`;
  createFile(kataJsPath, kataJS);
}

module.exports = kataDir;
