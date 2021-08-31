import Vue from "vue";
import VueRouter from "vue-router";

import Home from '../pages/Home.vue'
import Create from '../pages/Create.vue'

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
        }
    ]
});
