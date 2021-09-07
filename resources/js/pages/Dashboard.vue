<template>
    <div>
        <div v-for="advert in allAdverts" :key="advert.id">
            <div class="w-1/5 text-center content-center justify-center rounded-xl shadow-lg h-3/5 m-2">
            <h1 class="text-2xl font-semibold"> {{advert.title}} </h1>
            <!-- @if (str_starts_with($article->img, 'http')) -->
            <img class="index_img m-auto" v-bind:src="advert.img" alt="">
            <p class="mt-2 mb-2 h-10 pl-4 pr-4">{{advert.body}}</p>
            <router-link :to="`/show/${advert.id}`">Go to Advertisement</router-link>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    methods: {

    },

    computed: {
        getUser(){
            let user = this.$store.getters['users/getUser'];
            return user;
        },

        userAdverts(){
            console.log(this.$store.getters['advertisements/getAdvert'](parseInt(this.$route.params.user_id)));
            return this.$store.getters['advertisements/getAdvert'](parseInt(this.$route.params.user_id));
        },
        
        allAdverts(){
            console.log(this.$store)
            return this.$store.getters['advertisements/getAllAdverts'];
        },
    },
    
    mounted() {
        this.$store.dispatch('advertisements/getAllAdverts')
        this.$store.dispatch('users/getUser'); 
    }
}
</script>