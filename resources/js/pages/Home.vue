<template>
    <div>
        <span>{{getUser}}</span>
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
        },

        getUser(){
            console.log(this.$store)
            return this.$store.getters['users/getUser'];
        }
    },
    mounted(){
        this.$store.dispatch('advertisements/getAllAdverts');
        this.$store.dispatch('users/getUser');
    }
}
</script>
