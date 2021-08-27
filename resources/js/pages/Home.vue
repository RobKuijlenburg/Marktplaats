<template>
    <div>
        Home Hello World
        <ul>
            <li v-for="advert in allAdverts" :key="advert.id">{{advert.title}}</li>
        </ul>
    </div>
</template>

<script>
export default {

    computed: {
        allAdverts(){
            return this.$store.getters.getAllAdverts;
        }
    },
    mounted(){
        this.$store.dispatch('getAllAdverts');
    }
}
</script>
