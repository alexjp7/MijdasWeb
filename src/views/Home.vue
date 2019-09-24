<template>
  <div id="home">
    <div id="homeBkg">
      <!-- Caroursel -->
      <div id="homeBkg">
        <v-carousel continuous cycle="true" height="250">
          <v-carousel-item>
            <v-img src="@/assets/logo.png"></v-img>
          </v-carousel-item>
          <v-carousel-item>
            <v-img src="@/assets/Markit 1.2.png"></v-img>
          </v-carousel-item>
          <v-carousel-item>
            <v-img src="@/assets/markit-logo.png"></v-img>
          </v-carousel-item>
        </v-carousel>
        <v-header class="display-2" :elevation="n-10">
          <v-card id="alternateBkg">
            <h1 id="homeTitle">Welcome to MarkIt!</h1>
          </v-card>
          <!-- Slogans  -->
          <v-container id="slogans">
            <v-row no-gutters :elevation="1">
              <v-col :cols="2">
                <v-img src="@/assets/Markit_1.0.png" width height="150" contain />
              </v-col>
              <v-col id="logoCol">
                <p id="logoText">Easier,</p>
              </v-col>
            </v-row>
            <v-row no-gutters :elevation="2">
              <v-col :cols="2">
                <v-img src="@/assets/Markit_1.0.png" width height="150" contain />
              </v-col>
              <v-col id="logoCol">
                <p id="logoText">Faster,</p>
              </v-col>
            </v-row>
            <v-row no-gutters :elevation="3">
              <v-col :cols="2">
                <v-img src="@/assets/Markit_1.0.png" width height="150" contain />
              </v-col>
              <v-col id="logoCol">
                <p id="logoText">The Future.</p>
              </v-col>
            </v-row>
          </v-container>
        </v-header>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>
<style scoped>
#home {
  height: 100% !important;
}
#homeBkg {
  background-color: #2496d4 !important;
}
#alternateBkg {
  background-image: linear-gradient(-90deg, #0069c0, #2496d4);
}
#homeTitle {
  padding: 2%;
  color: white;
}

#logoCol {
  text-align: left;
}

#logoText {
  margin-top: 3.5%;
  color: white;
}
#slogans {
  margin-left: 20%;
  margin-right: 20%;
  width: 100%;
}
</style>