<template>
  <div></div>
</template>

<script>
export default {
  name: "MenuPage",

  data: () => ({
    menuId: "test",
  }),

  beforeMount() {
    this.$bus.$emit("home", false);

    this.menuId = this.$route.params.menuId;
  },
};
</script>
