import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store/index";

import Home from '../pages/Home.vue'
import Create from '../pages/Create.vue'
import Show from '../pages/Show.vue'
import Dashboard from '../pages/Dashboard.vue'
import Edit from '../pages/Edit.vue'
import Search from '../pages/Search.vue'
import Chat from '../pages/Chat/Container.vue'
import Inbox from '../pages/Inbox.vue'

import Login from '../pages/Auth/Login.vue'
import Register from '../pages/Auth/Register.vue'
import { users } from "../store/users";




Vue.use(VueRouter);

export default new VueRouter({
    mode: 'history',
    routes: [
        {
            path: "/",
            name: "Home",
            component: Home
        },

        {
            path: "/create",
            name: "Create",
            component: Create,
            beforeEnter: (to, from , next) => {
                const loggedIn = store.getters['users/getLoginState'];
                if (loggedIn === true) 
                next()
                else next({name: "Home"})
            }
        },

        {
            path: "/login",
            name: "Login",
            component: Login
        },

        {
            path: "/show/:id",
            name: "Show",
            component: Show
        },

        {
            path: "/register",
            name: "Register",
            component: Register
        },

        {
            path: "/search",
            name: "Search",
            component: Search
        },

        {
            path: "/dashboard/:id",
            name: "Dashboard",
            component: Dashboard,
            beforeEnter: (to, from, next) => {       
                const userId = store.getters['users/getUser'].id;      
                const loggedIn = store.getters['users/getLoginState'];
                    if (loggedIn && parseInt(to.params.id) === userId) 
                        next()
                    else next({name: "Home"})
            }
        },

        {
            path: "/edit/:id/:user_id",
            name: "Edit",
            component: Edit,
            beforeEnter: (to, from, next) => {
                const loggedIn = store.getters['users/getLoginState'];
                const userId = store.getters['users/getUser'].id;
                const advertUserId = parseInt(to.params.user_id);
                    if(loggedIn && advertUserId === userId)
                        next()
                    else next({name: "Dashboard"});
            }
        },

        {
            path: "/chat",
            name: "Chat",
            component: Chat
        }
    ]
});

