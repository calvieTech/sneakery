const TerserPlugin = require("terser-webpack-plugin");
const { merge } = require("webpack-merge");
const common = require("./webpack.common.config");

module.exports = merge(common, {
	mode: "production",
	optimization: {
		minimize: true,
		minimizer: [
			new TerserPlugin({
				terserOptions: { format: { comments: false } },
				extractComments: false,
				
			}),
		],
		// splitChunks: {
		// 	chunks: "all",
		// },
	},
	performance: {
		assetFilter: function (assetFileName) {
			return assetFileName.endsWith(".js");
		},
	},
});
