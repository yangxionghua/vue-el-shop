<template>
  <div>
      homecomponent
      <b-button variant="outline-primary" @click="logout">
          logout
      </b-button>
  </div>
</template>
<script>
export default {
  name: "home",
  data () {
   return {}
  },
   methods:{
       logout(){
           window.sessionStorage.clear()
           this.$router.push('./login')
       }
   }
}
</script>
<style scoped>
</style>    