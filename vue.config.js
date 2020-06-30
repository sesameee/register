// eslint-disable-next-line @typescript-eslint/no-var-requires
const { argv } = require("yargs");
module.exports = {
  publicPath: "./",
  outputDir: `../flooring_page_static/special_site/jstatic/${argv.platform}/1`,
  //outputDir: `../flooring_page_static/special_site/242/1589660242`,
  // outputDir: "dist",
  configureWebpack: {
    optimization: {
      splitChunks: false,
    },
  },
  chainWebpack: (config) => {
    config.plugin("define").tap((options) => {
      options[0]["process.env"].PLATFORM = `"${argv.platform}"`;
      return options;
    });
    config.module
      .rule("images")
      .use("url-loader")
      .loader("url-loader")
      .tap((options) => {
        options.limit = -1;
        return options;
      });
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
        @import "~@/platform/${argv.platform}/template/main.scss";
        `,
      },
    },
  },
};
