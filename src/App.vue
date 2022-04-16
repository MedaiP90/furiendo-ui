<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center justify-center me-3" icon>
        <img src="./assets/nigiri.png" height="100%" width="auto" />
      </div>

      <div class="d-flex flex-column align-center">
        <h2 class="hero">フリエンド</h2>
        <div class="body-2 hero">Amici di sushi</div>
      </div>

      <v-spacer />

      <div>
        <v-btn v-if="!isHome" v-on:click="goHome" icon>
          <v-icon>mdi-home</v-icon>
        </v-btn>
      </div>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<style scoped>
div[icon] {
  height: 2.8em;
  width: 2.8em;
}

.hero {
  line-height: 1.2em;
}
</style>

<script>
export default {
  name: "App",

  data: () => ({
    isHome: true,
  }),

  beforeMount() {
    this.$bus.$on("home", this.toggleHomeBtn);
  },

  beforeDestroy() {
    this.$bus.$off("home", this.toggleHomeBtn);
  },

  methods: {
    toggleHomeBtn(isHome) {
      this.isHome = isHome;
    },
    goHome() {
      this.$router.replace({ name: "home" });
    },
  },
};
</script>
