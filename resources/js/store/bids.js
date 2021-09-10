import axios from "axios";

export const bids = {
    namespaced: true,

    state: () => ({
        bids: []
    }),

    mutations: {
        SET_ALL_BIDS(state, payload){
            state.bids = payload
        },
    },

    getters: {
        getBid: (state) => (id) => {
            return state.bids.find(bids => bids.advertisement_id === id)
        },

        getUserBids: (state) => (id) => {
            return state.bids.filter(bids => bids.user_id === id)
        }
    },

    actions: {
        getAllBids({commit}){
            axios.get('api/bids').then(response => {
                commit('SET_ALL_BIDS', response.data.bids)
            }).catch(error => console.log(error))
        },

        createBid({commit}, payload){
            axios.post('api/bids', payload)
                .then((response) =>{
                    commit('SET_ALL_BIDS', response.data.bids)
            })
            .catch((error) => {
                console.log(error);
            })
        },

        updateBid({commit}, payload){
            axios.put(`api/bids/${payload.id}`, payload)
                .then((response) => {
                    commit('SET_ALL_ADVERTS', response.data.bids)
            })
            .catch((error) => {
                console.log(error);
            })
        }
    },
}


