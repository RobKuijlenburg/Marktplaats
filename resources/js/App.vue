<template>
    <div>
        <navigation/>
        <router-view class="a"/>
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
    },
};
</script>
<style>
@import '../css/app.css';
.a {
    margin-top: 5%;
}
</style>
