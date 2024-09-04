// webpack.config.js
module.exports = {
    module: {
      rules: [
        {
          test: /\.js$/,
          enforce: 'pre',
          use: ['source-map-loader'],
          exclude: [
            /node_modules\/p4-css/,
            /node_modules\/react-embed/,
            /node_modules\/stylis-plugin-rtl/,
          ],
        },
      ],
    },
  };
  