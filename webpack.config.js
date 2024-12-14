const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  // Entry point
  entry: './js/main.js', // Update this to match your entry file
  output: {
    path: path.resolve(__dirname, 'dist'), // Output directory
    filename: 'js/bundle.js', // Bundled JS file
  },
  module: {
    rules: [
      // Process CSS files
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'], // Loads and injects CSS
      },
      // Process images
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: 'asset/resource', // Outputs images to the `dist` folder
        generator: {
          filename: 'assets/images/[name][ext]', // Output directory for images
        },
      },
      // Babel for JavaScript (optional for ES6+)
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'], // Transpile ES6+ to ES5
          },
        },
      },
    ],
  },
  plugins: [
    // Generate HTML and inject assets
    new HtmlWebpackPlugin({
      template: './index.html', // Source HTML
      inject: 'body', // Inject scripts at the end of the body
    }),
    // Copy static files like standalone JS or other assets
    new CopyWebpackPlugin({
      patterns: [
        { from: 'js/visual-effects.js', to: 'js/' }, // Copy visual-effects.js
        { from: 'js/services-config.js', to: 'js/' }, // Copy services-config.js
        { from: 'css/styles.css', to: 'css/' }, // Copy styles.css
      ],
    }),
  ],
  // Development options
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'dist'), // Serve from `dist/`
    },
    port: 8080, // Local server port
    open: true, // Automatically open browser
    hot: true, // Enable hot module replacement
    compress: true, // Enable gzip compression
  },
  // Enable source maps for debugging
  devtool: 'source-map',
  mode: 'production', // Change to 'development' for easier debugging
};

