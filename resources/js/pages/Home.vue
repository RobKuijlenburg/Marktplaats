<template>
    <div>
        <div class="contained">
        <div class="advert-container" >
        <div v-for="advert in filteredAdverts" :key="advert.id">
                <div class="w-1/5 text-center content-center justify-center rounded-xl shadow-lg h-3/5 m-2">
                <h1 class="text-2xl font-semibold"> {{advert.title}} </h1>
                <!-- @if (str_starts_with($article->img, 'http')) -->
                <img class="index_img m-auto" v-bind:src="advert.img" alt="">
                <p class="mt-2 mb-2 h-10 pl-4 pr-4">{{advert.body}}</p>
                <router-link :to="`/show/${advert.id}`">Go to Advertisement</router-link>
            </div>
            </div>
        </div>
        <div class="search-container">
            <h1>Search</h1>
            <input type="search" v-model="searchWord">
        </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions} from 'vuex';

export default {
    

    computed: {
        ...mapGetters({
            getAllAdverts: 'advertisements/getAllAdverts',
            getUser: 'users/getUser'
        }),

        filteredAdverts(){
            try{
                let a = (this.$store.getters['advertisements/getFilteredAdverts'] || this.$store.getters['advertisements/getAllAdverts'])
                return a
            } catch (error) {
                console.log(error);
            }
        },

        searchWord: {
            get(){
                return this.$store.state['advertisements/searchWord']
            },
            set (value){
                this.$store.dispatch('advertisements/getFilteredAdverts', value)
            }
        }
    },
    mounted(){
        this.$store.dispatch('advertisements/getAllAdverts');
        this.$store.dispatch('users/getUser');
    }
}
</script>

<style scoped>
    .contained {
        display: flex;
    }

    .advert-container {
        display: grid;
        grid-template: 200px 200px;
        grid-row: auto auto;
        width: 70%;
    }

    .search-container {
        left: 75%;
        position: fixed;
        float: right;
    }
</style>