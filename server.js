const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

app.post('/scrape', async (req, res) => {
    const { url, selector } = req.body;

    try {
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);
        const data = [];
        $(selector).each((index, element) => {
            data.push($(element).text().trim());
        });
        res.json(data);
    } catch (error) {
        res.status(500).send('Error occurred while scraping');
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
