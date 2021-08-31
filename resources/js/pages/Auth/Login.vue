<template>
    <div>
        <form v-on:submit.prevent="submitLogin">
            <label for="email">Email</label>
            <input type="email" name="email" id="email" v-model="login.email" required autofocus>
            <label for="password">Password</label>
            <input type="password" name="password" id="password" v-model="login.password" required autofocus>
            <button type="submit">Submit</button>
        </form>
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

    },

    computed: {

    }
}
</script>
