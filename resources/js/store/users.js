import axios from 'axios';
import router from '../router';

export const users = {
    namespaced: true,

    state: () => ({
        user: [],
    }),

    mutations: {

        SET_USER(state, payload){
            state.user = payload;
        }
    },

    getters: {
        getUser(state){
            return state.user;
        }
    },

    actions: {
        getUser({commit}){
            axios.get('api/user').then(response => {
                commit('SET_USER', response.data)
            }).catch(error => console.log(error))
        },

        registerUser({commit}, payload){
            axios.post('api/register', payload)
                .then((response) =>{
                    console.log(response.data);
                    commit('SET_USER', response.data.user)
                    router.push({name: 'Dashboard'})
                })
                .catch((error) => {
                    console.log(error);
                })
        },

        loginUser({commit}, payload){
            axios.post('api/login', payload)
                .then((response) =>{
                    commit('SET_USER', response.data.user)
                    router.push({name: 'Dashboard'})
            })
            .catch((error) => {
                console.log(error);
            })
        }
    }
}