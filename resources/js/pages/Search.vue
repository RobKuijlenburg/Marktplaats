<template>
    <div>
        <div class="contained">
        <div class="pannenkoeken">
        <div v-for="advert in getAllAdverts" :key="advert.id">
                <div class="w-1/5 text-center content-center justify-center rounded-xl shadow-lg h-3/5 m-2 px-5 py-4">
                <h1 class="text-2xl font-semibold"> {{advert.title}} </h1>
                <img v-if="(advert.img).startsWith('http')" class="index_img m-auto" v-bind:src="advert.img" alt="">
                <img v-else class="index_img m-auto" v-bind:src="'storage/'+ advert.img" alt="">
                <p class="mt-2 mb-2 h-10 pl-4 pr-4">{{advert.body}}</p>
                <router-link :to="`/show/${advert.id}`">Go to Advertisement</router-link>
            </div>
            </div>
        </div>
        <div class="search-container w-1/5 text-center content-center justify-center rounded-xl shadow-lg h-3/5 pt-4 px-5 pb-5">
            <h1>Search</h1>
            <input type="search" v-model="searchAdverts">
            <div class="flex" v-for="rubric in getAllRubrics" :key="rubric.id" v-bind:value="rubric.value">
            <div>
                <input type="checkbox"   :value="rubric.id" v-model="searchRubrics">
                <label :for="rubric.name">{{rubric.name}}</label>
            </div>
        </div>
            <div>
                <label for="afstand">afstand</label>
                <input type="number" name="afstand" v-model="searchDistance">
                <button @click="searchForDistance">Zoek!!</button>
            </div>
        </div>
        </div>
    </div>
</template>

<script>
export default {
    
    data() {
        return {
            searchAdverts: '',
            searchRubrics: [],
            searchDistance: null
        }
    },

    methods:{
        checker(arr, target){
            return target.every(v => arr.includes(v));
        },

        searchForDistance(){
            this.$store.dispatch('advertisements/searchForDistance', {searchdistance: this.searchDistance})
        }
    },

    computed: {
        getAllAdverts() {
            const searchAdverts = this.searchAdverts.trim().toLowerCase();
            const searchRubrics = this.searchRubrics;
            const adverts = this.$store.getters['advertisements/getAllAdverts'];
            if (!adverts) return [];

            return adverts.filter(({title, rubrics}) => {
                if (searchAdverts && !title.toLowerCase().includes(searchAdverts)) return false;
                if (searchRubrics && !this.checker(rubrics, searchRubrics)) return false;
                return true;
            });
        },

        getUser() {
            return this.$store.getters['users/getUser']
        },

        getAllRubrics(){
            return this.$store.getters['rubrics/getAllRubrics']
        }
    },

    mounted(){
        this.$store.dispatch('rubrics/getAllRubrics');
        this.$store.dispatch('users/getUser');
    }
}
</script>

<style scoped>
    .contained {
        display: flex;
    }

    .index_img{
        width: 700px;
        height: auto;
    }

    .pannenkoeken {
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

    .flex {
        display: flex;
    }

    .flex div input{
        margin-right: 2px;
    }
</style>