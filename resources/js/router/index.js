import Vue from "vue";
import VueRouter from "vue-router";

import Home from '../pages/Home.vue'
import Create from '../pages/Create.vue'
import Show from '../pages/Show.vue'
import Dashboard from '../pages/Dashboard.vue'

import Login from '../pages/Auth/Login.vue'
import Register from '../pages/Auth/Register.vue'



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
            path: "/dashboard",
            name: "Dashboard",
            component: Dashboard
        }
    ]
});
