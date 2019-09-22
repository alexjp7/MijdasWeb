<template>
 <div class="jobBoard">
     <h1>Job Board</h1>
      <v-card id = "job">       
        <v-row justify="center">
            <!-- Panels -->         
              <v-expansion-panels>          
                <v-expansion-panel >           
                  <v-card color="secondary" class="expansionHeader">
                  <v-expansion-panel-header>
                    <h1 style="color:white;"> 
                      Engineering and Information Sciences
                    </h1>
                  </v-expansion-panel-header>      
                  </v-card>
                  <!-- Content 1 -->
                  <v-expansion-panel-content>
                    <v-card class="job-content" color="secondary"> 
                      <h3 style="color:white;"> 
                        CSIT121 - 2 tutoring positions available JAVA knowledge required<br>
                        To apply, email: jsmith@uow.edu.au
                      </h3> 
                    </v-card>
                  </v-expansion-panel-content>    
                  <!-- Content 2 -->
                  <v-expansion-panel-content>
                    <v-card class="job-content" color="secondary"> 
                        <h3 style="color:white;">
                          CSIT115 - 1 tutoring position available SQL knowledge required<br>
                          To apply, email: harold@uow.edu.au
                        </h3>
                      </v-card>
                  </v-expansion-panel-content>    
                </v-expansion-panel>       
              </v-expansion-panels>  
            </v-row>    
          </v-card>
            <br>
          <v-card id = "job">       
        <v-row justify="center">
            <!-- Panels -->         
              <v-expansion-panels>          
                <v-expansion-panel >           
                  <v-card color="secondary" class="expansionHeader">
                  <v-expansion-panel-header>
                    <h1 style="color:white;"> 
                      Law, Humanities and the Arts
                    </h1>
                  </v-expansion-panel-header>      
                  </v-card>
                  <!-- Content 1 -->
                  <v-expansion-panel-content>
                    <v-card class="job-content" color="secondary"> 
                      <h3 style="color:white;"> 
                        LAW101 - Tutor Wanted<br>
                        To apply, email: jacksonj@uow.edu.au
                      </h3> 
                    </v-card>
                  </v-expansion-panel-content>    
                  <!-- Content 2 -->
                  <v-expansion-panel-content>
                    <v-card class="job-content" color="secondary"> 
                        <h3 style="color:white;">
                          PHIL101 - Tutor Wanted<br>
                          To apply, email: lbrown@uow.edu.au
                        </h3>
                      </v-card>
                  </v-expansion-panel-content>    
                </v-expansion-panel>       
              </v-expansion-panels>  
            </v-row>    
          </v-card>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
#job{
  margin-left:10%;
  margin-right:10%;
}
.job-content {
  padding:2%;
}

.expansionHeader {
  padding:1%;
}
.v-expansion-panel-content{
  padding:1%;
}
</style>