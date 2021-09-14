<template>
    <div>
        <form  class=" text-center content-center justify-center rounded-xl shadow-lg h-3/5 m-2" v-on:submit.prevent="submitAdvertisement">
        <!-- <input type="file" name="img" id="img" v-model="Advertisement.img"> -->
        <input type="text" name="title" id="title" placeholder="Title" v-model="advertisement.title">
        <textarea name="advertisement.body" id="body" cols="30" rows="10" placeholder="Add your text here" v-model="advertisement.body"></textarea>
        <div class="flex" v-for="rubric in allRubrics" :key="rubric.id" v-bind:value="rubric.value">
            <div>
                <input type="checkbox"   :value="rubric.id" v-model="advertisement.rubrics">
                <label :for="rubric.name">{{rubric.name}}</label>
            </div>
        </div>

        <button type="submit">Submit</button>
        </form>
    </div>
</template>

<script>
import axios from "axios";

export default {
    data(){
        return {
            advertisement: {
                title: '',
                body: '',
                rubrics: []
            }
        }
    },

    methods:{
        submitAdvertisement(){
            this.$store.dispatch('advertisements/createAdvertisement', this.advertisement)
        }
    },

    computed: {
        allRubrics(){
            return this.$store.getters['rubrics/getAllRubrics'];
        }
    },

    mounted(){
        this.$store.dispatch('rubrics/getAllRubrics')
        this.$store.dispatch('users/getUser')
    }
}
</script>

<style scoped>
    .flex{
        display: flex;
    }


</style>
