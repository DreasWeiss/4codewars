const puppeteer = require("puppeteer");
const fs = require("fs");
const camelCase = require("./modules/camelCase");
const { dir } = require("console");

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

  // create dir for a new KATA
  const dirPath = `./${titleCamelCase}`;

  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
    console.log(`Directory: ${titleCamelCase} - created successfully`);
  } else {
    console.log(`Directory: ${titleCamelCase} - already exists.`);
  }
  // create md file - kata's task info
  const readmePath = `${dirPath}/README.md`;
  fs.writeFile(readmePath, readme, (err) => {
    if (err) {
      console.error("An error occurred while writing the file:", err);
    } else {
      console.log("Kata's info file created successfully!");
    }
  });
  
  //TODO: parse and create kata.js file => file name : kata.js
  // parse func to kata.js
  const kata = await page.evaluate(()=> {
    const parentElement = document.querySelector('.CodeMirror-code');
    if (!parentElement) return [];
    const pres = parentElement.querySelectorAll('pre');
    return Array.from(pres).map(pre=>pre.textContent).join('\n');
  });
  console.log(kata);
  // create kata.js with katas func
  const kataJsPath = `${dirPath}/kata.js`;
  fs.writeFile(kataJsPath, kata, (err) => {
    if (err) {
      console.error("An error occurred while writing the file:", err);
    } else {
      console.log("kata.js file created successfully!");
    }
  });

  //TODO: output row in mdTable kataNumber
  // |[Jaden Casing Strings](https://www.codewars.com/kata/5390bac347d09b7da40006f6/train/javascript)|7|JS|[path](./katas/jadenCasingStrings/)|[solution](./katas/jadenCasingStrings/kata.js)|
  // |[title](url)|kyu number|language|[path](path)|[solution](path/kata.js)|

  // new row in katas mdTable
  const kataRow= `|[${title}](${url})|${kyu}|js|[path](${dirPath})|[solution](${dirPath}/kata.js)|`;
  console.log(kataRow);

  // paste kataRow into mdTable
  /* 
  Для вставки новой строки в Markdown таблицу в файл, можно использовать встроенные методы модуля fs для чтения и записи файлов, а также манипуляции строками в Node.js. Вот пошаговое руководство, как это сделать:
  
Шаги:
Прочитать содержимое Markdown файла.
Найти строку с таблицей и добавить новую строку после разделителя.
Записать обновлённое содержимое обратно в файл.
Пример:
Создайте Markdown файл для тестирования:

Создайте файл example.md с содержимым:

markdown
Copy code
| Kata link|kyu|language|path|my solution|
|---|----|---|---|---|
[Temperature converter](https://www.codewars.com/kata/54ce9497975ca65e1a0008c6/train/javascript)|6|JS|[path](./katas/temperatureConverter/)|[solution](./katas/temperatureConverter/kata.js)|
[Chuck Norris VII - True or False? (Beginner)](https://www.codewars.com/kata/570669d8cb7293a2d1001473/train/javascript)|8|JS|[path](./katas/chuckNorrisViiTrueOrFalseBeginner/)|[solution](./katas/chuckNorrisViiTrueOrFalseBeginner/kata.js)|
Создайте файл insertRow.js со следующим содержимым:

javascript
Copy code
const fs = require('fs');
const path = require('path');

// Путь к Markdown файлу
const filePath = path.join(__dirname, 'example.md');

// Новая строка, которую нужно вставить
const newRow = `[New Kata](https://www.codewars.com/kata/1234567890/train/javascript)|5|JS|[path](./katas/newKata/)|[solution](./katas/newKata/kata.js)|`;

// Читаем содержимое файла
fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    return console.error('Ошибка чтения файла:', err);
  }

  // Разделяем содержимое на строки
  const lines = data.split('\n');

  // Находим индекс строки с разделителем таблицы
  const separatorIndex = lines.findIndex(line => line.trim() === '|---|----|---|---|---|');

  if (separatorIndex === -1) {
    return console.error('Разделитель таблицы не найден.');
  }

  // Вставляем новую строку после строки с разделителем
  lines.splice(separatorIndex + 1, 0, newRow);

  // Объединяем строки обратно в одно содержимое
  const updatedData = lines.join('\n');

  // Записываем обновлённое содержимое обратно в файл
  fs.writeFile(filePath, updatedData, 'utf8', (err) => {
    if (err) {
      return console.error('Ошибка записи файла:', err);
    }
    console.log('Новая строка успешно вставлена в таблицу.');
  });
});

  */

  console.log(title);
  console.log(titleCamelCase);

  await browser.close();
}
let url =
  "https://www.codewars.com/kata/58d5b39b1c0402c5f7002e0d/train/javascript";
run(url);
