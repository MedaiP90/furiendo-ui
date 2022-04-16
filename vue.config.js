const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  devServer: { proxy: "http://localhost:8080" },
  transpileDependencies: ["vuetify"],
  pwa: {
    name: "フリエンド - Amici di sushi",
    themeColor: "#EF6C00",
    msTileColor: "#EF6C00",
    appleMobileWebAppCapable: "yes",
    appleMobileWebAppStatusBarStyle: "white",

    // configure the workbox plugin
    workboxPluginMode: "GenerateSW",
  },
});
