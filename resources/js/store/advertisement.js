// import store from "../store";
import axios from "axios";


export const advertisements = {
    namespaced: true,

    state: () => ({
        adverts: []
    }),

    mutations: {
        SET_ALL_ADVERTS(state, payload){
            state.adverts = payload
        },
    },

    getters: {
        getAllAdverts(state){
            return state.adverts;
        },

        getAdvert: (state) => (id) => {
            return state.adverts.find(advert => advert.id === id)
        },

        getUserAdvert: (state) => (id) => {
            return state.adverts.find(advert => advert.user_id === id)
        }
    },

    actions: {
        getAllAdverts({commit}){
            axios.get('api/advertisements').then(response => {
                commit('SET_ALL_ADVERTS', response.data.advertisements)
            }).catch(error => console.log(error))
        },

        createAdvertisement({commit}, payload){
            axios.post('api/advertisements', payload)
                .then((response) =>{
                    commit('SET_ALL_ADVERTS', response.data.advertisements)
            })
            .catch((error) => {
                console.log(error);
            })
        }
    },
}


