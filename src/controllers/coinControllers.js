import axios from 'axios';
import { Appconfig } from '../appconfig';
import { fetchConfigUrl, fetcher } from '../service';

function getDateByDays(days) {
	const today = new Date();
	const sevenDaysAgo = new Date(
		today.getTime() - Number(days) * 24 * 60 * 60 * 1000
	);

	return formatDate(sevenDaysAgo);
}

function getDayAgo(days) {
	const today = new Date();
	const sevenDaysAgo = new Date(
		today.getTime() - Number(days) * 24 * 60 * 60 * 1000
	);

	return formatDate(sevenDaysAgo);
}

function getMonthAgo(months) {
	const today = new Date();
	const sevenDaysAgo = new Date(
		today.getTime() - Number(months) * 30 * 24 * 60 * 60 * 1000
	);

	return formatDate(sevenDaysAgo);
}

function getYearAgo(years) {
	const today = new Date();
	const sevenDaysAgo = new Date(
		today.getTime() - Number(years) * 365 * 24 * 60 * 60 * 1000
	);

	return formatDate(sevenDaysAgo);
}

function formatDate(date) {
	const year = date.getFullYear();
	const month = ('0' + (date.getMonth() + 1)).slice(-2);
	const day = ('0' + date.getDate()).slice(-2);
	return year + '/' + month + '/' + day;
}

export const getCoinByCode = async (req, res) => {
	let { code, startDate, endDate, limit, dayAgo, monthAgo, yearAgo } = req.body;

	if (!code) return res.status(400).json({ message: 'code is required' });

	if (!limit) {
		limit = 1000;
	}

	if (!startDate) {
		startDate = getDateByDays(7);
	}

	if (!endDate) {
		endDate = getDateByDays(0);
	}

	if (dayAgo) {
		startDate = getDayAgo(dayAgo);
	}

	if (monthAgo) {
		startDate = getMonthAgo(monthAgo);
	}

	if (yearAgo) {
		startDate = getYearAgo(yearAgo);
	}

	startDate = formatDate(new Date(startDate));
	endDate = formatDate(new Date(endDate));

	if (startDate > endDate)
		return res
			.status(400)
			.json({ message: 'startDate must be less than endDate' });

	fetcher(
		`/symbols/${code}/historical-quotes?startDate=${startDate}&endDate=${endDate}&offset=0&limit=${limit}`
	)
		.then((data) => res.status(200).json(data))
		.catch((error) => res.status(500).json(error));
};

export const getTopCoin = (req, res) => {
	fetchConfigUrl
		.get(Appconfig.apiUrlTopCoin)
		.then((response) => res.status(200).json(response.data))
		.catch((error) => res.status(500).json(error));
};

export const getCoins = async (req, res) => {
	try {
		const coins = await fetchDataCode();
		res.status(200).json(coins);
	} catch (error) {
		res.status(500).json(error);
	}
};

async function fetchDataCode() {
	const headers = {
		'content-type': 'application/json',
	};

	const data = {
		query: `query {
            VN100 {
              stocks(take: 3000) {
                items {
                  symbol
                  buyPrice3
                  buyVolume3
                  buyPrice2
                  buyVolume2
                  buyPrice1
                  buyVolume1
                  change
                  currentPrice
                  currentVolume
                  totalVolume
                  sellPrice3
                  sellVolume3
                  sellPrice2
                  sellVolume2
                  sellPrice1
                  sellVolume1
                  highPrice
                  lowPrice
                  foreignBuyVolume
                  foreignSellVolume
                  floorPrice
                  ceilPrice
                  referencePrice
                  foreignBuyValue
                  foreignSellValue
                }
              }
            }
          }`,
	};

	return axios
		.post(Appconfig.apiUrlListCoin, data, { headers })
		.then((response) => {
			return response.data.data.VN100.stocks.items;
		});
}
