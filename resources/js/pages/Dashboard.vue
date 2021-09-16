<template>
    <div>
        <div class="flex m ab shadow-lg" v-for="advert in userAdverts" :key="advert.id">
            <p class="m">{{advert.title}}</p>
            <div>
            <router-link class="m a"
            :to="`/edit/${advert.id}/${advert.user_id}`">Edit
            </router-link>
            <a class="m a" @click.prevent="destroyAdvert(advert.id)">Delete</a>
            <button class="m" :to="{name: 'SetTop'}">Be On Top</button>
            <ul>
                <li v-for="bids in advert.bids" :key="bids.id">
                    <span v-html="'&#8364;'"></span>
                    {{bids.bid}}
                </li>
            </ul>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import router from '../router';

export default {
    data() {
        return {
            advert: {
                id: 0
            }
        }
    },

    methods: {
        destroyAdvert(id){
            axios.delete(`/api/delete/${id}`)
                .then(() => { 
                    router.push({name: "Home"})
            })
                .catch((error) => {
                    console.log(error)
            })
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

    ul{
        border: 2px solid black;
        padding: 20px
    }

    p {
        width: 450px;
    }

    .m{
        margin: 20px;
    }
    
    a{
        align-content: center;
        text-align: center;
        text-decoration: none;
        color: black;
        justify-content: center;
        padding: 0 20px;
        height: 30px;
        width: 90px;
        border: 2px solid rgb(43, 55, 122);
        border-radius: 50px;
        background-color: white;
        transition: 200ms ease-in-out;
        transition-delay: 200ms;
    }

    a:hover{
        background-color: rgb(43, 55, 122);
        color: white;
    }

    button{
        padding: 0 5px;
        height: 25px;
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