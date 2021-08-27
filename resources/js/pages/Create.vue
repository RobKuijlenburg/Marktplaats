<template>
    <div>
        <form action="" method="post">
        <!-- <input type="hidden" name="_token" :value="csrf"> -->
        <div v-for="rubric in allRubrics" :key="rubric.id" v-bind:value="rubric.value">
            <input type="checkbox"  :name="rubric.name" :id="rubric.name">
            <label :for="rubric.name">{{rubric.name}}</label>
        </div>

        <button type="submit">submit</button>
        </form>
    </div>
</template>

<script>
import axios from "axios";

export default {
    // data: () => ({
    //     csrf: document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
    // }),

    computed: {
           allRubrics(){
            return this.$store.getters.getAllRubrics;
        }
    },

    mounted(){
        this.$store.dispatch('getAllRubrics')
    }
}
</script>
