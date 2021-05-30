<template>
  <div style="max-width: 500px" class="mx-auto">
    <h1>Mədaxil</h1>
    <v-form v-model="valid" ref="form">
      <v-select
        label="Məhsul"
        v-model="selectedMehsulID"
        :items="product.types"
        item-text="mehsultipi"
        item-value="mehsultipi_id"
        :menu-props="{ 'offset-y': true }"
        :rules="selectRules"
      ></v-select>

      <v-text-field
        label="Nömrə"
        v-model="mehsulNomre"
        type="number"
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

      <v-btn @click="submitData" dark rounded color="teal" class="mr-4"
        >ƏLAVƏ ET</v-btn
      >
    </v-form>

    <v-snackbar v-model="snackbar">
      {{ errmsg }}
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
  data() {
    return {
      snackbar: false,
      errmsg: "Error",
      product: {
        types: [],
        providers: [],
      },
      valid: true,
      values: [],
      date: "",
      menu_date: false,

      // Inputs to send to db
      selectedMehsulID: "",
      selectedSaticiID: "",
      selectedVahid: "",
      mehsulMiqdari: 0,

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
    updateItems() {
      setTimeout(() => {
        this.items.push(Math.round(Math.random() * 100));
        console.log("UPDATE CALLED");
      }, 300);
    },
    showMenu() {
      this.menuShow = true;
    },
    todayISO() {
      return new Date().toISOString().split("T")[0];
    },

    async submitData() {
      if (!this.$refs.form.validate()) return;
      const data = {
        mehsultipi_id: this.selectedMehsulID,
        satici_id: this.selectedSaticiID,
        vahid: this.selectedVahid,
        miqdar: this.mehsulMiqdari,
        tarix: this.date,
      };
      try {
        const resp = await axios.post(
          // "https://anbar.wavevo.com/anbarin/product",
          "http://localhost:9999/anbarin/product",
          data
        );
        console.log(resp);
      } catch (e) {
        this.snackbar = true;
        console.log(e.response.data);
        this.errmsg = e.response.data.message;
      }
    },

    async getProductTypes() {
      try {
        const { data } = await axios.get(
          "https://anbar.wavevo.com/anbarout/producttypes"
        );
        return data;
      } catch (e) {
        console.log(e);
      }
    },
    async getProviders() {
      try {
        const { data } = await axios.get(
          "https://anbar.wavevo.com/anbarout/providers"
        );
        return data;
      } catch (e) {
        console.log(e);
      }
    },
  },
  computed: {},

  async created() {
    this.product.types = await this.getProductTypes();
    this.product.providers = await this.getProviders();
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