const path = require('path')
const ETP = require('extract-text-webpack-plugin')

const publicDir = path.join(__dirname, '/public')
module.exports = [
  {
    entry: './src/index.js',
    output: {
      path: publicDir,
      publicPath: '/',
      filename: 'bundle.js'
    },
    module: {
      loaders: [{
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'env']
        },
      }],
    },
    resolve: {
      extensions: ['.js', '.jsx'],
    },
    devServer: {
      historyApiFallback: true,
      contentBase: publicDir
    },
  },
  {
    entry: {
      style: './stylesheets/index.scss',
    },
    output: {
      path: publicDir,
      publicPath: '/',
      filename: 'bundle.css',
    },
 		module: {
			loaders: [
				{
					test: /\.css$/,
					loader: ETP.extract({ fallback: 'style-loader', use: 'css-loader' }),
				},
				{
					test: /\.scss$/,
					loader: ETP.extract({ fallback: 'style-loader', use: 'css-loader!sass-loader' }),
				},
			],
		},
		plugins: [
			new ETP('bundle.css'),
		],
  },
]
