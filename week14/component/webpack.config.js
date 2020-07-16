module.exports = {
  entry: "./main.js",
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
            plugins: [["@babel/plugin-transform-react-jsx", {
              pragma: 'Vue.createElement'
            }]],
          },
        },
      },
    ],
  },
  mode: 'development',
  optimization: {
    minimize: false
  }
};