
<template>
  <div class="login">
    <SubjectDisplay/>
  </div>
</template>
<script>

import LoginForm from "@/components/LoginForm.vue";
import SubjectDisplay from "@/components/SubjectDisplay.vue";

export default {

  name: "login",
  components:{ 
     SubjectDisplay

  }
/*
  data:
  {
    message:'hey'
  },
  methods:
  {
    addPost: function() {
      axios
        .post(
          "https://markit.mijdas.com/api/requests/user/",
          this.username,
          this.password,
        )
        .then(response =>
        {
          console.log(response);
        
        })
    },

    test:function()
    {
      message = "h3ey"
      
    }
  }
  */
  /*** This is an example of a native fetch request AND an additonal way of inline templating***/

  /*
  mounted() {
    fetch("https://markit.mijdas.com/api/requests/user/")
      .then(response => response.json())
      .then(data => {
        this.users = data;
      });
  },
  template: `
        <div>
            <li v-for="user in users"> {{user}} </li>
        </div>
    `
    */
};
</script>

<style scoped>
</style>