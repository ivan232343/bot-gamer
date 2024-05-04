
// AREA SERVER LOADER
const express = require('express');
const { generateHtmlPage, getHtmlFiles } = require('../modules/resume');
const path = require('path')

const app = express()
const port = 3001
// app.set('port', (process.env.PORT || 5000));
// app.use(express.static(__dirname + '/public'));
app.use('/css', express.static("/app/css"))
// app.set('views', __dirname + '/app/views');
// app.engine('html', require('ejs').renderFile);
// app.set('view engine', 'html');
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
app.get('/get/:doc/:archivename', (req, res) => {
    const documento = req.params.doc;
    const archivo = req.params.archivename
    // const { archivo } = req.query;

    // res.status(404).send("Sorry can't find that!")
    res.sendFile(`${documento}/${archivo}.html`, { root: path.join(__dirname, "../src/generate/chats") });
});

app.get('/resume/:doc/', (req, res) => {
    const documento = req.params.doc
    const folderPath = 'src/generate/chats/' + documento;
    const htmlFiles = getHtmlFiles(folderPath);

    // res.status(404).send("Sorry can't find that!")
    res.send(generateHtmlPage(htmlFiles, documento));
});
app.get('/redirect/tel/', (req, res) => {
    res.redirect("tel:+51017073000")
})
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(404).send("Sorry can't find that!")
    res.status(500).send('Something broke!')
})
// ------------