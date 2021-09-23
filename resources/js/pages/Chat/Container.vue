<template>
    <div>
        <div>
            <h2 class="font-semibold text-xl text-gray-800 leading-tight">
                <chat-room-selection-vue
                    v-if="currentRoom.id"
                    :rooms="chatRooms"
                    :currentRoom="currentRoom"
                    v-on:roomchanged="setRoom( $event )"
                />
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
import ChatRoomSelectionVue from './ChatRoomSelection.vue'
import axios from 'axios'


export default {
    components: {
        MessageContainer,
        InputMessage,
        ChatRoomSelectionVue
    },

    data(){
        return {
            chatRooms: [],
            currentRoom: [],
            messages: [],

        }
    },

    watch: {
        currentRoom( val, Oldval) {
            if( Oldval.id){
                this.disconnect( Oldval )
            }
            this.connect();
        }
    },

    methods: {
        connect() {
            if(this.currentRoom.id) {
                let vm = this;
                this.getMessages();
                window.Echo.private("chat."+this.currentRoom.id)
                .listen('NewChatMessage',e=>{
                vm.getMessages();
                // window.Echo.private("chat." + this.currentRoom.id)
                // .listen('.message.new', e => {
                //     vm.getMessages();
                })
            }
        },

        disconnect( room ) {
            window.Echo.leave("chat." + room.id );
        },

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

