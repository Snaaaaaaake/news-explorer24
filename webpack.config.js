const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); 
const webpack = require('webpack');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const isDev = process.env.NODE_ENV === 'development';

module.exports = {
  entry: { 
	main: './src/js/main.js', 
	favorites: './src/js/favorites.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: './[name]/[name].[chunkhash].js',
  },
  devServer: {
    contentBase: path.join(__dirname, '/dist/')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/i,
		use: [
         (isDev ? { loader: 'style-loader' } : { loader: MiniCssExtractPlugin.loader, options: { publicPath: '../' } }),
         'css-loader', 
         'postcss-loader'
		]
      },
	  {
		test: /\.(eot|ttf|woff|woff2)$/,
		loader: 'file-loader?name=./vendor/[name].[ext]'
	  },
	  {
		test: /\.(png|jpg|gif|ico|svg)$/,
		use: [
			isDev ? 'file-loader?name=./images/[name].[ext]' : 'file-loader?name=./images/[name].[ext]',
			{
				loader: 'image-webpack-loader',
				options: {}
			}
		]
	  }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({ // 
      filename: '[name]/[name].[contenthash].css',
    }),
	new OptimizeCssAssetsPlugin({
     assetNameRegExp: /\.css$/g,
     cssProcessor: require('cssnano'),
     cssProcessorPluginOptions: {
             preset: ['default'],
     },
     canPrint: true
	}),
    new HtmlWebpackPlugin({
      inject: false,
      template: './src/main.html',
      filename: 'index.html'
    }),
	new HtmlWebpackPlugin({
      inject: false,
      template: './src/favorites.html',
      filename: 'favorites/index.html'
    }),
    new WebpackMd5Hash(),
	new webpack.DefinePlugin({
     'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
	})
  ]
};