<template>
  <v-app>
    <v-app-bar app color="primary">
      <v-toolbar-title style="color:white;"class="headline text-uppercase">
        <span class="font-weight-light">Markit</span>
      </v-toolbar-title>

    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> |
    <router-link to="/login">Login</router-link>
    <v-spacer></v-spacer>
    </v-app-bar>

    <v-content>
        <router-view>  </router-view>   
    </v-content>
  </v-app>
</template>

<script>

</script>
