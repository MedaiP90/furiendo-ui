<template>
  <v-dialog v-model="stayOpen" v-if="open" width="unset" persistent>
    <v-card>
      <v-card-title>{{ title }}</v-card-title>

      <v-card-text>
        <div v-html="message" />
      </v-card-text>

      <v-card-actions>
        <v-spacer />

        <v-btn v-on:click="btnNegative" text>Annulla</v-btn>
        <v-btn v-on:click="btnPositive" color="primary" text>Procedi</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "ConfirmDialog",

  props: {
    open: { type: Boolean, required: true },
  },

  data: () => ({
    stayOpen: true,
    title: "",
    message: "",
    btnPositive: () => {},
  }),

  methods: {
    btnNegative() {
      this.$emit("btn-negative");
    },
  },
};
</script>
