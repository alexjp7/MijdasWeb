<template>
  <div class="announcements">
    <h1>Announcements</h1>
    <v-card max-width="600" max-height="50" flat="true" class="mx-auto">
      <v-container class="pa-2" fluid>
        <v-row>
          <v-col>
            <v-card color="#2196F3" dark height="80">
              <v-card-text class="white--text">
                <div class="headline mb-2">Lab 1 Announcement</div>Lab 1 submission will be pushed back a week.
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-card color="#2196F3" dark height="80">
              <v-card-text class="white--text">
                <div class="headline mb-1">Assignment 2 Announcement</div>Criteria for assignment 2 has changed
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </div>
</template>

<script>
export default {};
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