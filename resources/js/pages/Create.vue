<template>
    <div>
        <form v-on:submit.prevent="submitAdvertisement">
        <!-- <input type="file" name="img" id="img" v-model="Advertisement.img"> -->
        <input type="text" name="title" id="title" placeholder="Title" v-model="advertisement.title">
        <textarea name="advertisement.body" id="body" cols="30" rows="10" placeholder="Add your text here" v-model="advertisement.body"></textarea>
        <div v-for="rubric in allRubrics" :key="rubric.id" v-bind:value="rubric.value">
            <input type="checkbox"   :value="rubric.id" v-model="advertisement.rubric">
            <label :for="rubric.name">{{rubric.name}}</label>
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
                rubric: []
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
