<template>
  <v-app id="inspire">
    <!-- //! DRAWER LEFT -->
    <v-navigation-drawer app v-model="drawer" color="grey lighten-5">
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">Texnokom/Anbar</v-list-item-title>
          <v-list-item-subtitle>
            Anbar İdarəetmə Sistem v1.3
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list v-bind="densify" nav>
        <v-list-item
          active-class="childcolor"
          v-for="item in items"
          :key="item.title"
          link
          :to="item.to"
        >
          <v-list-item-icon>
            <v-icon size="28px" id="myicon">{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title
              :style="{
                'font-size': fontSize + 'px',
                'line-height': 1.6,
                'font-weight': 400,
              }"
            >
              {{ item.title }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <!-- //! DRAWER LEFT END -->

    <!-- //! DRAWER RIGHT 1 -->
    <v-navigation-drawer fixed right v-model="r_drawers[0].show">
      <v-toolbar elevation="0">
        <v-spacer></v-spacer>
        <v-btn fab small @click="closeAllDrws()">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
    </v-navigation-drawer>
    <!-- //! DRAWER RIGHT 1 END -->

    <!-- //! DRAWER RIGHT 2 START-->
    <v-navigation-drawer fixed right v-model="r_drawers[1].show">
      <v-toolbar elevation="0">
        <v-spacer></v-spacer>
        <v-btn fab small @click="closeAllDrws()">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>

      <v-list nav>
        <v-list-item
          link
          v-for="brand in brands"
          :key="brand.title"
          class="grey lighten-5"
        >
          <v-list-item-icon>
            <v-icon color="grey darken-2">mdi-download</v-icon>
            <v-icon color="amber darken-2">{{ brand.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ brand.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <template v-slot:append>
        <v-list>
          <v-list-item>
            <v-btn block>
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </v-list-item>
          <v-list-item>
            <v-btn block>
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </v-list-item>
          <v-list-item>
            <v-btn block>
              <v-icon>mdi-minus</v-icon>
            </v-btn>
          </v-list-item>
        </v-list>
      </template>
    </v-navigation-drawer>
    <!-- //! DRAWER RIGHT 2 END -->

    <!-- //! APP-BAR START-->
    <v-app-bar app dark color="teal">
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-app-bar-title>Anbar İdarəetmə Sistemi</v-app-bar-title>

      <v-spacer></v-spacer>

      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn v-on="on" v-bind="attrs" icon class="d-none d-lg-flex">
            <v-icon>mdi-magnify</v-icon>
          </v-btn>
        </template>
        <v-list dense>
          <v-list-item link v-for="(item, index) in items" :key="index">
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <v-btn icon @click="r_drawers[0].show = !r_drawers[0].show">
        <v-icon>mdi-bank</v-icon>
      </v-btn>
      <v-btn icon @click="r_drawers[1].show = !r_drawers[1].show">
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-app-bar>
    <!-- //! APP-BAR END -->

    <!-- //! MAIN START-->
    <v-main>
      <router-view></router-view>
    </v-main>
    <!-- //! MAIN END -->
  </v-app>
</template>

<script>
export default {
  data: function () {
    return {
      r_drawers: [{ show: false }, { show: false }],
      drawer: null,
      right: null,
      items: [
        { title: "Ümümi Panel", icon: "mdi-view-dashboard", to: "/dashboard" },
        { title: "İnventar", icon: "mdi-database", to: "/inventar" },
        {
          title: "Məhsul Tipləri Redaktə",
          icon: "mdi-table-edit",
          to: "/editmehsultipleri",
        },
        {
          title: "Satıcıları Redaktə Et",
          icon: "mdi-table-edit",
          to: "/editsaticilar",
        },
        { title: "Mədaxil", icon: "mdi-bank-transfer-in", to: "/medaxil" },
        { title: "Məxaric", icon: "mdi-bank-transfer-out", to: "/mexaric" },
        { title: "Hesabatlar", icon: "mdi-chart-bar", to: "/hesabatlar" },
        { title: "Nəzarət", icon: "mdi-cctv", to: "/nezaret" },
        { title: "QR-Code", icon: "mdi-data-matrix", to: "/qrcode" },
        {
          title: "Export-CSV",
          icon: "mdi-microsoft-excel",
          to: "/exportexcel",
        },
        { title: "Barkod", icon: "mdi-barcode-scan", to: "/barcode" },
        { title: "Tənzimləmələr", icon: "mdi-cog", to: "/settings" },
        { title: "Login", icon: "mdi-login", to: "/login" },
      ],
      brands: [
        { title: "IOS", icon: "mdi-apple" },
        { title: "Android", icon: "mdi-android" },
        { title: "Windows", icon: "mdi-microsoft" },
        { title: "Google", icon: "mdi-google" },
        { title: "FreeBSD", icon: "mdi-freebsd" },
        { title: "Steam", icon: "mdi-steam" },
      ],
    };
  },

  methods: {
    closeAllDrws() {
      for (const d of this.r_drawers) {
        d.show = false;
      }
    },
  },

  computed: {
    fontSize() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return 14;
        case "sm":
          return 14;
        case "md":
          return 14;
        case "lg":
          return 16;
        case "xl":
          return 16;
      }
      return 10;
    },
    densify() {
      if (this.$vuetify.breakpoint.name === "xs") {
        return { dense: true };
      }
      return { dense: true };
    },
  },
};
</script>

<style lang="scss">
@use "@/scss/main.scss";
@import "~vuetify/src/styles/styles.sass";

.childcolor {
  & #myicon {
    color: map-get($amber, darken-2);
  }
}

/* width */
::-webkit-scrollbar {
  width: 6px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #888;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>