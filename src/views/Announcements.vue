<!--
--  Authors: Ilyas
-->

<template>
  <div class="announcements">
    <h1>Announcements</h1>

    <v-card max-width="600" max-height="50" flat="true" class="mx-auto">
      <v-container class="pa-2" fluid>
        <v-row>
          <v-col>
            <v-card color="#2196F3" dark height="80">
              <v-card-text class="white--text">
                <div class="headline mb-2">CSIT315 - Lab 1 Announcement</div>Lab 1 submission will be pushed back a week.
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-card color="#2196F3" dark height="80">
              <v-card-text class="white--text">
                <div class="headline mb-1">CSIT219 - Assignment 2 Announcement</div>Criteria for assignment 2 has changed
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
        <v-btn v-on="on" color="secondary" @click="dialog = !dialog">
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </v-container>
      <v-dialog v-model="dialog" max-width="500px">
        <v-card id>
          <v-card-text>
            <v-text-field label="Announcement name" id="ann1"></v-text-field>
            <v-textarea label="Announcement content" id="ann2"></v-textarea>
          </v-card-text>
          <v-card-actions>
            <div class="flex-grow-1"></div>
            <v-btn text color="primary" @click="dialog = false" id="data">Submit</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-card>
  </div>
</template>

<script>
export default {
  data: () => ({
    dialog: false
  })
};
</script>

<style scoped>
/* #announcements{
  margin-left:10%;
  margin-right:10%;
}
.announcements-content {
  padding:2%;
}

.expansionHeader {
  padding:1%;
}
.v-expansion-panel-content{
  padding:1%;
} */
</style>