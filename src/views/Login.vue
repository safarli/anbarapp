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
            GİRİŞ</v-tab
          >
          <v-tab>
            <v-icon>mdi-account-plus</v-icon>
            QEYDİYYAT</v-tab
          >
          <v-tab-item>
            <v-card-text>
              <v-form ref="login_form">
                <v-text-field
                  :rules="emailRules"
                  label="E-mail"
                  type="email"
                ></v-text-field>
                <v-text-field
                  counter="60"
                  label="Şifrə"
                  type="password"
                  :rules="passwRules"
                ></v-text-field>
                <v-btn @click="logIn" dark color="teal darken-2" class="mt-2"> GİRİŞ </v-btn>
              </v-form>
            </v-card-text>
          </v-tab-item>
          <v-tab-item>
            <v-card-text>
              <v-form ref="register_form">
                <v-text-field
                  label="Ad"
                  :rules="adRules"
                  counter="255"
                ></v-text-field>
                <v-text-field
                  label="Soyad"
                  :rules="soyadRules"
                  counter="255"
                ></v-text-field>
                <v-text-field
                  :rules="emailRules"
                  label="E-mail"
                  type="email"
                ></v-text-field>
                <v-tooltip bottom content-class="grey darken-4" open-delay="300" :open-on-hover="false">
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-bind="attrs"
                      v-on="on"
                      :rules="passwRules"
                      label="Şifrə"
                      type="password"
                    ></v-text-field>
                  </template>
                  <span
                    >Şifrə 8 simvoldan az olmayaraq, ən az 1 rəqəm, 1 kiçik
                    hərf, 1 böyük hərfdən ibarət olmalıdır</span
                  >
                </v-tooltip>
                <v-btn @click="register" dark color="pink" class="mt-2"> QEYDİYYAT </v-btn>
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
      passwRules: [
        (v) => !!v || "Şifrə daxil edin",
        (v) =>
          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/.test(v) ||
          "Qaydalara uyğun şifrə daxil edin",
      ],
      adRules: [(v) => !!v || "Adınızı daxil edin"],
      soyadRules: [(v) => !!v || "Soyadınızı daxil edin"],
    };
  },
  computed: {
    randomQuestion() {
      const num_1 = Math.round(Math.random() * 10);
      const num_2 = Math.round(Math.random() * 10);
      return `${num_1} + ${num_2} = ?`;
    },
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