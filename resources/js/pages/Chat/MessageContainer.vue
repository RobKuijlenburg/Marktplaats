<template>
    <div>
        <div class="h-full p-2 flex flex-col-reverse overflow-scroll">
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