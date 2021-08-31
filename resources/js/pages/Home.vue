<template>
    <div>
        <ul>
            <li v-for="advert in allAdverts" :key="advert.id">{{advert.title}}</li>
        </ul>
    </div>
</template>

<script>
export default {

    computed: {
        allAdverts(){
            console.log(this.$store)
            return this.$store.getters['advertisements/getAllAdverts'];
        }
    },
    mounted(){
        this.$store.dispatch('advertisements/getAllAdverts');
    }
}
</script>
