import axios from 'axios';
import router from '../router';

export const users = {
    namespaced: true,

    state: () => ({
        user: [],
        loggedIn: false
    }),

    mutations: {

        SET_USER(state, payload){
            state.user = payload;
            state.loggedIn = true;
        },

        DESTOY_USER(state){
            state.user = []
            loggedIn = false
        }
    },

    getters: {
        getUser(state){
            return state.user;
        },

        getLoginState(state){
            return state.loggedIn;
        }
    },

    actions: {
        getUser({commit}){
            axios.get('/api/user').then(response => {
                commit('SET_USER', response.data)
            }).catch(error => console.log(error))
        },
        
        destroyUser({commit}){
            commit('DESTROY_USER');
        },

        registerUser({commit}, payload){
            axios.post('/api/register', payload)
                .then((response) =>{
                    commit('SET_USER', response.data.user)
                    setTimeout(() => {
                        router.push({path: `/dashboard/${response.data.user.id}`})    
                    }, 200);
                    
                })
                .catch((error) => {
                    console.log(error);
                })
        },

        loginUser({commit}, payload){
            axios.post('/api/login', payload)
                .then((response) =>{
                    commit('SET_USER', response.data.user)
                        router.push({path: `/dashboard/${response.data.user.id}`})                  
            })
            .catch((error) => {
                console.log(error);
            })
        }
    }
}
