const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const Dotenv = require("dotenv-webpack");
const TerserPlugin = require("terser-webpack-plugin");
// const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { merge } = require("webpack-merge");

const config = {
	entry: {
		index: "./src/index.js",
	},
	mode: "production",
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				use: "babel-loader",
				exclude: /node_modules/,
			},
			{
				test: /\.css$/,
				use: ["style-loader", "css-loader"],
				exclude: /\.module\.css$/,
			},
			{
				test: /\.css$/,
				use: [
					"style-loader",
					{
						loader: "css-loader",
						options: {
							importLoaders: 1,
							modules: true,
						},
					},
				],
				include: /\.module\.css$/i,
			},
			{ test: /\.ext$/, use: ["cache-loader", ...loaders], include: path.resolve("src") },
			{
				test: /\.(png|svg|jpg|jpeg|gif)/,
				type: "asset/resource",
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: "./public/index.html",
		}),
		// new MiniCssExtractPlugin({
		// 	filename: "[name].css",
		// }),
		new Dotenv({ systemvars: true }),
		new webpack.LoaderOptionsPlugin({
			minimize: true,
		}),
	],
	optimization: {
		minimize: true,
		minimizer: [
			new TerserPlugin({
				test: /\.js(\?.*)?$/i,
			}),
		],
	},
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "[name].bundle.js",
		assetModuleFilename: "images/[name].[ext]",
		clean: true,
	},
};

module.exports = config;
