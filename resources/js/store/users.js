import axios from 'axios';
import router from '../router';

export const users = {
    namespaced: true,

    state: () => ({
        user: []
    }),

    mutations: {
        SET_USER(state, payload){
            state.user = payload;
            console.log(state.user);
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
                commit('SET_USER', response.data.user)
            }).catch(error => console.log(error))
        },

        loginUser({commit}, payload){
            axios.post('api/login', payload)
                .then((response) =>{
                    console.log(response)
                    commit('SET_USER', response.data.user)
                    router.push({name: 'Home'})
            })
            .catch((error) => {
                console.log(error);
            })
        }
    }
}