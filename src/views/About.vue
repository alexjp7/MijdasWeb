<template>
  <div class="about">
    <SubjectDisplay></SubjectDisplay>
    <br>
    <br>
    <StudentLoader></StudentLoader>
  </div>
</template>


<script>
import SubjectDisplay from "@/components/SubjectDisplay.vue"
import StudentLoader from "@/components/StudentLoader.vue"
export default {
  name: "about",
  components:{
    SubjectDisplay,StudentLoader
  }
}
</script>

<style  scoped>
  .about{

  }
</style>