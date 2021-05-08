<template>
  <v-app id="inspire">
    <v-navigation-drawer app v-model="drawer">
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">Texnokom MMC </v-list-item-title>
          <v-list-item-subtitle>
            2010-cu ilden xidmetinizde
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense nav>
        <v-list-item v-for="item in items" :key="item.title" link :to="item.to">
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-navigation-drawer fixed right v-model="r_drawers[0].show">
      <v-toolbar elevation="0">
        <v-spacer></v-spacer>
        <v-btn fab small @click="closeAllDrws()">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
    </v-navigation-drawer>

    <v-navigation-drawer fixed right v-model="r_drawers[1].show">
      <v-toolbar elevation="0">
        <v-spacer></v-spacer>
        <v-btn fab small @click="closeAllDrws()">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>

      <v-list nav dense>
        <v-list-item link class="teal lighten-5" v-for="i in 8" :key="i" >
          <v-list-item-icon>
            <v-icon color="teal">mdi-apple</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Menu</v-list-item-title>
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

    <v-app-bar app dark color="#00897b">
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-app-bar-title>Anbar - Texnokom</v-app-bar-title>

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
        <v-icon>mdi-heart</v-icon>
      </v-btn>
      <v-btn icon @click="r_drawers[1].show = !r_drawers[1].show">
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-divider></v-divider>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    r_drawers: [{ show: false }, { show: false }],
    drawer: null,
    items: [
      { title: 'Ümümi Panel', icon: 'mdi-view-dashboard', to: '/' },
      { title: 'Inventar', icon: 'mdi-database', to: '/inventar' },
      { title: 'Tənzimləmələr', icon: 'mdi-cog', to: '/settings' }
    ],
    right: null
  }),
  methods: {
    closeAllDrws () {
      for (const d of this.r_drawers) {
        d.show = false
      }
    }
  }
}
</script>

<style lang="scss">
@import "@/scss/main.scss";

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
