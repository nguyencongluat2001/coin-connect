module.exports = {
	entry: ['babel-polyfill', 'src/app.js'],

	output: {
		filename: 'bundle.js',
	},

	module: {
		loaders: [{ test: /\.jsx?$/, loader: 'babel' }],
	},
};
