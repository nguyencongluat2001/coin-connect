import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { verify } from './middleware/verify';
require('babel-core/register');
require('babel-polyfill');

const app = express();
dotenv.config();

const server = require('http').Server(app);

app.use(express.json());
app.use(
	cors({
		credentials: 'same-origin',
	})
);

const coinRouters = require('./routes/coin');
const smsRouters = require('./routes/sms');

app.use('/api/', verify, smsRouters);
app.use('/api', verify, coinRouters);

const port = process.env.PORT || 8000;
server.listen(port, () => {
	console.log(`Server is running on port : ${port}`);
});
