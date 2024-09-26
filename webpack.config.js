const path = require('path'),
	webpack = require('webpack'),
	CopyPlugin = require('copy-webpack-plugin'),
	TerserPlugin = require("terser-webpack-plugin");


module.exports = {
	entry: {
		"htmlcompare": './lib/cjs/index.js',
		"htmlcompare.min": './lib/cjs/index.js',
	},
	output: {
		//path: "./dist",
		path: path.resolve(__dirname, 'dist'),
		filename: "[name].js",
		libraryTarget: 'umd',
		library: 'HtmlCompare',
		umdNamedDefine: true
	},
	mode: 'production',
	externals: {
		//"./lib/jszip.min.js": "JSZip"
	},
	resolve: {
		aliasFields: [],
		fallback: {

		},
	},
	plugins: [
		new webpack.NormalModuleReplacementPlugin(/^node:/, (resource) => {
			resource.request = resource.request.replace(/^node:/, "");
		}),
	],
	optimization: {
		minimize: true,
		minimizer: [new TerserPlugin({
			include: /\.min\.js$/,
			//parallel: true,
		})],
	},
	cache: false
};
/*
module.exports =

{
	entry: {
		'htmldiff': './src/index.ts',
		'htmldiff.min': './src/index.ts'
	},
	output: {
		path: path.resolve(__dirname, '_bundles'),
		filename: '[name].js',
		libraryTarget: 'umd',
		library: 'HtmlDiff',
		umdNamedDefine: true
	},
	resolve: {
		extensions: ['.ts', '.tsx', '.js']
	},
	devtool: 'source-map',
	
	module: {
		rules: [{
			test: /\.tsx?$/,
			loader: 'ts-loader',
			exclude: /node_modules/,
		}],
	},
}
*/
