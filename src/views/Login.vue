<template>
  <v-app>
    <div
      style="width: 100%; height: 100%"
      class="d-flex justify-center align-center teal lighten-4"
    >
      <v-card max-width="600px" elevation="14" class="pa-4">
        <v-card-title>İstifadəçi Girişi</v-card-title>
        <v-card-subtitle
          >Sistemə daxil olmaq üçün aşağıdakı sahələri doldurun</v-card-subtitle
        >
        <v-tabs>
          <v-tabs-slider color="yellow darken-1"></v-tabs-slider>
          <v-tab>
            <v-icon>mdi-login-variant</v-icon>
            GİRİŞ</v-tab>
          <v-tab>
            <v-icon>mdi-account-plus</v-icon>
            QEYDİYYAT</v-tab>
          <v-tab-item>
            <v-card-text>
              <v-form ref="login_form">
                <v-text-field
                  :rules="emailRules"
                  label="E-mail"
                  type="email"
                ></v-text-field>
                <v-text-field
                  :rules="passwRules"
                  label="Şifrə"
                  type="password"
                ></v-text-field>
                <v-text-field label="CAPTCHA"></v-text-field>
                <v-btn @click="logIn" dark color="teal darken-2">
                  GİRİŞ
                  <v-icon>mdi-login</v-icon>
                </v-btn>
              </v-form>
            </v-card-text>
          </v-tab-item>
          <v-tab-item>
            <v-card-text>
              <v-form ref="register_form">
                <v-text-field label="Ad"></v-text-field>
                <v-text-field label="Soyad"></v-text-field>
                <v-text-field
                  :rules="emailRules"
                  label="E-mail"
                  type="email"
                ></v-text-field>
                <v-text-field
                  :rules="passwRules"
                  label="Şifrə"
                  type="password"
                ></v-text-field>
                <v-btn @click="register" dark color="pink">
                  QEYDİYYAT
                  <v-icon>mdi-login</v-icon>
                </v-btn>
              </v-form>
            </v-card-text>
          </v-tab-item>
        </v-tabs>
      </v-card>
    </div>
  </v-app>
</template>



<script>
export default {
  data() {
    return {
      emailRules: [
        (v) => !!v || "E-Poçt ünvanı daxil edin",
        (v) => /.+@.+\..+/.test(v) || "Yanlış poçt ünvanı",
        (v) =>
          (v && v.length < 120) ||
          "E-Poçt ünvanı 120 xarakterdən qısa olmalıdır",
      ],
      passwRules: [(v) => !!v || "Şifrə daxil edin"],
    };
  },
  methods: {
    logIn() {
      this.$refs.login_form.validate();
    },
    register() {
      this.$refs.register_form.validate();
    },
  },
};
</script>


<style scoped lang="scss">
</style>