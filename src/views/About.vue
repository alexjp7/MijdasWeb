<template>
  <div class="about">
    <h1>This is an about page</h1>
    <SubjectDisplay></SubjectDisplay>
  </div>
</template>


<script>
import SubjectDisplay from "@/components/SubjectDisplay.vue"
export default {
  name: "about",
  components:{
    SubjectDisplay
  }
}
</script>