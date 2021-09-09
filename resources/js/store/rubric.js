import axios from "axios";


export const rubrics = {
    namespaced: true,

    state: {
        rubrics: []
    },

    mutations: {
        SET_ALL_RUBRICS(state, payload){
            state.rubrics = payload
        }
    },

    getters: {

        getAllRubrics(state){
            return state.rubrics;
        },

        getAdvertRubrics: (state) => (id) => {
            return state.rubrics.filter(rubric => rubric.advertisement_id === id);
        }

    },

    actions: {

        getAllRubrics({commit}){
            axios.get('api/rubrics').then(response => {
                commit('SET_ALL_RUBRICS', response.data.rubrics)
            }).catch(error => console.log(error))
        }

    }
}