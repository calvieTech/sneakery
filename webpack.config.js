const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const config = {
	entry: "./src/index.js",
	mode: "development",
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
	devServer: {
		static: "./",
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: "./public/index.html",
		}),
	],
	// plugins: [
	// 	new HtmlWebpackPlugin({
	// 		templateContent: ({ htmlWebpackPlugin }) =>
	// 			'<!DOCTYPE html><html><head><meta charset="utf-8"><title>' +
	// 			htmlWebpackPlugin.options.title +
	// 			'</title></head><body><div id="app"></div><div id="drawer-hook"></div></body></html>',
	// 		filename: "index.html",
	// 	}),
	// ],
};

module.exports = config;
