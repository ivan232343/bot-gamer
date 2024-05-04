const fs = require('fs');
const path = require('path');
module.exports = {
  generateHtmlPage: (htmlFiles, doc) => {
    const listItems = htmlFiles.map(file => `
    <li style="display:flex;justify-content: space-around;">
    <a href="/get/${doc}/${file.split(".")[0]}">${file.split("-")[0]}-${file.split("-")[1]}</a>
    <p>${file.match(/(\d{2}-\d{2}-\d{4}_\d{2}--\d{2})/)[0]}</p>
    </li>`)
      .join('');
    return `
          <!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Historial de ticket</title>
            <link rel="stylesheet" href="/css/main.css">
          </head>
          <body>
            <h1>Historial de tickets de ${doc}</h1>
            <ul>${listItems}</ul>
          </body>
          </html>
        `;
  },
  getHtmlFiles: (folderPath) => {
    const files = fs.readdirSync(folderPath);
    return files.filter(file => path.extname(file) === '.html');
  }
}

