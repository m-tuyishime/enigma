// starts the server on port 3000 and links to index.html

const express = require('express');
const app = express();
const path = require('path');
const port = 3000;

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
}
);

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
});
