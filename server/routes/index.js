if (process.env.NODE_ENV !== 'production') {
    let dot = require('dotenv').config();
}

import express from 'express';
const indexRouter = express.Router();

indexRouter.use('/', express.static('public'));

indexRouter.all('/', (req, res) => {
    res.render('index', {});
});

indexRouter.all('*', (req, res) => {
    res.send('<h1>Error: Resource not found!</h1>');
});

export default indexRouter;