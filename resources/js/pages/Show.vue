<template>
    <div>

        <div class="flex">
            <div class="w-1/5 text-center content-center justify-center rounded-xl shadow-lg h-3/5 m-2 advert">
            <h1 class="text-2xl font-semibold"> {{advert.title}} </h1>
            <!-- @if (str_starts_with($article->img, 'http')) -->
            <img class="index_img m-auto" v-bind:src="advert.img" alt="">
            <p class="mt-2 mb-2 h-10 pl-4 pr-4">{{advert.body}}</p>

            </div>
            <div class="bids text-center content-center justify-center shadow-lg m-2">
                <ul>
                    <li v-for="bids in advert.bids" :key="bids.id">
                        <span v-html="'&#8364;'"></span>
                        {{bids.bid}}
                    </li>
                </ul>
                <form v-if="getLoggedIn" v-on:submit.prevent="placeBid">
                    <input type="number" v-model="bids.bid" step="any">
                    <button type="submit">Place Bid</button>
                </form>
            </div>
        </div>

    </div>
</template>

<script>
export default {
    data(){
        return {
            bids: {
                advertisement_id: parseInt(this.$route.params.id),
                bid: 0
            }
        }
    },

    methods: {
        placeBid(){
            this.$store.dispatch('bids/createBid', this.bids)
        }
    },

    computed: {
        advert(){
            return this.$store.getters['advertisements/getAdvert'](parseInt(this.$route.params.id));
        },

        getLoggedIn(){
            return this.$store.getters['users/getLoginState'];
        },

        getUser(){
            return this.$store.getters['users/getUser'];
        }
    },
    mounted(){
        this.$store.dispatch('advertisements/getAllAdverts');
        if(this.$store.getters['users/getLoginState'] === true){
        this.$store.dispatch('users/getUser');
        }
    }
}
</script>

<style scoped>
    .flex{
        display:flex;
    }
    .advert{
        width: 80%;
        padding: 20px 20px;
    }
    .bids {
        width: 20%;
    }
    .bids li{
        list-style: none;
    }
    

</style>