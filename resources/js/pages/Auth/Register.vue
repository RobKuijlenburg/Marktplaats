<template>
    <div>
        <div class="container">
            <div class="formcontainer">
                <form v-on:submit.prevent="submitRegister">
                    <label for="name">Name</label>
                    <input type="text" name="name" id="name" v-model="register.name" required>
                    <label for="email">Email</label>
                    <input type="email" name="email" id="email" v-model="register.email" required>
                    <label for="password">Password</label>
                    <input type="password" name="password" id="password" v-model="register.password" required>
                    <label for="password_confirmation">Password</label>
                    <input type="password" name="password_confirmation" id="password_confirmation" v-model="register.password_confirmation" required>
                    <label for="postal_id">Postal id</label>
                    <input type="number" name="postal_id" id="postal_id" v-model="register.postalcode_id" required>
                    <button type="submit">Submit</button>
                    </form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            register: {
                name: '',
                email: '',
                password: '',
                password_confirmation: '',
                postalcode_id: 0     
            }
        }
    },

    methods: {
        submitRegister(){
            this.$store.dispatch('users/registerUser', this.register);
        }
    },

    computed: {

    },


}
</script>

<style scoped>
    .container {
        display: flex;
        align-items: center;
        border: 2px solid #333;
        width: 20%;
        padding: 20px 0 20px 0;
        border-radius: 25px;
        margin-top: 250px;
    }

    .formcontainer {
        justify-content: center;
        align-content: center;
        margin: auto;
        padding: auto;
    }

    input {
        border: 2px solid #333;
        border-radius: 25px;
        display: flex;
    }

    button{
        margin-top: 10px;
        border: 2px solid #333;
        background: white;
        border-radius: 25px;
    }
</style>