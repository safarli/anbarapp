<template>
  <div style="max-width: 500px" class="mx-auto">
    <h1>Mədaxil</h1>
    <form>
      <v-select
        outlined
        chips
        multiple
        :items="items"
        v-model="values"
        @focus="showMenu"
        @keydown="updateItems"
      >
      </v-select>

      <v-btn rounded class="mr-4"> ƏLAVƏ ET</v-btn>
      <v-btn rounded> SİL </v-btn>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: ["samsung", "huawei", "apple", "xiaomi", "nokia", "htc", "sony"],
      values: [],
    };
  },

  methods: {
    updateItems() {
      setTimeout(() => {
        this.items.push(Math.round(Math.random() * 100));
        console.log("UPDATE CALLED");
      }, 300);
    },
    showMenu() {
      this.menuShow = true;
    },
  },
  computed: {},
};
</script>

<style lang="scss">
</style>