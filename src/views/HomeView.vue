<template>
  <div class="d-flex flex-column align-center py-6" main-content>
    <v-card width="min(95ch, 95vw)">
      <v-card-text>
        <v-btn v-on:click="goToMenu(true)" color="primary" block>
          Avvia un ordine condiviso
        </v-btn>

        <div class="my-6 d-flex flex-row align-center">
          <v-divider />
          <span class="mx-4">oppure</span>
          <v-divider />
        </div>

        <h2 class="mb-4">Collegati a un ordine condiviso</h2>
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
import Requests from "../utils/requests";

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

      // Generate menu ID and open it

      Requests.createMenu(
        (res) => {
          this.menuId = res.data.menuId;

          this.$store.commit("setCreator", true);
          this.$router.replace({ path: `/menu/${this.menuId}` });
        },
        (err) => {
          if (process.env.NODE_ENV === "development") console.error(err);

          this.$bus.$emit("message", {
            type: "error",
            text: `Impossibile creare l'ordine: ${err}`,
          });
        }
      );
    },
  },
};
</script>
