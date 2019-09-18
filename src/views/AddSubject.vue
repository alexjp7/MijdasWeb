<template>
  <div class="add-subject">
    <!-- <SubjectDisplay></SubjectDisplay> -->
    <!-- <StudentLoader></StudentLoader> -->
    <!-- <h1>Hello</h1> -->
    <AddSubject></AddSubject>
  </div>
</template>


<script>
// import SubjectDisplay from "@/components/SubjectDisplay.vue"
// import StudentLoader from "@/components/StudentLoader.vue"
import AddSubject from "@/components/AddSubject.vue";
export default {
  name: "add-subject",
  components:{
    // SubjectDisplay,
    // StudentLoader
    AddSubject
  }
}
</script>

<style scoped>
  .add-subject{

  }
</style>