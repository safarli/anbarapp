<template>
  <div>
    <v-card max-width="900" class="mx-auto">
      <v-card-title>Tənzimləmələr</v-card-title>
      <v-card-text>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat alias,
        hic, beatae minus sit rem fugiat illum, quod eligendi nisi temporibus
        consectetur provident magni quidem quae fugit. Odio, cumque voluptates.

        <v-switch v-model="switchMe">
          <template v-slot:label>
            Turn on the progress:
            <v-progress-circular
              :indeterminate="switchMe"
              :value="0"
              size="24"
              class="ml-2"
            >
            </v-progress-circular>
          </template>
        </v-switch>

        <v-switch
          dense
          inset
          color="teal"
          class="ma-0"
          v-for="i in 4"
          :key="i"
        ></v-switch>

        <v-select dense label="Standard" :items="items" style="width: 200px">
          <!-- <template v-slot:append-item>
         <v-btn>OK</v-btn>
         <v-btn>Cancel</v-btn>
         <div style="width: 500px; height: 200px;"></div>
       </template> -->
        </v-select>
      </v-card-text>
    </v-card>
  </div>
</template>

<script >
export default {
  data() {
    return {
      switchMe: false,
      items: ["salam", "sagol", "necesen"],
    };
  },
};
</script>

<style scoped lang="scss">
</style>
