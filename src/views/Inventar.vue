<template>
  <div>
    <v-toolbar class="mb-4">
      <v-btn 
      @click="refreshDataDelayed()" 
      :disabled="btnDisabled"
       :loading="btnLoading"
      color="amber lighten-3"
      >
      <v-icon>mdi-refresh</v-icon>
      YENİLƏ
      </v-btn>

      <v-dialog v-model="dialog_query" persistent max-width="400px">
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="primary" dark v-bind="attrs" v-on="on">SORĞU</v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">Tarix intervali</span>
          </v-card-title>
          <v-card-text>
            <v-menu
              ref="menu"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  style="max-width: 300px"
                  label="Baslangic tarixi"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker no-title scrollable>
                <v-spacer></v-spacer>
                <v-btn text color="primary"> Cancel </v-btn>
                <v-btn text color="primary"> OK </v-btn>
              </v-date-picker>
            </v-menu>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="dialog_query = false">
              Close
            </v-btn>
            <v-btn color="blue darken-1" text @click="dialog_query = false">
              Save
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-toolbar>

    <div class="pa-4 mx-auto mb-4" style="max-width: 1100px">
      <v-data-table
        :headers="headers"
        hide-default-footer
        :items="tabledata"
        :page.sync="page"
        :items-per-page="itemsPerPage"
        @page-count="pageCount = $event"
        class="elevation-1 xs"
        :search="search"
        :loading="loadingvariable"
        loading-text="Yüklənir zəhmət olmazsa gözləyin"
      >
        <template v-slot:top>
          <v-text-field
            v-model="search"
            label="Axtar.."
            class="mx-4"
          ></v-text-field>
        </template>

        <template v-slot:item.actions="{ item }">
          <v-icon class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
          <v-icon @click="deleteItem(item)">mdi-delete</v-icon>
        </template>
      </v-data-table>
    </div>

    <v-pagination
      color="teal lighten-3"
      v-model="page"
      :length="pageCount"
    ></v-pagination>
  </div>
</template>

<script>
import axios from "axios";
import BASE_PATH from '@/variables/urls.js'

export default {
  data() {
    return {
      btnDisabled: false,
      btnLoading: false,
      tabledata: [],
      loadingvariable: false,
      dialog_query: false,
      search: "",

      page: 1,
      pageCount: 0,
      itemsPerPage: 10,

      headers: [
        { text: "Ad", value: "mehsultipi" },
        { text: "Satıcı", value: "satici_adi" },
        { text: "Nömrə", value: "nomre" },
        { text: "Vahid", value: "mehsul_vahidi", filterable: false },
        { text: "Miqdar", value: "mehsul_miqdar", filterable: false },
        { text: "Tarix", value: "anbar_tarix", filterable: true },
        {
          text: "Əməliyyat",
          filterable: false,
          sortable: false,
        },
      ],
    };
  },

  methods: {
    refreshDataDelayed() {
      this.btnDisabled = true;
      this.btnLoading = true;
      this.loadingvariable = true;
      setTimeout(() => {
        axios
          .get(BASE_PATH+"/reports/products")
          .then((result) => {
            this.tabledata = result.data;
            this.loadingvariable = false;
            this.btnLoading =  false;
            this.btnDisabled = false;
          });
      }, 500);
    },

    editItem(item) {
      return item;
    },
    deleteItem(item) {
      return item;
    },
  },

  created() {
    this.refreshDataDelayed();
  },
};
</script>

<style scoped lang="scss">
</style>
