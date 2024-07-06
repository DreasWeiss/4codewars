const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");
const camelCase = require("./modules/camelCase");
const { dir } = require("console");

async function run(url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);

  // * INFO
  // parse info from codewars with puppeteer
  const title = await page.evaluate(
    () => document.querySelector("h4").innerText
  );
  const titleCamelCase = camelCase(title);
  const kyu = await page.evaluate(
    () =>
      +document
        .querySelector(".panel")
        .querySelector("span")
        .innerText.match(/\d+/)
        .join()
  );

  const text = await page.evaluate(
    () => document.querySelector(".markdown").innerHTML
  );
  const readme = `# ${title}
${kyu} kyu
[link to kata](${url})
<br/>
[my solution]('./kata.js')
<br/>
<br/>
${text}`;

  // create dir for a new KATA
  const dirPath = `./${titleCamelCase}`;

  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
    console.log(`Directory: ${titleCamelCase} - created successfully`);
  } else {
    console.log(`Directory: ${titleCamelCase} - already exists.`);
  }
  // create md file - kata's task info
  const kataReadmePath = `${dirPath}/README.md`;
  fs.writeFile(kataReadmePath, readme, (err) => {
    if (err) {
      console.error("An error occurred while writing the file:", err);
    } else {
      console.log("Kata's info file created successfully!");
    }
  });

  // parse func to kata.js
  const kataJS = await page.evaluate(() => {
    const parentElement = document.querySelector(".CodeMirror-code");
    if (!parentElement) return [];
    const pres = parentElement.querySelectorAll("pre");
    return Array.from(pres)
      .map((pre) => pre.textContent)
      .join("\n");
  });

  // create kata.js with katas func
  const kataJsPath = `${dirPath}/kata.js`;
  fs.writeFile(kataJsPath, kataJS, (err) => {
    if (err) {
      console.error("An error occurred while writing the file:", err);
    } else {
      console.log("kata.js file created successfully!");
    }
  });

  // new row in katas mdTable
  const kataRow = `|[${title}](${url})|${kyu}|JS|[path](${dirPath})|[solution](${dirPath}/kata.js)|`;
  console.log(kataRow);

  // paste kataRow into mdTable
  const readmePath = path.join(__dirname, "README.md");

  fs.readFile(readmePath, "utf8", (err, data) => {
    if (err) {
      return console.error(`err with reading file: ${readmePath}`, err);
    }
    const lines = data.split("\n");
    const separatorIndex = lines.findIndex(
      (line) => line.trim() === "|---|----|---|---|---|"
    );
    if (separatorIndex === -1) {
      return console.error("Table separator was not found");
    }
    lines.splice(separatorIndex + 1, 0, kataRow);
    const updatedData = lines.join("\n");
    fs.writeFile(readmePath, updatedData, "utf8", (err) => {
      if (err) {
        return console.error("Err write file:", err);
      }
      console.log(`${kataRow} - succesfully added in ${readmePath}`);
    });
  });

  await browser.close();
}
const args = process.argv.slice(2);
if (args.length === 0) {
  console.error("pls, incert URL");
  process.exit(1);
}
const url = args[0];
run(url);

// TODO: settings:
// - codewarsDir path
// - creating files with info and dirs
/*
structure:
./:
dir : katas
file: 1kyu.md
file: 2kyu.md
file: 3kyu.md
file: 4kyu.md
file: 5kyu.md
file: 6kyu.md
file: 7kyu.md
file: 8kyu.md
file: README.md
file: beta.md
*/
