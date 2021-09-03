<template>
    <div class="navigation">
        <ul>
            <li><router-link class="a" :to="{name: 'Home'}">Home</router-link></li>
            <li><router-link class="a" :to="{name: 'Create'}">Create</router-link></li>
            <li><router-link class="a" :to="{name: 'Login'}">Login</router-link></li>
            <li><router-link class="a" :to="{name: 'Register'}">Register</router-link></li>
        </ul>
    </div>
</template>

<script>

export default {
    name: 'navigation',

}
</script>

<style scoped>
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
  background-color: #111;
}
</style>
