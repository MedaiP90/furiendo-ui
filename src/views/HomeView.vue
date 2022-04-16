<template>
  <div class="d-flex align-center justify-center" main-content>
    <v-card width="min(95ch, 95vw)">
      <v-card-text>
        <v-btn v-on:click="goToMenu(true)" color="primary" block>
          Avvia un menu condiviso
        </v-btn>

        <div class="my-6 d-flex flex-row align-center">
          <v-divider />
          <span class="mx-4">oppure</span>
          <v-divider />
        </div>

        <h2 class="mb-4">Collegati a un menu condiviso</h2>
        <div class="d-flex flex-row align-center">
          <v-text-field
            v-model="menuId"
            placeholder="Numero del menu"
            clearable
            dense
            hide-details
            outlined
          />
          <v-btn
            v-bind:disabled="!validId"
            v-on:click="goToMenu(false)"
            color="primary"
            text
          >
            Collegati
          </v-btn>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<style scoped>
div[main-content] {
  position: absolute;
  inset: 0;
}
</style>

<script>
export default {
  name: "HomePage",

  data: () => ({
    menuId: undefined,
  }),

  computed: {
    validId() {
      return !!this.menuId;
    },
  },

  beforeMount() {
    this.$bus.$emit("home", true);
  },

  methods: {
    goToMenu(create) {
      if (!create) {
        this.$router.replace({ path: `/menu/${this.menuId}` });

        return;
      }

      this.$store.commit("setCreator", true);

      // TODO: Generate menu ID and open it
    },
  },
};
</script>
