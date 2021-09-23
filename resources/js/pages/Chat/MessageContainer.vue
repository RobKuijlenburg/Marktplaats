<template>
    <div>
        <div class="mc">
            <div v-for="(message, index) in messages" :key="index">
                <message-item-vue :message="message"></message-item-vue>
            </div>
        </div>
    </div>
</template>

<script>
import MessageItemVue from './MessageItem.vue'

export default {
    components: {
        MessageItemVue
    },
    props: ['messages'],
}
</script>

<style scoped>
    .mc{
        height: 500px;
        padding: 0.5rem;
        display: flex;
        flex-direction: column-reverse;
        overflow: scroll;
    }
</style>