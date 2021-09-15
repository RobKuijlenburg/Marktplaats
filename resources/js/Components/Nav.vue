<template>
    <div class="navigation">
        <ul>
            <li><router-link class="a" :to="{name: 'Home'}">Home</router-link></li>
            <li v-if="getLoggedIn"><router-link class="a" :to="{name: 'Create'}">Create</router-link></li>
            <li v-if="!getLoggedIn"><router-link class="a" :to="{name: 'Login'}">Login</router-link></li>
            <li v-if="!getLoggedIn"><router-link class="a" :to="{name: 'Register'}">Register</router-link></li>
            <li v-if="getLoggedIn"><router-link class="a" :to="{path: `/dashboard/${getUser.id}`}">Dashboard</router-link></li>
            <li v-if="getLoggedIn"><a class="a" @click.prevent="removeUser">Logout</a></li>
            <span v-if="getUser" class="user">{{getUser.name}}</span>
        </ul>
        
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'navigation',

    methods: {
      removeUser(){
        this.$store.dispatch('users/destroyUser')
      }
    },

    computed: {
      getUser(){
        return this.$store.getters['users/getUser'];
      },

      getLoggedIn(){
        return this.$store.getters['users/getLoginState'];
      }
    }
}
</script>

<style scoped>
.user {
  float: right;
  color: white;
  text-align: center;
  padding: 14px 16px;
}

.navigation {
  position: fixed;
  top: 0;
  margin: 0;
  width: 100%;
}

ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: #333;
}

li {
  float: left;
}

li .a {
  display: block;
  color: white;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
}

/* Change the link color to #111 (black) on hover */
li .a:hover {
  cursor: pointer;
  background-color: #111;
}


</style>
