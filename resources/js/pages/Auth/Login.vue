<template>
    <div>
        <div class="container">
            <div class="formcontainer">
                <h1>Login</h1>
                <form v-on:submit.prevent="submitLogin">
                    <label for="email">Email</label>
                    <input type="email" name="email" id="email" v-model="login.email" required autofocus>
                    <label for="password">Password</label>
                    <input type="password" name="password" id="password" v-model="login.password" required autofocus>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            login: {
                email: '',
                password: ''
            }
        }
    },

    methods: {
        submitLogin(){
            this.$store.dispatch('users/loginUser', this.login);
        }
    },

    computed: {
        getUser(){
            console.log(this.$store)
            return this.$store.getters['users/getUser'];
        }
    }
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
