<template>
    <div class="settings">
        <h1>Settings</h1>
    <v-switch
    v-model="switch1"
      :label="`Dark Mode: ${switch1.toString()}`"
      dark="true"
    ></v-switch>
    </div>
</template>

<script>
export default {
    data () {
      return {
        switch1: false,
        
      }
    },
}
</script>

<style scoped>

</style>