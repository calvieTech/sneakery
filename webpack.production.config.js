const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const Dotenv = require("dotenv-webpack");
const TerserPlugin = require("terser-webpack-plugin");

const config = {
	entry: "./src/index.js",
	mode: "production",
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "bundle.js",
		assetModuleFilename: "images/[name][ext]",
		clean: true,
	},
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
			{
				test: /\.(png|svg|jpg|jpeg|gif)/,
				type: "asset/resource",
			},
		],
	},
	optimization: {
		minimize: true,
		minimizer: [new TerserPlugin()],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: "./public/index.html",
		}),
		new Dotenv({ systemvars: true }),
	],
};

module.exports = config;
