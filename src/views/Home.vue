<template>
  <div class="home">
    <div>
    </div>
    <v-divider dark="true"/>
    <div id="carouselContainer">
   <v-carousel continuous cycle="true" height="350">
    <v-carousel-item>
      <v-img src="@/assets/logo.png">
      </v-img>
    
    </v-carousel-item>
    <v-carousel-item>
      <v-img src="@/assets/Markit 1.2.png">
      </v-img>
      </v-carousel-item>
      <v-carousel-item>
        <v-img src="@/assets/markit-logo.png">
      </v-img>
       </v-carousel-item>

      <!-- <v-sheet
        :color="color"
        height="100%"
        tile
      >
        <v-row
          class="fill-height"
          align="center"
          justify="center"
        >
          <div class="display-3">Slide {{ i + 1 }}</div>
           -->
        <!-- </v-row>
      </v-sheet> -->
  </v-carousel>
   <v-header class="display-4" :elevation="n-10">
        <p class="font-weight-black">Welcome to MarkIt, a versatile marketing tool developed by MIJDAS</p>
      </v-header>
    </div>
</div>
</template>

<script>
  export default {
    data () {
      return {
        // colors: [
        //   'primary',
        //   'secondary',
        //   'yellow darken-2',
        //   'red',
        //   'orange',
        // ],
        
      }
    },
  }
</script>
<style scoped>
  #carouselContainer{
    padding-right: 10vw;
    padding-left: 10vw;
    /* padding-top: 10vw; */
    padding-bottom: 40vw;
  }
</style>