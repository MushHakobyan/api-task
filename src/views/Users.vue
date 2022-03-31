<template>
  <div>
    <template v-if="!items.length">
      <h2 class="text-center">NO DATA</h2>
    </template>
    <template v-else>
      <b-button size="sm" variant="primary" @click="openModal">Create User</b-button>
      <b-table striped hover :items="items" :fields="fields">
        <template #cell(n)="{ index }">{{ index + 1 + page * perPage - ($route.query.per_page || 5)}}</template>
        <template #cell(avatar)="{ item }">
            <router-link :to="'users/' + item.id">
              <b-avatar :src="item.avatar"></b-avatar>
            </router-link>          
        </template>
        <template #cell(full_name)="{ item }">
            <router-link :to="'users/' + item.id">{{item.first_name + ' ' + item.last_name}}</router-link>
        </template>
        <template #cell(actions)="{ item }">
            <b-button variant="text" @click="openEditModal(item.id)">
                <b-icon icon="pencil" title="Edit" variant="warning"></b-icon>
            </b-button>
            <b-button variant="text" @click="openDeleteModal(item.id)">
                <b-icon icon="trash" title="Delete" variant="danger"></b-icon>
            </b-button>
        </template>
      </b-table>
      <b-pagination
        v-model="page"
        :total-rows="total"
        :per-page="perPage"
        align="center"
        @change="changePage"
      ></b-pagination>
      <b-modal id="delete">
          <template #modal-header>
              <h5>Delete User</h5>
          </template>
          <p>Are you sure?</p>
          <template #modal-footer="{ cancel }">
              <b-button size="sm" @click="cancel()">Cancel</b-button>
              <b-button size="sm" variant="success" @click="deleteUser">OK</b-button>
          </template>
      </b-modal>
      <b-modal id="create">
          <template #modal-header>
              <h5>Create User</h5>
          </template>
          <div>
            <b-form-group
              label="Name"
              label-for="name"
              invalid-feedback="Enter your name!"
              :state="nameState"
              class="mb-3"
            >
              <b-form-input id="name" v-model="name" trim @input="valName"></b-form-input>
            </b-form-group>
            <b-form-group
              label="Job"
              label-for="job"
              invalid-feedback="Enter your job!"
              :state="jobState"
            >
              <b-form-input id="job" v-model="job" trim @input="valJob"></b-form-input>
            </b-form-group>
          </div>
          <template #modal-footer="{ cancel }">
              <b-button size="sm" @click="cancel()">Cancel</b-button>
              <b-button size="sm" variant="success" @click="createUser">Save</b-button>
          </template>
      </b-modal>
      <b-modal id="edit">
          <template #modal-header>
              <h5>Edit User</h5>
          </template>
          <div>
            <b-form-group
              label="Name"
              label-for="name"
              class="mb-3"
            >
              <b-form-input id="name" v-model="name" trim></b-form-input>
            </b-form-group>
            <b-form-group
              label="Job"
              label-for="job"
            >
              <b-form-input id="job" v-model="job" trim></b-form-input>
            </b-form-group>
          </div>
          <template #modal-footer="{ cancel }">
              <b-button size="sm" @click="cancel()">Cancel</b-button>
              <b-button size="sm" variant="success" @click="editUser">Edit</b-button>
          </template>
      </b-modal>
    </template>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        page: 1,
        total: 100,
        perPage: 5,
        userId: null,
        name: '',
        job: '',
        nameState: true,
        jobState: true,
        items: [],
        fields: ['n', 'avatar', 'full_name', 'email', 'actions']
      }
    },
    computed: {
      state() {
        return this.name.length > 0
      },
    },
    watch: {
      "$route": {
        immediate: true,
        handler(val) {
          let query = ''
          if (val.fullPath.split('?')[1]) {
            query = '?' + val.fullPath.split('?')[1]
          } else {
            query = '?page=1&per_page=5'
          }
          this.getAllUsers(query)
        }
      }
    },
    methods: {
      getAllUsers(query) {
        this.$store.dispatch('getAllUsers', query)
          .then(data => {
            this.page = data.page,
            this.perPage = data.per_page
            this.total = data.total
            this.items = data.data
          })
      },
      changePage(page) {
        this.$router.push(`users?page=${page}&per_page=${this.perPage}`)
      },
      openDeleteModal(id) {
          this.userId = id
          this.$bvModal.show('delete')
      },
      deleteUser() {
          this.$store.dispatch('deleteUser', this.userId)
          this.items = this.items.filter(e => e.id !== this.userId)
          this.$bvModal.hide('delete')
          this.userId = null
      },
      openEditModal(id) {
        let user = this.items.find(el => el.id === id)
        this.name = user.first_name
        this.job = user?.job || ''
        this.$bvModal.show('edit')
      },
      editUser() {
        let body = {
            name: this.name,
            job: this.job
          }
          this.$store.dispatch('editUser', body)
          this.$bvModal.hide('edit')
          this.name = ''
          this.job = ''
      },
      openModal() {
        this.name = ''
        this.job = ''
        this.$bvModal.show('create')
      },
      createUser() {
        if (this.name && this.job) {
          let body = {
            name: this.name,
            job: this.job
          }
          this.$store.dispatch('createUser', body)
          this.$bvModal.hide('create')
          this.name = ''
          this.job = ''
        } else {
          this.valName()
          this.valJob()
        }
      },
      valName() {
        this.name ? this.nameState = true : this.nameState = false
      },
      valJob() {
        this.job ? this.jobState = true : this.jobState = false
      }
    }
  }
</script>