module.exports = {
  publicPath: "./",
  outputDir: "../static_landingpage/7_205/1",
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
