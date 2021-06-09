<template>
  <v-app>
    <div
      style="width: 100%; height: 100%"
      class="d-flex justify-center align-center teal lighten-4"
    >
      <v-card max-width="400px" elevation="14" class="pa-2 ma-2">
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
                  label="E-mail"
                  v-model="loginCreds.email"
                  :rules="emailRules"
                  type="email"
                ></v-text-field>
                <v-text-field
                  label="Şifrə"
                  v-model="loginCreds.password"
                  counter="60"
                  type="password"
                  :rules="passwRules"
                ></v-text-field>
                <v-switch inset label="Yadda saxla"></v-switch>
                <v-btn
                  @click="logIn"
                  dark
                  color="teal darken-2"
                  class="mt-2"
                  :loading="loginBtnLoading"
                >
                  GİRİŞ
                </v-btn>
              </v-form>
            </v-card-text>
          </v-tab-item>
          <v-tab-item>
            <v-card-text>
              <v-form ref="register_form">
                <v-text-field
                  label="Ad Soyad"
                  v-model="registerCreds.name"
                  :rules="adRules"
                  counter="255"
                ></v-text-field>
                <v-text-field
                  :rules="emailRules"
                  label="E-mail"
                  v-model="registerCreds.email"
                  type="email"
                ></v-text-field>
                <v-tooltip top max-width="300" content-class="grey darken-2">
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-bind="attrs"
                      v-on="on"
                      v-model="registerCreds.password"
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
                <v-btn
                  @click="register"
                  dark
                  color="pink"
                  class="mt-2"
                  :loading="registerBtnLoading"
                >
                  QEYDİYYAT
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
import axios from "axios";
import BASE_PATH from "@/variables/urls";

export default {
  data() {
    return {
      loginBtnLoading: false,
      registerBtnLoading: false,
      loginCreds: {
        email: "",
        password: "",
      },
      registerCreds: {
        name: "",
        email: "",
        password: "",
      },

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
  computed: {},
  methods: {
    async logIn() {
      if (!this.$refs.login_form.validate()) return;
      this.loginBtnLoading = true;
      const loginCreds = {
        email: this.loginCreds["email"],
        password: this.loginCreds["password"],
      };
      try {
        const { data } = await axios.post(
          BASE_PATH + "/userauth/login",
          loginCreds
        );
        localStorage.setItem("mytoken", data.jwtToken);
        this.$router.push("/");
      } catch (e) {
        console.log(e);
      } finally {
        // finally block always executes even after return and exception occurence, except process.exit(), system crash, VM crash etc
        this.loginBtnLoading = false;
      }
    },

    async register() {
      if (!this.$refs.register_form.validate()) return;
      this.registerBtnLoading = true;

      const registerCreds = {
        name: this.registerCreds["name"],
        email: this.registerCreds["email"],
        password: this.registerCreds["password"],
      };

      try {
        const { data } = await axios.post(
          BASE_PATH + "/userauth/register",
          registerCreds
        );
        localStorage.setItem("mytoken", data.jwtToken);
        this.$router.push("/");
      } catch (e) {
        console.log(e);
      } finally {
        this.registerBtnLoading = false;
      }
    },
  },
};
</script>


<style scoped lang="scss">
</style>