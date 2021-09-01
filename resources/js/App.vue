<template>
    <div>
        <navigation/>
        <span>{{getUser}}</span>
        <router-view/>
    </div>
</template>

<script>
import navigation from "./Components/Nav.vue"

export default {
    components: {
        navigation
    },

    data() {
        return {
        };
    },

    computed: {
        getUser(){
            return this.$store.getters['users/getUser'];
        }
    }
};
</script>
