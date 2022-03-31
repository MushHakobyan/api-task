<template>
    <div class="row m-0">
        <template v-if="!user">
            <h2 class="text-center">User not found!</h2>
        </template>
        <template v-else>
            <b-card
                :img-src="user.avatar"
                img-alt="Image"
                img-top
                tag="article"
                class="mb-2 col-12 col-lg-4 m-auto p-0"
                style="max-width: 50rem"
            >
                <b-card-text>
                    <div>
                        <b>ID: </b>{{user.id}}
                    </div>
                    <div>
                        <b>First Name: </b>{{user.first_name}}
                    </div>
                    <div>
                        <b>Last Name: </b>{{user.last_name}}
                    </div>
                    <div>
                        <b>Email: </b>{{user.email}}
                    </div>
                </b-card-text>

                <b-button @click="$router.push('/users')">
                    <b-icon icon="arrow-left"></b-icon>
                    GO BACK
                </b-button>
            </b-card>
        </template>
    </div>
</template>

<script>
export default {
    name: 'User',
    props: ['id'],
    data() {
        return {
            user: null
        }
    },
    created() {
        this.$store.dispatch('getUser', this.id)
            .then(data => this.user = data.data)
    }
}
</script>