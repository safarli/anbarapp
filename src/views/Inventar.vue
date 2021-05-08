<template>
  <div>
    <v-toolbar class="mb-4">
      <v-btn @click="refreshData()">Refresh Data</v-btn>

      <v-dialog v-model="dialog_query" persistent max-width="400px">
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="primary" dark v-bind="attrs" v-on="on">Query</v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">User Profile</span>
          </v-card-title>
          <v-card-text>
            <v-menu
              ref="menu"
              v-model="menu"
              :close-on-content-click="false"
              :return-value.sync="date"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  style="width: 150px"
                  v-model="date"
                  label="Picker in menu"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="date" no-title scrollable>
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="menu = false">
                  Cancel
                </v-btn>
                <v-btn text color="primary" @click="$refs.menu.save(date)">
                  OK
                </v-btn>
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
      >
        <template v-slot:top>
          <v-text-field
            v-model="search"
            label="Search.."
            class="mx-4"
          ></v-text-field>
        </template>

        <template v-slot:item.actions="{ item }">
          <v-icon small class="mr-2" @click="editItem(item)"> pencil </v-icon>
          <v-icon small @click="deleteItem(item)"> delete </v-icon>
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
import axios from 'axios'

export default {
  data () {
    return {
      dialog_query: false,
      search: '',

      page: 1,
      pageCount: 0,
      itemsPerPage: 10,

      headers: [
        { text: 'Id', value: 'id' },
        { text: 'Ad', value: 'ad' },
        { text: 'Vahid', value: 'vahid', filterable: false },
        { text: 'Miqdar', value: 'miqdar', filterable: false },
        { text: 'Tarix', value: 'anbar_tarix', filterable: true },
        {
          text: 'Əməliyyat',
          value: 'action',
          filterable: false,
          sortable: false
        }
      ],
      tabledata: []
    }
  },

  methods: {
    refreshData () {
      axios.get('http://localhost:9999/anbarout/getall').then((result) => {
        this.tabledata = result.data
      })
    }
  },

  created () {
    axios.get('http://localhost:9999/anbarout/getall').then((result) => {
      this.tabledata = result.data
      console.log(result.data)
    })
  }
}
</script>

<style scoped lang="scss">
</style>
