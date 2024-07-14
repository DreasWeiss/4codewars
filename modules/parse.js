const puppeteer = require("puppeteer");
const camelCase = require("./camelCase");

async function parse(url) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle2' });
    await page.waitForSelector('h4');
    await page.waitForSelector('.panel span');
    await page.waitForSelector('.markdown');
    
    const title = await page.evaluate(
        () => document.querySelector("h4").innerText
    );
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
    const kataJS = await page.evaluate(() => {
        const parentElement = document.querySelector(".CodeMirror-code");
        if (!parentElement) return [];
        const pres = parentElement.querySelectorAll("pre");
        return Array.from(pres)
          .map((pre) => pre.textContent)
          .join("\n");
      }
    );

    let kataInfo = {
        title,
        kyu,
        text,
        kataJS,
        url,
        titleCamelCase: camelCase(title)
    }
    await browser.close();

    return kataInfo;
}

module.exports = parse;