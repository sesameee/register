module.exports = {
  publicPath: "./",
  outputDir: "../flooring_page_static/static_landingpage/7_205/2",
  // outputDir: "dist",
  configureWebpack: {
    optimization: {
      splitChunks: false,
    },
  },
  pages: {
    register: {
      entry: "src/main.ts",
      template: "public/index.html",
      filename: "index.html",
    },
  },
};
