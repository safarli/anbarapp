<template>
  <div>
    <div class="d-flex flex-wrap justify-center align-center">
      <v-menu offset-y rounded="rounded" v-for="i in 6" :key="i">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="primary"
            outlined
            dark
            v-bind="attrs"
            v-on="on"
            class="ma-2"
          >
            Açılan Menyu
          </v-btn>
        </template>
        <v-card height="400" width="240"> </v-card>
      </v-menu>
    </div>

    <v-card class="d-flex justify-center flex-wrap">
      <v-btn class="ma-2" v-for="i in 8" :key="i" @click="snackbar = !snackbar">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-card>

    <v-card flat max-width="1160px" class="mx-auto my-4">
      <v-container>
        <v-row>
          <v-col v-for="i in 30" :key="i" cols="12" :sm="6" :md="4" :lg="3">
            <v-card>
              <v-card-title>Inventar Qaliq {{ i }} Rub</v-card-title>
              <v-card-text
                >Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum
                ex iure eius modi delectus. Repellendus inventore quia amet a
                odit beatae enim doloremque natus architecto, fuga illum omnis
                eveniet tempore.</v-card-text
              >
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-card>

    <v-snackbar v-model="snackbar">
      {{ snackbar_text }}
      <template v-slot:action="{ attrs }">
        <v-btn color="pink" text v-bind="attrs" @click="snackbar = false">
          Bağla
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      snackbar: false,
      snackbar_text: "Bildiris gonderilecek",

      items: [
        { title: "Texnokom" },
        { title: "Tib" },
        { title: "Salam" },
        { title: "Sagol" },
      ],
    };
  },
  computed: {},
};
</script>

<style scoped lang="scss">
</style>
