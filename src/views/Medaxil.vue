<template>
  <div style="max-width: 500px" class="mx-auto">
    <h1>Mədaxil</h1>
    <form>
      <v-select
        label="Mehsul secin"
        dense
        outlined
        chips
        multiple
        :menu-props="{
          'offset-y': true,
          'max-width': 300,
          'content-class': 'yellow pa-2 gosterme',
        }"
        :items="items"
        v-model="values"
        @focus="showMenu"
        @keydown="updateItems"
      >
        <!-- <template v-slot:item="data">
          <v-list-item color="yellow">{{data.item}}</v-list-item>
        </template> -->
        <template v-slot:selection="data">
          <v-chip class="ma-1" color="amber darken-2" dark>{{
            data.item
          }}</v-chip>
        </template>
      </v-select>

      <v-btn rounded class="mr-4"> ƏLAVƏ ET</v-btn>
      <v-btn rounded> SİL </v-btn>
    </form>
    <v-autocomplete outlined multiple dense> </v-autocomplete>
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
.gosterme{
  display: none;
}
</style>