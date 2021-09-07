<template>
    <div>
        <ul>
            <li v-for="advert in userAdverts" :key="advert.id">
                {{advert.title}} 
                <router-link :to="`/edit/${advert.id}`">Edit</router-link> 
                <button :to="{name: 'SetTop'}">Be On Top</button>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    methods: {

    },

    computed: {
        getUser(){
            return this.$store.getters['users/getUser'];
        },

        userAdverts(){
            return this.$store.getters['advertisements/getUserAdvert'](parseInt(this.$route.params.id));
        },
    },
    
    mounted() {
        this.$store.dispatch('advertisements/getAllAdverts');
        this.$store.dispatch('users/getUser'); 
    }
}
</script>