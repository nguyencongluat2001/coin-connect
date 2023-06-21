export const verify = (req, res, next) => {
	const { authorization } = req.headers;
	const token = authorization && authorization.split(' ')[1];
	if (!token) {
		return res.status(401).json({
			status: 401,
			error: 'Unauthorized',
		});
	}

	const key = process.env.SECRET_KEY;

	if (token !== key) {
		return res.status(401).json({
			status: 401,
			error: 'Unauthorized',
		});
	}

	next();
};
