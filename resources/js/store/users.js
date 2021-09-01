import axios from 'axios';

export const users = {
    namespaced: true,

    state: () => ({
        user: []
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
                commit('SET_USER', response.data.user)
            }).catch(error => console.log(error))
        },

        loginUser({commit}, payload){
            axios.post('login', payload)
                .then((response) =>{
                    commit('SET_USER', response.data.user)
            })
            .catch((error) => {
                console.log(error);
            })
        }
    }
}