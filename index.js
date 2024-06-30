const puppeteer = require("puppeteer");
const fs = require("fs");
const camelCase = require("./modules/camelCase");

async function run(url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);

  // await page.screenshot({path:'example.png', fullPage: true});
  // const html = await page.content();
  // console.log(html);

  // const title = await page.evaluate(()=> document.title);
  // console.log(title);

  // * INFO
  // parse info from codewars with puppeteer
  const title = await page.evaluate(
    () => document.querySelector("h4").innerText
  );
  const titleCamelCase = camelCase(title);
  const kyu = await page.evaluate(
    () => +document.querySelector(".panel").querySelector("span").innerText.match(/\d+/).join()
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

  // create dir
  const dirPath = `./${titleCamelCase}`;

  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
    console.log(`Directory: ${titleCamelCase} - created successfully`);
  } else {
    console.log(`Directory: ${titleCamelCase} - already exists.`);
  }
  // create md file - kata's task info
  const filePath = `${dirPath}/README.md`;
  fs.writeFile(filePath, readme, (err) => {
    if (err) {
      console.error("An error occurred while writing the file:", err);
    } else {
      console.log("Kata's info file created successfully!");
    }
  });


  //TODO: parse and create task.js file
  //TODO: output row in mdTable mainREADME
  //TODO: output row in mdTable kataNumber


  console.log(title);
  console.log(titleCamelCase);

  await browser.close();
}
let url =
  "https://www.codewars.com/kata/58d5b39b1c0402c5f7002e0d/train/javascript";
run(url);
