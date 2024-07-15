const parse = require('./modules/parse.js');
const kataDir = require('./modules/kataDir.js');
const updateTable = require('./modules/updateTable.js');

async function codewarsKata(url) {
  try {
    let kataInfo = await parse(url);
    await kataDir(kataInfo);
    await updateTable(kataInfo);
  } catch (error) {
    console.error("Error parsing the URL:", error);
    throw error;
  }
}

async function run() {
  const args = process.argv.slice(2);
  if (args.length === 0) {
    console.error("Please, insert URL");
    process.exit(1);
  }
  const url = args[0];

  try {
    await codewarsKata(url);
  } catch (error) {
    console.error("Error running codewarsKata:", error);
  }
}

run();
