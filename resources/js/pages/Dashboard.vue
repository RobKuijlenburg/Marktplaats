<template>
    <div>
        <div class="flex m" v-for="advert in userAdverts" :key="advert.id">
            <p class="m">{{advert.title}}</p>
            <router-link class="m"
            :to="`/edit/${advert.id}/${advert.user_id}`">Edit
            </router-link>
            <form v-on:submit.prevent="destroyAdvert">
                <button type="submit">Delete</button>
            </form>
            <button class="m" :to="{name: 'SetTop'}">Be On Top</button>
            <ul>
                <li v-for="bids in advert.bids" :key="bids.id">
                    <span v-html="'&#8364;'"></span>
                    {{bids.bid}}
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        destroyAdvert(){
            this.$store.dispatch('advertisments/destroyAdvert');
        }
    },

    computed: {
        getUser(){
            return this.$store.getters['users/getUser'];
        },

        userAdverts(){
            return this.$store.getters['advertisements/getUserAdvert'](parseInt(this.$route.params.id));
        },
    },
    
    mounted() {
        this.$store.dispatch('advertisements/getAllAdverts');
        this.$store.dispatch('users/getUser'); 
    }
}
</script>

<style scoped>
    .flex{
        display:flex;
    }

    p {
        width: 450px;
    }

    .m{
        margin: 20px;
    }

    button{
        height: 30px;
        width: 90px;
        border: 2px solid rgb(43, 55, 122);
        border-radius: 50px;
        background-color: white;
        transition: 200ms ease-in-out;
        transition-delay: 200ms;
    }

    button:hover{
        background-color: rgb(43, 55, 122);
        color: white;
    }

    li{
        list-style: none;
    }
</style>