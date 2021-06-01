
<template>
  <div style="max-width: 500px" class="mx-auto">
    <h1>Məxaric</h1>
    <v-form v-model="valid" ref="form">
      <v-select
        label="Məhsul"
        v-model="selectedMehsulID"
        :items="product.types"
        item-text="mehsultipi"
        item-value="mehsul_id"
        :menu-props="{ 'offset-y': true }"
        :rules="selectRules"
      ></v-select>

      <v-text-field
        label="Məhsul miqdarı"
        v-model="mehsulMiqdari"
        :rules="selectRules"
        type="number"
        counter="8"
      ></v-text-field>

      <v-btn @click="submitData" :loading="btnLoading" :disabled="btnDisabled" dark rounded color="teal" class="mr-4"
        >Məxaric Et</v-btn
      >
    </v-form>

    <v-snackbar v-model="snackbar">
      {{ snackbar_text }}
      <template v-slot:action="{ attrs }">
        <v-btn color="pink" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      btnLoading: false,
      btnDisabled: false,
      snackbar: false,
      snackbar_text: "Error",
      product: {
        types: [],
        providers: [],
      },
      valid: true,
      values: [],
      // Inputs to send to db
      selectedMehsulID: "",
      mehsulMiqdari: 0,
      // RULES
      miqdarRules: [
        (v) => !!v || "Miqdar tələb olunur",
        (v) => v.length > 5 || "Miqdar 5-dən kiçik olmamalıdır",
      ],
      selectRules: [(v) => !!v || "Seçim edin"],
    };
  },

  methods: {
    showMenu() {
      this.menuShow = true;
    },

    async submitData() {
      if (!this.$refs.form.validate()) return;
      this.btnLoading = true;
      this.btnDisabled = true;
      const data = {
        mehsul_id: this.selectedMehsulID,
        miqdar: this.mehsulMiqdari,
      };
      try {
        const resp = await axios.post(
          "https://anbar.wavevo.com/anbarout/product",
          data
        );
        console.log(resp);
        this.snackbar_text = resp.data
        this.snackbar = true;
      } catch (e) {
        this.snackbar_text = e.response.data.message;
        this.snackbar = true;
        console.log(e.response.data);
      }
      finally{
        this.btnLoading = false;
        this.btnDisabled = false;
      }
    },

    async getProducts() {
      try {
        const { data } = await axios.get(
          "https://anbar.wavevo.com/reports/products"
        );
        return data;
      } catch (e) {
        console.log(e);
      }
    },
  },
  computed: {},

  async created() {
    this.product.types = await this.getProducts();
  },

  mounted() {
  },
};
</script>

<style lang="scss">
.gosterme {
  display: none;
}
</style>