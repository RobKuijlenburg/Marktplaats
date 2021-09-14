<template>
    <div>
        <div class="contained">
        <div class="pannenkoeken">
        <div v-for="advert in getAllAdverts" :key="advert.id">
                <div class="w-1/5 text-center content-center justify-center rounded-xl shadow-lg h-3/5 m-2 px-5 py-4">
                <h1 class="text-2xl font-semibold"> {{advert.title}} </h1>
                <!-- @if (str_starts_with($article->img, 'http')) -->
                <img class="index_img m-auto" v-bind:src="advert.img" alt="">
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
                <input type="checkbox"   :value="rubric.id" v-model="searchCategories">
                <label :for="rubric.name">{{rubric.name}}</label>
            </div>
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
            searchCategories: [],
        }
    },

    methods:{
        checker(arr, target){
            return target.every(v => arr.includes(v));
        }
    },

    computed: {
        getAllAdverts() {
            const searchAdverts = this.searchAdverts.trim().toLowerCase();
            const searchCategories = this.searchCategories;
            const adverts = this.$store.getters['advertisements/getAllAdverts'];
            if (!adverts) return [];

            return adverts.filter(({title, body, rubrics}) => {
                if (searchAdverts && !title.toLowerCase().includes(searchAdverts)) return false;
                if (searchAdverts && !body.toLowerCase().includes(searchAdverts)) return false;
                if (searchCategories && !this.checker(rubrics, searchCategories)) return false;
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
        this.$store.dispatch('advertisements/getAllAdverts');
        this.$store.dispatch('rubrics/getAllRubrics');
        if(this.$store.getters['users/getLoginState'] === true){
        this.$store.dispatch('users/getUser');
        }
    }
}
</script>

<style scoped>
    .contained {
        display: flex;
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