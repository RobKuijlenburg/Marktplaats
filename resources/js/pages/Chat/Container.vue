<template>
    <div>
        <div>
            <h2 class="font-semibold text-xl text-gray-800 leading-tight">
                Chat
            </h2>
        </div>
        <div>
            <div>
                <div>
                    <message-container :messages="messages"/>
                    <input-message 
                        :room="currentRoom"
                        v-on:messagesent="getMessages"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import MessageContainer from './MessageContainer.vue'
import InputMessage from './InputMessage.vue'
import axios from 'axios'

export default {
    components: {
        MessageContainer,
        InputMessage,
    },

    data(){
        return {
            chatRooms: [],
            currentRoom: [],
            messages: [],

        }
    },

    methods: {
        getRooms(){
            axios.get('/api/chat/rooms')
            .then( response => {
               
                this.chatRooms = response.data.rooms;
                this.setRoom (response.data.rooms[0]);
            })
            .catch( error => {
                console.log( error );
            })
        }, 
        setRoom( room ) {
            this.currentRoom = room;
            this.getMessages();
        },
        getMessages() {
            axios.get('/api/chat/room/' + this.currentRoom.id + '/messages')
                .then( response => {
                    this.messages = response.data.messages;
                })
                .catch( error => {
                    console.log( error );
                })
        }
    },

    created(){
        this.getRooms();
    }
}
</script>

