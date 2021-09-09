// import store from "../store";
import axios from "axios";


const removeAccents = (string) => {
    const mapAccentHex = {
        a: '/[\xE0-\xE6]/g',
        e: '/[\xE8-\xEB]/g',
        i: '/[\xEC-\xEF]/g',
        o: '/[\xF2-\xF6]/g',
        u: '/[\xF9-\xFC]/g',
        c: '/\xE7/g'
    }

    for (let letter in mapAccentHex){
        var regularExpression = mapAccentHex[letter]
        string = string.replace(regularExpression, letter)
    }

    return string
}

export const advertisements = {
    namespaced: true,

    state: () => ({
        adverts: [],
        advert: {},
        searchWord: null,
        filteredAdverts: null
    }),

    mutations: {
        SET_ALL_ADVERTS(state, payload){
            state.adverts = payload
        },

        FILTERED_ADVERTS(state, word){
            if (!(word) || word === '{}'){
                state.searchWord = null
                state.filteredAdverts = null
            } else {
                state.searchWord = word
                word = removeAccents(word.trim().toLowerCase())
                state.filteredAdverts = state.adverts.filter((advert) => {
                    return advert.title.toLowerCase().includes(word) || advert.body.toLowerCase().includes(word)
                })
            }
        }
    },

    getters: {
        getAllAdverts(state){
            return state.adverts;
        },

        getFilteredAdverts(state){
            return state.filteredAdverts
        },

        getSearchWord(state){
            return state.searchWord
        },

        getAdvert: (state) => (id) => {
            return state.adverts.find(advert => advert.id === id)
        },

        getUserAdvert: (state) => (id) => {
            return state.adverts.filter(advert => advert.user_id === id)
        }
    },

    actions: {
        getAllAdverts({commit}){
            axios.get('api/advertisements').then(response => {
                commit('SET_ALL_ADVERTS', response.data.advertisements)
            }).catch(error => console.log(error))
        },

        getFilteredAdverts({commit}, value){
            commit('FILTERED_ADVERTS', value)
        },

        createAdvertisement({commit}, payload){
            axios.post('api/advertisements', payload)
                .then((response) =>{
                    commit('SET_ALL_ADVERTS', response.data.advertisements)
            })
            .catch((error) => {
                console.log(error);
            })
        },

        // TODO:: request error waarschijnlijk bij storeadvertisementrequest. 

        updateAdvertisement({commit}, payload){
            axios.put(`api/advertisements/${payload.id}`, payload)
                .then((response) => {
                    commit('SET_ALL_ADVERTS', response.data.advertisements)
            })
            .catch((error) => {
                console.log(error);
            })
        }
    },
}


