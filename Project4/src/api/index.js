const express = require('express');
const app = express();

app.get('/test', (req, res) => {
    res.json('Test endpoint is working!');
    });

    app.listen(4000);