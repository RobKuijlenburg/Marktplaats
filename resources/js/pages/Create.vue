<template>
    <div>
        <form  class=" text-center content-center justify-center rounded-xl shadow-lg h-3/5 m-2 p-2" v-on:submit.prevent="submitAdvertisement">
        <input type="file" name="img" id="img" @change="addFile">
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
                img: null,
                title: '',
                body: '',
                rubrics: []
            }
        }
    },

    methods:{

        addFile(){
            const files = event.target.files
            console.log(files)
            let filename = File.name
            const fileReader = new FileReader()
            fileReader.addEventListener('load', () => {
            this.imageUrl = fileReader.result
            })
            fileReader.readAsDataURL(files[0])
            this.advertisement.img = files
        },
        submitAdvertisement(){
            const data = new FormData();
            data.append('body', this.advertisement.body);
            data.append('img', this.advertisement.img);
            data.append('rubrics', this.advertisement.rubrics);
            data.append('title', this.advertisement.title);
            console.log(data)
            this.$store.dispatch('advertisements/createAdvertisement', data)
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
