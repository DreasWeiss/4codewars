const fs = require("fs");
const path = require("path");


async function kataDir(kataInfo) {
  let { title, kyu, text, kataJS, url, titleCamelCase } = kataInfo;

  const readme = `# ${title}
    ${kyu} kyu
    [link to kata](${url})
    <br/>
    [my solution]('./kata.js')
    <br/>
    <br/>
    ${text}`;

  const kataDirPath = `./katas/${titleCamelCase}`;

  if (!fs.existsSync(kataDirPath)) {
    fs.mkdirSync(kataDirPath);
    console.log(`Directory: ${titleCamelCase} - created successfully`);
  } else {
    console.log(`Directory: ${titleCamelCase} - already exists.`);
  }

  // create md file - kata's task info
  const kataReadmePath = `${kataDirPath}/README.md`;
  fs.writeFile(kataReadmePath, readme, (err) => {
    if (err) {
      console.error("An error occurred while writing the file:", err);
    } else {
      console.log("Kata's info file created successfully!");
    }
  });

  // create kata.js with katas func
  const kataJsPath = `${kataDirPath}/kata.js`;
  fs.writeFile(kataJsPath, kataJS, (err) => {
    if (err) {
      console.error("An error occurred while writing the file:", err);
    } else {
      console.log("kata.js file created successfully!");
    }
  });
}

module.exports = kataDir;