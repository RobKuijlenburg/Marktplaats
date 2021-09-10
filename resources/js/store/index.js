import axios from "axios";
import Vue from "vue";
import Vuex from "vuex";
import {advertisements} from "./advertisement";
import {rubrics} from "./rubric";
import {users} from "./users";
import {bids} from "./bids";

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        advertisements,
        rubrics,
        users,
        bids
    },
});

