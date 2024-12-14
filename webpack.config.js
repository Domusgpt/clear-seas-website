const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: './js/main.js', // Entry point for your app
  output: {
    path: path.resolve(__dirname, 'dist'), // Output directory
    filename: 'bundle.js', // Output JavaScript file
  },
  mode: 'production', // Use 'development' for local testing
  module: {
    rules: [
      {
        test: /\.css$/i, // Match all CSS files
        use: ['style-loader', 'css-loader'], // Process and inject CSS
      },
      {
        test: /\.js$/, // Match all JavaScript files
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader', // Transpile JavaScript
          options: {
            presets: ['@babel/preset-env'], // Modern JavaScript compatibility
          },
        },
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(), // Cleans the output directory before each build
    new HtmlWebpackPlugin({
      template: './index.html', // Use your `index.html` as a template
    }),
  ],
  devServer: {
    static: path.join(__dirname, 'dist'), // Serve files from `dist/`
    port: 3000, // Local server runs on port 3000
    hot: true, // Enable Hot Module Replacement
  },
};
