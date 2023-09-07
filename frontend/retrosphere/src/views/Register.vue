<template>
    <div class="register">
        <div class="container mt-5">
            <div class="row justify-content-center">
                <div class="col-md-6">
                    <div class="card">
                        <div class="card-header">Register</div>
                        <div class="card-body">
                            <div class="form-group">
                                <label for="username">Username</label>
                                <input type="text" id="username" class="form-control" required v-model="username" />
                            </div>
                            <div class="form-group">
                                <label for="email">Email</label>
                                <input type="email" id="email" class="form-control" required v-model="email" />
                            </div>
                            <div class="form-group">
                                <label for="password">Password</label>
                                <input type="password" id="password" class="form-control" required v-model="password" />
                            </div>
                            <div class="form-group">
                                <label for="confirm-password">Confirm Password</label>
                                <input type="password" id="confirm-password" class="form-control" required
                                    v-model="confirmpass" />
                            </div>
                            <button id="register" type="submit" class="btn btn-primary"
                                @click="register()">Register</button>

                            <p id="error" v-if="errorCheck">
                                Korisnik postoji ili pogresna lozinka
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    data() {
        return {
            username: "",
            email: "",
            password: "",
            confirmpass: "",
            image: "",
            errorCheck: false,
        }
    },
    methods: {
        register() {
            if (this.password == this.confirmpass && this.password.length > 6) {
                let newUser = {
                    Username: this.username,
                    Email: this.email,
                    Password: this.password,
                    Image: this.image,
                }
                console.log(newUser)

                axios.post('http://localhost:9000/register', newUser)
                    .then(res => {
                        console.log("Response: ", res)
                        console.log("Error: ", res.data.status)
                        this.$router.push({ name: 'home' })
                    })
            } else {
                this.errorCheck = true;
            }

        }
    }
}


</script>

<style lang="scss" scoped>
#register {
    margin-top: 20px;
}

#error {
    color: red;
    margin-top: 10px;
}
</style>