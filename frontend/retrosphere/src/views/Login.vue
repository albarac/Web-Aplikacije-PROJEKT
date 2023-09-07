<template>
    <div class="login">
        <div class="container mt-5">
            <div class="row justify-content-center">
                <div class="col-md-6">
                    <div class="card">
                        <div class="card-header">Login</div>
                        <div class="card-body">
                            <div class="form-group">
                                <label for="email">Email</label>
                                <input type="email" id="email" class="form-control" required v-model="email" />
                            </div>
                            <div class="form-group">
                                <label for="password">Password</label>
                                <input type="password" id="password" class="form-control" required v-model="password" />
                            </div>
                            <button id="login" type="submit" class="btn btn-primary" @click="login()">Login</button>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios"
import store from "../store"
export default {
    data() {
        return {
            email: "",
            password: "",
            store,
        }
    },
    methods: {
        login() {
            let user = {
                Email: this.email,
                Password: this.password
            }
            axios.post('http://localhost:9000/login', user)
                .then(res => {
                    console.log(res)
                    if (res.data.token) {
                        localStorage.setItem('token', res.data.token)
                        this.$router.push({ name: 'home' })
                    }
                })
        }
    }
}



</script>

<style lang="scss" scoped>
#login {
    margin-top: 20px;
}
</style>