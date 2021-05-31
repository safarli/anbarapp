<template>
  <v-app>
    <div
      style="width: 100%; height: 100%;"
      class="d-flex justify-center align-center teal lighten-4"
    >
      <v-card min-width="400px" max-width="600px" elevation="14" class="pa-4">
        <v-card-title>İstifadəçi Girişi</v-card-title>
        <v-card-subtitle
          >Sistemə daxil olmaq üçün aşağıdakı sahələri doldurun</v-card-subtitle
        >
        <v-card-text>
          <v-form>
            <v-text-field label="E-mail"></v-text-field>
            <v-text-field label="Şifrə" type="password"></v-text-field>
            <v-text-field label="CAPTCHA"></v-text-field>
            <v-btn dark color="teal darken-2">
                GİRİŞ
                <v-icon>mdi-login</v-icon>
            </v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </div>
  </v-app>
</template>



<script>
export default {
  data() {
    return {};
  },
};
</script>


<style scoped lang="scss">
</style>