<template>
    <div>
        <div>
            <input 
                type="text"
                v-model="message"
                @keyup.enter="sendMessage()"
                placeholder="Speak Minion...."
                />
            <button
                @click="sendMessage()"
                >
                Send
            </button>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    props: ['room'],

    data() {
        return {
            message: ''
        }
    },

    methods: {
        sendMessage() {
            if( this.message == '' ){
                return;
            }

            axios.post('/api/chat/room/' + this.room.id + '/message', {
                message: this.message
            })
            .then( response => {
                if( response.status == 201 ){
                    this.message = '';
                    this.$emit('messagesent');
                }
            })
            .catch(error => {
                console.log(error)
            })
        }
    }
}
</script>