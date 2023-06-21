import axios from 'axios';
import { Appconfig } from './appconfig';

const request = axios.create({
	baseURL: Appconfig.apiUrl,
	headers: {
		'Content-Type': 'application/json',
		Authorization: `Bearer ${Appconfig.tokenAPI}`,
	},
});

export const fetcher = (url, config) =>
	request(url, config)
		.then((res) => res.data)
		.catch((err) => {
			throw err;
		});

export const fetchConfigUrl = axios.create({
	headers: {
		'Content-Type': 'application/json',
		Authorization: `Bearer ${Appconfig.tokenAPI}`,
	},
});
