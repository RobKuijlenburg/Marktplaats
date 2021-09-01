import axios from 'axios';

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
                console.log(response.data)
                commit('SET_USER', response.data)
            }).catch(error => console.log(error))
        },

        loginUser({commit}, payload){
            axios.post('login', payload)
                .then((response) =>{
                    console.log(payload)
                    commit('SET_USER', payload)
            })
            .catch((error) => {
                console.log(error);
            })
        }
    }
}