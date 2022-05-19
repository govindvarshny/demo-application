const fs = require('fs');
const XLSX = require('xlsx');
const path = require('path');

const workbook = XLSX.readFile(path.resolve(__dirname, './TranslateApp.xlsx'));
const sheetname = workbook.SheetNames['0'];
var worksheet = workbook.Sheets[sheetname];
const translateJson = XLSX.utils.sheet_to_json(worksheet);
const langNames = ['en', 'vi'];
const langDict = langNames.map(() => ({}));

translateJson.map((item) => {
  for (let i = 0; i < langNames.length; i++) {
    langDict[i][item.Key] = item[langNames[i].toUpperCase()]
      ? item[langNames[i].toUpperCase()]
          .trim()
          .replace(/％/g, '%')
          .replace(/\\\\\\/g, '\\')
          .replace(/\\\\n/g, '\\n')
          .replace(/\\n/g, '\n')
      : langDict[0][item.Key];
    //console.log('###### langDict', langDict);
  }
});

for (let i = 0; i < langNames.length; i++) {
  fs.writeFileSync(
    path.resolve(path.join(__dirname, `${langNames[i]}.json`)),
    JSON.stringify(langDict[i], null, ' '),
  );
}
