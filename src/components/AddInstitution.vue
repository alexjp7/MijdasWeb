<template>
  <div>
    <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <v-btn v-on="on" icon color="white">
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </template>
      <span>Add Institution</span>
    </v-tooltip>
  </div>
</template>

<script>
export default {
  data: () => ({})
};
</script>

<style scoped>
</style>