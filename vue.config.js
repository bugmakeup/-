module.exports = {
  css: {
    loaderOptions: {
      // 给 less-loader 传递 Less.js 相关选项
      less: {
        javascriptEnabled: true, // 运行javascript链式调用的换行
      },
    },
  },
};
