/**
 * State Event Object
 * @description Notifies observers on state change events.
 *
 * @author: [Kesi](mailto:keschat{@}r3technica.co.za)
 * @version 1.0.0
 * 
 * @example
 * // Get a state object.
 * let state = {data: "Hello World"}
 * // Get a StateEvent instance.
 * let notifier = Observer(state)
 * or inittialize without state:
 * let notifier = Observer()
 * and inittialize state afterwards:
 * notifier.initState(state);
 * // Step 2. Set Listeners 
 * notifier.setListener((value) => console.log(value))
 * // Step 3. Update the state
 * notifier.setState(newState)
 * 
 * @param {object | primitive} [state] - The state object or value to be observed for changes
 */
/******************************************************************/

const axios = require('axios');
const cors = require('cors');
const cookieParser = require('cookie-parser');
import express from 'express';
const logger = require('morgan');
const multer = require('multer');
const path = require('path');
import rateLimit from 'express-rate-limit';
const upload = multer(); // for parsing multipart/form-data

/******************************************************************/

// import { connectDB } from './config/db';
import apiRouter from './routes/api';
import indexRouter from './routes/index';

/******************************************************************/

// connectDB();
const app = express();

const apiLimiter = rateLimit({
	windowMs: 30 * 60 * 1000, // 15 minutes <- kick off time
	max: 30, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	message: 'Too many requests from this IP, please try again after 30mins',
	standardHeaders: true
});

/******************************************************************/

app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger('tiny'));
app.use(express.static(path.join(__dirname, '../public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

/******************************************************************/

// app.use('/api', apiLimiter);
app.set('trust proxy', 1);
app.use('/api', apiRouter);
app.use('/', indexRouter);
// Because we are using the /api endpoint, our complete endpoint 
// becomes http://localhost:3333/api/short. Here’s an example.

/******************************************************************/

module.exports = app;

/******************************************************************/