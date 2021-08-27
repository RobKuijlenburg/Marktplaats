import axios from "axios";
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        adverts: [],
        rubrics: []
    },
    mutations: {
        SET_ALL_ADVERTS(state, payload){
            state.adverts = payload
        },

        SET_ALL_RUBRICS(state, payload){
            state.rubrics = payload
        }
    },
    getters: {
        getAllAdverts(state){
            return state.adverts;
        },

        getAllRubrics(state){
            return state.rubrics;
        }
    },
    actions: {
        getAllAdverts({commit}){
            axios.get('api/advertisements').then(response => {
                commit('SET_ALL_ADVERTS', response.data.advertisements)
            }).catch(error => console.log(error))
        },

        getAllRubrics({commit}){
            axios.get('api/rubrics').then(response => {
                commit('SET_ALL_RUBRICS', response.data.rubrics)
            }).catch(error => console.log(error))
        }
    }
});
