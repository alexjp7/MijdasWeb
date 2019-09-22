<template>
  <div class="dashboard">
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
                        CSIT121 - 2 tutoring positions available JAVA knowledge required
                      </h3> 
                    </v-card>
                  </v-expansion-panel-content>    
                  <!-- Content 2 -->
                  <v-expansion-panel-content>
                    <v-card class="job-content" color="secondary"> 
                        <h3 style="color:white;">
                          CSIT115 - 1 tutoring position available SQL knowledge required
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
import SubjectDisplay from "@/components/SubjectDisplay.vue";
import StudentLoader from "@/components/StudentLoader.vue";
import StaffLinker from "@/components/StaffLinker.vue";
import StudentViewer from "@/components/StudentViewer.vue";
export default {
  name: "dashboard",
  components: {
    SubjectDisplay,
    StudentLoader,
    StaffLinker,
    StudentViewer
  }
};
</script>

<style  scoped>

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