<template>
    <div>
        <navigation/>
        <router-view/>
    </div>
</template>

<script>
import navigation from "./Components/Nav.vue"

export default {
    components: {
        navigation
    },

    data() {
        return {
        };
    },
};
</script>
