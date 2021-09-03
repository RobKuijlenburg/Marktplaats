<template>
    <div>
        <div>
            <div class="w-1/5 text-center content-center justify-center rounded-xl shadow-lg h-3/5 m-2">
            <h1 class="text-2xl font-semibold"> {{allAdverts.title}} </h1>
            <!-- @if (str_starts_with($article->img, 'http')) -->
            <img class="index_img m-auto" v-bind:src="allAdverts.img" alt="">
            <p class="mt-2 mb-2 h-10 pl-4 pr-4">{{allAdverts.body}}</p>

            <!-- <button v-if="getUser.id == allAdverts.user_id">Set Awesome</button> -->
            <button v-if="getUser.id === allAdverts.id" :to="{name: 'SetTop'}">Set Awesome</button>
            </div>
        </div>

    </div>
</template>

<script>
export default {

    computed: {
        allAdverts(){
            return this.$store.getters['advertisements/getAdvert'](parseInt(this.$route.params.id));
        },

        getUser(){
            return this.$store.getters['users/getUser'];
        }
    },
    mounted(){
        this.$store.dispatch('advertisements/getAllAdverts');
    }
}
</script>