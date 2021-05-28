<template>
  <div style="max-width: 500px" class="mx-auto">
    <h1>Mədaxil</h1>
    <form>

      <v-text-field
        v-model="mehsul_adi"
        :rules="rules"
        counter="25"
        hint="This field uses counter prop"
        label="Mehsul adi"
      ></v-text-field>

      <v-text-field
      v-model="mehsul_sayi"
      :rules="rules"
      counter="25"
      hint="Doldur burani"
      label="Mehsul sayi"
      >

      </v-text-field>

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
.gosterme {
  display: none;
}
</style>