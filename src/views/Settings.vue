<!--
--  Authors: Ilyas
-->

<template>
  <v-app app>
    <div class="settings">
      <h1>Settings</h1>
      <br />
      <v-layout align-center justify-center>
        <v-switch v-model="dark" :label="`Dark Mode`" dark="true"></v-switch>
      </v-layout>
      <br />
      <v-btn v-on="on" color="secondary" @click="dialog = !dialog">Privacy</v-btn>
      <v-dialog v-model="dialog" max-width="500px">
        <v-card>
          <v-card-text>
            <h3>
              Your access to and use of the Service is conditioned on your acceptance of and compliance with
              these Terms. These Terms apply to all visitors, users and others who access or use the Service.
              By accessing or using the Service you agree to be bound by these Terms. If you disagree
              with any part of the terms then you may not access the Service.
            </h3>
          </v-card-text>
          <v-card-actions>
            <div class="flex-grow-1"></div>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      dark: false,
      dialog: false,
      pass: false
    };
  }
};
</script>

<style scoped>
</style>