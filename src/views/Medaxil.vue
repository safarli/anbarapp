<template>
  <div style="max-width: 500px" class="mx-auto">
    <h1>Mədaxil</h1>
    <v-form v-model="valid" ref="form">
      <v-combobox
        clearable
        label="Məhsul Tipi"
        v-model="selectedType"
        :items="productTypes"
        item-text="mehsultipi"
        :menu-props="{ 'offset-y': true }"
        :rules="selectRules"
      >
      </v-combobox>
      <!-- <v-select
        clearable
        label="Məhsul Tipi"
        v-model="selectedMehsulID"
        :items="product.types"
        item-text="mehsultipi"
        item-value="mehsultipi_id"
        :menu-props="{ 'offset-y': true }"
        :rules="selectRules"
      >
      </v-select> -->

      <v-text-field
        label="Nömrə"
        v-model="mehsulNomre"
        type="number"
        counter="4"
        :rules="nomreRules"
      >
      </v-text-field>

      <v-select
        label="Satıcılar"
        v-model="selectedSaticiID"
        :items="product.providers"
        item-text="satici_adi"
        item-value="satici_id"
        :rules="selectRules"
        :menu-props="{ 'offset-y': true }"
      >
      </v-select>

      <v-select
        v-model="selectedVahid"
        label="Məhsul vahidi"
        :items="mehsulVahidleri"
        item-text="itemText"
        item-value="itemValue"
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

      <!-- //! DATE PICKER START -->
      <v-menu
        v-model="menu_date"
        :close-on-content-click="false"
        transition="scale-transition"
        offset-y
        min-width="auto"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="date"
            label="Tarix seçin"
            prepend-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            v-on="on"
            :rules="dateRules"
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="date"
          @input="menu_date = false"
          no-title
          scrollable
        >
        </v-date-picker>
      </v-menu>
      <!-- //! DATE PICKER END -->

      <v-btn
        @click="submitData"
        :loading="btnLoading"
        :disabled="btnDisabled"
        color="amber lighten-3"
        class="mr-4"
        >ƏLAVƏ ET</v-btn
      >
      <v-btn @click="resetForm" color="green lighten-3" class="mr-4">
        <v-icon>mdi-reset</v-icon>
        SIFIRLA
      </v-btn>
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
import BASE_PATH from "@/variables/urls.js";

export default {
  data() {
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
      date: "",
      menu_date: false,

      // Inputs to send to db
      selectedType: "",
      selectedMehsulID: "",
      selectedSaticiID: "",
      selectedVahid: "",
      mehsulMiqdari: 0,
      mehsulNomre: 0,

      mehsulVahidleri: [
        { itemText: "ƏDƏD", itemValue: "ED" },
        { itemText: "METR", itemValue: "MET" },
        { itemText: "KİLOGRAM", itemValue: "KG" },
      ],
      // RULES
      miqdarRules: [
        (v) => !!v || "Miqdar tələb olunur",
        (v) => v.length > 5 || "Miqdar 5-dən kiçik olmamalıdır",
      ],
      selectRules: [(v) => !!v || "Seçim edin"],
      dateRules: [(v) => !!v || "Tarix seçin"],
      nomreRules: [(v) => v < 2000 || "2000-dən kiçik ədəd daxil edin"],
    };
  },

  methods: {
    showMenu() {
      this.menuShow = true;
    },
    todayISO() {
      return new Date().toISOString().split("T")[0];
    },
    resetForm() {
      this.$refs.form.reset();
    },

    async addProductType(selectedType) {
      const data = {
        selectedType,
      };
      try {
        return await axios.post(BASE_PATH + "/helpers/producttypes", data);
      } catch (e) {
        return console.log(e);
      }
    },

    async findProductTypeId(selectedType) {
      let foundId = null;
      const foundItem = this.product.types.find(
        (item) => item.mehsultipi === selectedType
      );
      if (foundItem) {
        foundId = foundItem.mehsultipi_id;
        return foundId;
      }
      try {
        await this.addProductType(selectedType);
        await this.getProductTypes();
        return await this.findProductTypeId(this.selectedType); // don't foreget put return keyword in front of data returning functions
      } catch (e) {
        console.log(e);
      }
    },

    async submitData() {
      if (!this.$refs.form.validate()) return;
      this.btnLoading = true;
      this.btnDisabled = true;

      const data = {
        mehsultipi_id: "",
        satici_id: this.selectedSaticiID,
        nomre: this.mehsulNomre,
        vahid: this.selectedVahid,
        miqdar: this.mehsulMiqdari,
        tarix: this.date,
      };

      try {
        data.mehsultipi_id = await this.findProductTypeId(this.selectedType);
        const resp = await axios.post(BASE_PATH + "/anbarin/product", data);
        console.log(resp);
        this.snackbar_text = resp.data;
        this.snackbar = true;
      } catch (e) {
        this.snackbar_text = e.response.data.message;
        this.snackbar = true;
        console.log(e.response.data);
      } finally {
        this.btnLoading = false;
        this.btnDisabled = false;
        console.log(data);
      }
    },

    async getProductTypes() {
      try {
        const { data } = await axios.get(BASE_PATH + "/helpers/producttypes");
        this.product.types = data;
        return data;
      } catch (e) {
        console.log(e);
      }
    },
    async getProviders() {
      try {
        const { data } = await axios.get(BASE_PATH + "/helpers/providers");
        this.product.providers = data;
        return data;
      } catch (e) {
        console.log(e);
      }
    },
  },
  computed: {
    productTypes() {
      return this.product.types.map((item) => item.mehsultipi);
    },
  },

  async created() {
    await this.getProductTypes();
    await this.getProviders();
  },

  mounted() {
    this.date = this.todayISO();
  },
};
</script>

<style lang="scss">
.gosterme {
  display: none;
}
</style>