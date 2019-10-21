<!--
--  Authors: Sam, Dylan
-->

<template>
  <div>
    <v-card color="primary">
      <v-card-title class="card-title">
        <h2 style="color:white;" id="pageBreakHeading">Admin Page for {{userAdminName}}</h2>
      </v-card-title>
      <v-spacer></v-spacer>
      <v-card-action>
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn v-on="on" icon color="white">
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </template>
          <span>Add Institution</span>
        </v-tooltip>
      </v-card-action>
    </v-card>

    <AddInstitution />
  </div>
</template>

<script>
export default {
  data: () => ({
    userAdminName: ""
  }),
  methods: {
    async mounted() {
      this.userAdminName = this.$store.state.user;
    }
  }
};
</script>

<style scoped>
#pageBreakHeading {
  padding: 1%;
  display: flex;
  color: white;
  width: 100%;
}
</style>