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

    <v-snackbar v-model="message" v-bind:color="mType" top>
      {{ mText }}

      <template v-slot:action="{ attrs }">
        <v-btn v-bind="attrs" v-on:click="message = false" icon>
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
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
    message: false,
    mType: undefined,
    mText: undefined,
  }),

  beforeMount() {
    this.$bus.$on("home", this.toggleHomeBtn);
    this.$bus.$on("message", this.createMessage);
  },

  beforeDestroy() {
    this.$bus.$off("home", this.toggleHomeBtn);
    this.$bus.$off("message", this.createMessage);
  },

  methods: {
    toggleHomeBtn(isHome) {
      this.isHome = isHome;
    },
    createMessage(messageDetails) {
      this.mType = messageDetails.type;
      this.mText = messageDetails.text;
      this.message = true;
    },
    goHome() {
      this.$router.replace({ name: "home" });
    },
  },
};
</script>
