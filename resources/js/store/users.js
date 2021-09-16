import axios from 'axios';
import router from '../router';

const user = JSON.parse(localStorage.getItem('user'));

export const users = {
    namespaced: true,

    state: () => ({
        user: user,
        loggedIn: !!user
    }),

    mutations: {

        SET_USER(state, payload){
            state.user = payload;
            state.loggedIn = true;
            localStorage.setItem('user', JSON.stringify(payload));
        },

        DESTROY_USER(state){
            state.user = []
            loggedIn = false
            localStorage.removeItem('user');
            router.push({name: "Home"})
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
            axios.post('/api/logout')
            .then(() => 
            commit('DESTROY_USER')   
            ) 
            .catch((error) =>{
                console.log(error);
            })
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
