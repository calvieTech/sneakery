const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const Dotenv = require("dotenv-webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const devMode = process.env.NODE_ENV === "development";

module.exports = {
	entry: { bundle: path.resolve(__dirname, "./src/index.js") },
	mode: "development",
	module: {
		rules: [
			{
				test: /\.js$/,
				include: path.resolve(__dirname, "src"),
				use: {
					loader: "babel-loader",
					options: {
						presets: [
							[
								"@babel/preset-react",
								{
									runtime: "automatic",
								},
							],
						],
					},
				},
				exclude: /node_modules/,
			},
			{
				test: /\.css$/,
				use: [devMode ? "style-loader" : MiniCssExtractPlugin.loader, "css-loader"],
				exclude: /\.module\.css$/,
			},
			{
				test: /\.(png|svg|jpg|jpeg|gif)$/i,
				type: "asset/resource",
			},
		],
	},

	plugins: [
		new HtmlWebpackPlugin({
			template: "./public/index.html",
			title: "Caching",
		}),
		new Dotenv({ systemvars: true }),
		new MiniCssExtractPlugin(),
	],
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "[name]_[contenthash].js",
		assetModuleFilename: "images/[name][ext]",
		clean: true,
		pathinfo: false,
	},
};
