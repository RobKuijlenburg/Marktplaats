<template>
    <div v-if="getAdvert">
        <form v-on:submit.prevent="updateAdvertisement">
        <!-- <input type="file" name="img" id="img" v-model="Advertisement.img"> -->
        <input type="text" name="title" id="title" v-model="advertisement.title">
        <textarea name="advertisement.body" id="body" cols="30" rows="10" v-model="advertisement.body"></textarea>
        <div v-for="rubric in rubrics" :key="rubric.id">
            <input type="checkbox" :value="rubric.id" v-model="advertisement.rubrics">
            <label :for="rubric.name">{{rubric.name}}</label>
        </div>

        <button type="submit">Submit</button>
        </form>
    </div>
</template>

<script>
export default {
    data(){
        return {
            advertisement: {

            }
        }
    },

    methods:{
        updateAdvertisement(){
            this.$store.dispatch('advertisements/updateAdvertisement', this.advertisement)
        }
    },

    computed: {
        getAdvert(){
            this.advertisement = this.$store.getters['advertisements/getAdvert'](parseInt(this.$route.params.id))
            return this.$store.getters['advertisements/getAdvert'](parseInt(this.$route.params.id))
        },

        rubrics() {
            return this.$store.getters['rubrics/getAllRubrics']                
        },

    },

    mounted(){
        this.$store.dispatch('advertisements/getAllAdverts')
        this.$store.dispatch('rubrics/getAllRubrics')
        this.$store.dispatch('users/getUser')
    }
}
</script>