<template>
  <div class="d-flex flex-column align-center py-6" main-content>
    <v-card class="mb-6" width="min(95ch, 95vw)">
      <v-card-text>
        <v-btn v-on:click="copyMenuCode" color="primary" block>
          <v-icon class="me-3">mdi-share-variant</v-icon>
          Condividi l'ordine
        </v-btn>
      </v-card-text>
    </v-card>

    <v-card class="mb-6" width="min(95ch, 95vw)">
      <v-card-text>
        <div v-if="sent">
          {{
            creator
              ? 'Lista inviata, tu sei il creatore dell\'ordine: premi "Genera la lista di piatti" quando tutti sono pronti'
              : "Qui è tutto pronto, いただきます!"
          }}
        </div>
        <template v-else>
          <div class="caption">
            Inserisci i numeri dei piatti separati da virgole:
          </div>

          <v-textarea
            v-model="order"
            class="mb-4"
            placeholder="Lista di piatti"
            hide-details
            outlined
          />

          <v-btn
            v-bind:disabled="!validOrder"
            v-on:click="addToMenu"
            color="primary"
            block
          >
            Invia le tue scelte
          </v-btn>
        </template>
      </v-card-text>
    </v-card>

    <v-card v-if="creator || generated" width="min(95ch, 95vw)">
      <v-card-text>
        <v-btn v-if="!generated" v-on:click="generate" color="primary" block>
          Genera la lista di piatti
        </v-btn>
        <div v-else>
          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-center">Codice piatto</th>
                  <th class="text-center">Quantità</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(dish, index) in menu"
                  v-bind:key="dish.order"
                  v-bind:class="index % 2 === 0 ? 'red lighten-5' : ''"
                >
                  <td class="text-center">
                    <strong>
                      <h2>{{ dish.order }}</h2>
                    </strong>
                  </td>
                  <td class="text-center">
                    <strong>
                      <h2>{{ dish.count }}</h2>
                    </strong>
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
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
  name: "MenuPage",

  data: () => ({
    menuId: undefined,
    sent: false,
    generated: false,
    order: undefined,
    menu: [],
  }),

  computed: {
    creator() {
      return this.$store.getters.creator;
    },
    validOrder() {
      return !!this.order;
    },
  },

  beforeMount() {
    this.$bus.$emit("home", false);

    this.menuId = this.$route.params.menuId;
  },

  methods: {
    copyMenuCode() {
      const dummy = document.createElement("input");
      const text = window.location.href;

      document.body.appendChild(dummy);
      dummy.value = text;
      dummy.select();
      document.execCommand("copy");
      document.body.removeChild(dummy);

      this.$bus.$emit("message", {
        type: "success",
        text: "Il link all'ordine è stato copiato negli appunti :)",
      });
    },
    addToMenu() {
      const orders = this.order.split(",").map((item) => item.trim());

      Requests.addToMenu(
        this.menuId,
        orders,
        () => {
          this.sent = true;
        },
        (err) => {
          if (process.env.NODE_ENV === "development") console.error(err);

          this.$bus.$emit("message", {
            type: "error",
            text:
              err?.response?.status === 404
                ? "L'ordine è già stato chiuso"
                : `Impossibile inviare la lista: ${err}`,
          });
        }
      );
    },
    generate() {
      Requests.getMenu(
        this.menuId,
        (res) => {
          this.menu = res.data.menu;
          this.generated = true;

          this.$store.commit("setCreator", false);
        },
        (err) => {
          if (process.env.NODE_ENV === "development") console.error(err);

          this.$bus.$emit("message", {
            type: "error",
            text: `Impossibile generare la lista di piatti: ${err}`,
          });
        }
      );
    },
  },
};
</script>
