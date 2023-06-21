import express from 'express';
import {
	getCoinByCode,
	getCoins,
	getTopCoin,
} from '../controllers/coinControllers';

const router = express.Router();

router.get('/list-coin', getCoins);
router.get('/list-coin-code', getCoinByCode);
router.get('/list-top-coin', getTopCoin);

module.exports = router;
