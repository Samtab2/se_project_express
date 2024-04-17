const express = require('express');
const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/wtwr_db').then(() => {
    console.log('Connected to DB');
}).catch((e) => {
    console.error((e) => {
        console.error(e);
    });
});

const app = express();

const { PORT = 3001 } = process.env;

 console.log("testing");

app.listen(PORT, () => {
    console.log('Server is running on port ${PORT}');
});