const common = require("./webpack.common.config");
const path = require("path");
const { merge } = require("webpack-merge");

module.exports = merge(common, {
	mode: "development",
	devtool: "inline-source-map",
	devServer: {
		static: path.resolve(__dirname, "dist"),
		port: 3000,
		open: true,
		hot: true,
		compress: true,
	},
});
