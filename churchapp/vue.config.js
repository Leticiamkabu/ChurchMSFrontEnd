const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})

module.exports = {
  devServer: {
    historyApiFallback: true,
  },
};

module.exports = {
  publicPath: '/',
};