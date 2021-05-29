<template>
  <div style="max-width: 500px" class="mx-auto">
    <h1>Mədaxil</h1>
    <v-form v-model="valid" ref="form">
      <v-select
        label="Məhsul"
        v-model="selectedMehsul"
        :items="mehsulTipleri"
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
        label="Alındığı yer"
        v-model="alinmaYeriSelected"
        :items="alinmaYerleri"
        :rules="selectRules"
        :menu-props="{ 'offset-y': true }"
      >
      </v-select>

      <v-select
        v-model="vahidSelection"
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

      <v-btn dark rounded color="teal" class="mr-4"> ƏLAVƏ ET</v-btn>
    </v-form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      valid: true,
      mehsulTipleri: [],
      alinmaYerleri: [],
      values: [],
      date: "",
      menu_date: false,
      selectedVahid: "",
      mehsulVahidleri: [
        { itemText: "ƏDƏD", itemValue: "ED" },
        { itemText: "METR", itemValue: "MET" },
        { itemText: "KİLOGRAM", itemValue: "KG" },
      ],
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
    addToDB(){
      const data = {
        // data properties will be send to backend to be inserted database
      }
      axios.post("https://anbar.wavevo.com/anbarin/item", data)
      .then(result => console.log(result))
    }
  },
  computed: {},

  mounted: function () {
    axios
      .get("https://anbar.wavevo.com/anbarout/getproducttypes")
      .then((result) => {
        this.mehsulTipleri = result.data.map(item => {
          return item.mehsultipi;
        })
      });
    axios.get("https://anbar.wavevo.com/anbarout/getproviders")
    .then(result => {
      this.alinmaYerleri = result.data.map(item => {
        return item.satici_adi;
      })
    })

    this.date = this.todayISO();
    this.$refs.form.validate();

  },
};
</script>

<style lang="scss">
.gosterme {
  display: none;
}
</style>