module.exports = {
  css: {
    loaderOptions: {
      stylus: {
        'resolve url': true,
        'import': [
          './src/theme'
        ]
      }
    }
  },
  pluginOptions: {
    'cube-ui': {
      postCompile: true,
      theme: true
    }
  },
  devServer: {
    port: 8080,  //端口,
    disableHostCheck: true  //这个是出现
  },
  configureWebpack: {
    performance: {
      hints: false
    }
  }
}
