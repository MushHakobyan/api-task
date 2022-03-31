<template>
    <b-card
        class="mb-2 col-12 col-lg-4 m-auto p-0"
        style="max-width: 50rem"
    >
        <b-card-body>
            <b-alert v-if="error" variant="danger" show>{{error}}</b-alert>
            <b-form @submit.prevent="login">
                 <div class="mb-3">
                    <b-form-group
                        label="Email"
                        label-for="email"
                        class="mb-3"
                        invalid-feedback="Incorrect email!"
                        :state="emailState"
                    >
                        <b-form-input type="email" id="email" v-model="email" trim @change="valEmail"></b-form-input>
                    </b-form-group>
                    <b-form-group
                        label="Password"
                        label-for="psw"
                        invalid-feedback="Password must be more than 6 characters!"
                        :state="pswState"
                    >
                        <b-form-input type="password" id="psw" v-model="psw" trim @change="valPsw"></b-form-input>
                    </b-form-group>
                </div>
                <div class="text-center">
                    <b-button variant="primary" type="submit">Login</b-button>
                </div>    
            </b-form>    
        </b-card-body>
    </b-card>
</template>

<script>
export default {
    name: 'Login',
    data() {
        return {
            email: '',
            psw: '',
            pswState: true,
            emailState: true
        }

    },
    computed: {
        error() {
            return this.$store.state.error
        }
    },
    methods: {
        login() {
            if (this.pswState && this.emailState && this.psw && this.email) {
                let body = {
                    email: this.email,
                    password: this.psw
                }
                this.$store.dispatch('login', body)
            } else {
                this.valPsw()
                this.valEmail()
            }
            
        },
        valPsw() {
            this.psw.length < 5 ? this.pswState = false : this.pswState = true
        },
        valEmail() {
            let regex = new RegExp('[a-z0-9]+@[a-z]+[a-z]{2,3}');
            this.email.match(regex) ? this.emailState = true: this.emailState = false
        
        }
    }
}
</script>