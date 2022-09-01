const { defineConfig } = require("@vue/cli-service");

process.env.VUE_APP_VERSION = require("./package.json").version || "0.0.0";

module.exports = defineConfig({
  // devServer: { proxy: "http://localhost:8080" },
  devServer: {
    proxy: "https://furiendo.netlify.app/.netlify/functions/server/",
  },
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
