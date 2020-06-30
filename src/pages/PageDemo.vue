<template>
  <div id="page-demo" class="absolute-center">
    <h5>PageDemo</h5>
    <pre>{{message}}</pre>
    <pre>all users: {{users}}</pre>
    <pre>user online: {{userOnline}}</pre>
    <button @click="eventGetUserOnline({id: 2})">GetUser</button>
  </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'

  export default {
    name: "PageDemo",
    computed: {
      ...mapGetters('demo',
        {
          message: 'getMessage',
          users: 'getListUsers',
          userOnline: 'getUserOnline'
        }
      ),
    },

    methods: {
      ...mapActions('demo', {
        eventGetUserOnline: 'getUserById'
      }),
    }
  }
</script>

<style scoped>

</style>
