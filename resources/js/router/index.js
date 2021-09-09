import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store/index";

import Home from '../pages/Home.vue'
import Create from '../pages/Create.vue'
import Show from '../pages/Show.vue'
import Dashboard from '../pages/Dashboard.vue'
import Edit from '../pages/Edit.vue'

import Login from '../pages/Auth/Login.vue'
import Register from '../pages/Auth/Register.vue'
import { users } from "../store/users";



Vue.use(VueRouter);

export default new VueRouter({
    routes: [
        {
            path: "/",
            name: "Home",
            component: Home
        },

        {
            path: "/create",
            name: "Create",
            component: Create
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
            path: "/dashboard/:id",
            name: "Dashboard",
            component: Dashboard,
            beforeEnter: (to, from, next) => {
                const user = store.getters['users/getUser'].id;
                const loggedIn = store.getters['users/getUser'].id;
                if (to.name === 'Dashboard' && user === loggedIn) next({path: `/dashboard/${user}`})
                else next({name: "Home"})
            }
        },

        {
            path: "/edit/:id",
            name: "Edit",
            component: Edit
        }
    ]
});

