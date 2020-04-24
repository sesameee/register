module.exports = {
  publicPath: "./",
  outputDir: "../flooring_page_static/static_landingpage/8_257/1",
  // outputDir: "dist",
  configureWebpack: {
    optimization: {
      splitChunks: false,
    }
  },
  pages: {
    register: {
      entry: "src/main.ts",
      template: "public/index.html",
      filename: "index.html",
    },
  },
  css: {
    sourceMap: false,
    loaderOptions: {
      scss: {
        prependData: `
        @import "~@/platform/8_257/template/main.scss";
        `,
      },
    },
  }
};
