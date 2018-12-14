const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack');
const imageminGifsicle = require('imagemin-gifsicle');
const imageminJpegtran = require('imagemin-jpegtran');
const imageminOptipng = require('imagemin-optipng');
const imageminSvgo = require('imagemin-svgo');
const StyleLintPlugin = require('stylelint-webpack-plugin');

const devMode = process.env.NODE_ENV !== 'production';

const config = {
	devtool: devMode ? 'inline-source-map' : 'eval',
	mode: devMode ? 'development' : 'production',
	entry: {
		main: './src/js/main.js'
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: devMode ? '[name].[chunkhash].js' : '[name].js',
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'babel-loader',
						options: {
							presets: ['@babel/preset-env']
						}
					},
					{
						loader: 'eslint-loader'
					}
				]
			},
			{
				test: /\.(sa|sc|c)ss$/,
				use: [
					devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
					{ loader: 'css-loader', options: { sourceMap: true } },
					{ loader: 'postcss-loader', options: { sourceMap: true } },
					{ loader: 'sass-loader', options: { sourceMap: true } }
				]
			},
			{
				test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
				use: [{
					loader: 'file-loader',
					options: {
						name: '[name].[ext]',
						outputPath: 'public/'
					}
				}]
			},
			{
				test: /\.(jpe?g|png|gif|svg)$/i,
				use: [{
					loader: 'file-loader',
					options: {
						name: '[name].[ext]',
						outputPath: 'public/'
					}
				}
			]}
		]
	},
	optimization: {
		minimizer: [],
	},	
	plugins: [
		new CleanWebpackPlugin('dist', {}),		
		new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery'
		}),
		new StyleLintPlugin({
			configFile: '.stylelintrc'
		}),
		new MiniCssExtractPlugin({
			filename: devMode ? '[name].[hash].css' : '[name].css',
			chunkFilename: devMode ? '[id].[hash].css' : '[id].css',
		}),
		new HtmlWebpackPlugin({
			title: 'Starter Template for Bootstrap',
			template: './src/index.html',
			filename: 'index.html',
			inject: false
		}),		
		new CopyWebpackPlugin([
			{ from: './src/public', to: 'public' }
		]),
		new ImageminPlugin({
			bail: false,
			cache: true,
			name: '[path][name].[ext]',
			imageminOptions: {
				plugins: [
					imageminGifsicle({
						interlaced: true
					}),
					imageminJpegtran({
						progressive: true
					}),
					imageminOptipng({
						optimizationLevel: 5
					}),
					imageminSvgo({
						removeViewBox: true
					})
				]
			}
		})
	]
};

if (! devMode) {
	const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
	const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

	config.optimization.minimizer.push(
		new UglifyJsPlugin({
			sourceMap: false,
		}),
		new OptimizeCSSAssetsPlugin({})
	);
}

module.exports = config;