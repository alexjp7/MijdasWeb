<!-- <template>
  
    <!-- <v-toolbar-title>MarkIt</v-toolbar-title>
      <router-link to="/">Home</router-link>

     
    
      <router-link to="/about">About</router-link>
      <router-link to="/login">Login</router-link>
      <router-link to="/register">Register</router-link>
      <router-link to="/calendar">Calendar</router-link>
      <v-spacer></v-spacer>
      <v-btn text href="https://mijdas.com" target="_blank">
        <span class="mr-2">About Us</span>
      </v-btn>
    -->
    <!-- <v-toolbar fixed class="cyan" dark>
      <v-toolbar-title class="mr-4">
        <router-link class="home" tag="span" to="/"> 
          Home
          <!-- <v class="btn">
            <v-img src="@/assets/markit-logo.png"></v-img>
          </v>-->
        <!-- </router-link>
      </v-toolbar-title> -->

      <!-- <v-spacer></v-spacer> -->
      <!-- <v-toolbar-items>
        <router-link to="/login">Login</router-link>
        <router-link to="/register">Register</router-link>
        <router-link to="/calendar">Calendar</router-link>
      </v-toolbar-items> -->
      <!-- 
      <v-btn flat dark :to="{
          name: 'songs'
        }">Browse</v-btn>
    

    <v-spacer></v-spacer>

    <v-toolbar-items>
      <v-btn
        v-if="!$store.state.isUserLoggedIn"
        flat
        dark
        :to="{
          name: 'login'
        }"
      >Login</v-btn>

      <v-btn
        v-if="!$store.state.isUserLoggedIn"
        flat
        dark
        :to="{
          name: 'register'
        }"
      >Sign Up</v-btn>

      <v-btn v-if="$store.state.isUserLoggedIn" flat dark @click="logout">Log Out</v-btn>
      </v-toolbar-items>-->
    <!-- </v-toolbar>
  </v-app-bar>
</template> -->


<template>
  <div class="nav" >
    <v-toolbar :extended="extended" :flat="flat"  color="primary">
      <v-toolbar-title>
        <router-link to="/">
          <v class="btn">
            <v-img src="@/assets/markit-logo.png"></v-img>
          </v>
        </router-link>
      </v-toolbar-title>
      <v-spacer ></v-spacer>
      <v-toolbar-items >
        <router-link to="/about">
          <v-btn text class="navText">About Us</v-btn>
        </router-link>
        <router-link to="/login">
          <v-btn text class="navText">Login</v-btn>
        </router-link>
        <router-link to="/register">
          <v-btn text class="navText">Register</v-btn>
        </router-link>
        <router-link to="/calendar">
          <v-btn text class="navText">Calendar</v-btn>
        </router-link>
      </v-toolbar-items>
    </v-toolbar>
  </div>
</template>

<script>
export default {
  data: () => ({
    extended: true,
    flat: true,
    extensionHeight: 48
  }),
  methods: {
    logout() {
      this.$store.dispatch("setToken", null);
      this.$store.dispatch("setUser", null);
      this.$router.push({
        name: "home"
      });
    }
  }
};
</script>

<style scoped>
.home {
  cursor: pointer;
}
.home:hover {
  color: #e9e;
}
.navText{
  color:white !important;
}
</style>