import axios from "axios";
import Vue from "vue";
import Vuex from "vuex";
import {advertisements} from "./advertisement";
import {rubrics} from "./rubric"

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        advertisements,
        rubrics
    },
});

