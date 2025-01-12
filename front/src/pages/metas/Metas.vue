<template>
  <q-page class="bg-grey-3 q-pa-xs">
    <q-card>
      <q-card-section class="q-pa-xs">
        <div class="row">
          <div class="col-6 col-md-3">
            <q-select v-model="meta" :options="metas" label="Gestión" outlined dense
                      :rules="[val => val !== null || 'Seleccione una gestión']"
                      option-value="id" option-label="name"
                      emit-value map-options
            />
          </div>
          <div class="col-6 col-md-3 text-center">
            <q-btn color="primary" label="Consultar" @click="getMetasUser" no-caps icon="search" />
          </div>
          <div class="col-6 col-md-6 text-right">
            <q-btn color="green" label="Agregar" @click="addMeta" no-caps icon="add" />
          </div>
          <div class="col-12">
            <q-markup-table dense wrap-cells>
              <thead>
              <tr>
                <th>Usuario</th>
                <th>Meta</th>
                <th>Logrado</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="userMeta in usersMeta" :key="userMeta.id">
                <td>{{userMeta.name}}</td>
                <td class="text-right">
                  <q-input v-model="userMeta.pivot.meta" outlined dense type="number" style="width: 100px" />
                </td>
              </tr>
              </tbody>
              <tfoot>
              <tr>
                <td class="text-right">Total</td>
                <td>
                  {{usersMeta.reduce((acc, userMeta) => acc + parseInt(userMeta.pivot.meta), 0)}}
                </td>
              </tr>
              </tfoot>
            </q-markup-table>
          </div>
          <div class="col-12">
<!--            <pre>{{metas}}</pre>-->
<!--            <pre>{{users}}</pre>-->
            <pre>{{usersMeta}}</pre>
<!--            [-->
<!--            {-->
<!--            "id": 7,-->
<!--            "name": "adriana",-->
<!--            "username": "adriana",-->
<!--            "role": "Ventas",-->
<!--            "cargo": null,-->
<!--            "email": "adriana@gmail.com",-->
<!--            "email_verified_at": "2025-01-08T19:40:09.000000Z",-->
<!--            "pivot": {-->
<!--            "meta_id": 1,-->
<!--            "user_id": 7,-->
<!--            "meta": "0"-->
<!--            }-->
<!--            },-->
<!--            {-->
<!--            "id": 6,-->
<!--            "name": "zenaida",-->
<!--            "username": "zenaida",-->
<!--            "role": "Director",-->
<!--            "cargo": null,-->
<!--            "email": "zenaida@gmail.com",-->
<!--            "email_verified_at": "2025-01-08T19:40:09.000000Z",-->
<!--            "pivot": {-->
<!--            "meta_id": 1,-->
<!--            "user_id": 6,-->
<!--            "meta": "0"-->
<!--            }-->
<!--            }-->
<!--            ]-->
          </div>
        </div>
      </q-card-section>
    </q-card>
    <q-dialog v-model="dialogMeta">
      <q-card>
        <q-form @submit="saveMeta">
        <q-card-section class="q-pa-xs">
            <div class="text-h6">Agregar Meta</div>
        </q-card-section>
        <q-card-section>
              <q-input v-model="mes" label="Mes" outlined dense :options="meses" :rules="[val => val !== null || 'Seleccione un mes']" />
              <q-input v-model="anio" label="Año" outlined dense :options="anios" :rules="[val => val !== null || 'Seleccione un año']" />
              <q-select v-model="user" :options="users" label="Usuario" outlined dense
                        :rules="[val => val !== null || 'Seleccione un usuario']"
                        option-value="id" option-label="name"
                        emit-value map-options
              />
          <pre>{{mes}}</pre>
          <pre>{{anio}}</pre>
          <pre>{{user}}</pre>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn label="Cancelar" color="primary" flat @click="dialogMeta = false" :loading="loading" />
          <q-btn label="Guardar" color="primary" flat type="submit" :loading="loading" />
        </q-card-actions>
        </q-form>
      </q-card>
    </q-dialog>
  </q-page>
</template>
<script>
import moment from "moment";
moment.locale('es')
export default {
  name: 'Metas',
  data () {
    return {
      metas: [],
      meta: '',
      users: [],
      user: '',
      dialogMeta: false,
      meses : ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio','Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
      mes: '',
      anios: [],
      anio: moment().format('YYYY'),
      loading: false,
      usersMeta: []
    }
  },
  mounted () {
    for (let i = -5; i < 6; i++) {
      this.anios.push(parseInt(this.anio) + i)
    }
    let mesIndex = moment().format('M') - 1
    this.mes = this.meses[mesIndex]
    this.getMetas()
    this.getUsers()
  },
  methods: {
    saveMeta () {
      // if si user es vacio error
      if (this.user === '') {
        this.$alert.error('Seleccione un usuario')
        return false
      }
      this.loading = true
      this.$axios.post('metas', {
        mes: this.mes,
        anio: this.anio,
        user_id: this.user
      })
        .then(response => {
          this.dialogMeta = false
          this.getMetas()
        })
        .catch(error => {
          this.$alert.error(error.response.data.message)
        }).finally(() => {
          this.loading = false
        })
    },
    addMeta () {
      this.mes = this.meses[moment().format('M') - 1]
      this.anio = moment().format('YYYY')
      this.user = ''
      this.dialogMeta = true
    },
    getMetasUser () {
      if (this.meta === '') {
        this.$alert.error('Seleccione una gestión')
        return false
      }
      // let findMeta = this.metas.find(meta => meta.id === this.meta)
      // this.usersMeta = findMeta.users
      this.loading = true
      this.$axios.get(`metas/${this.meta}`)
        .then(response => {
          // this.usersMeta = response.data
          console.log(response.data)
        })
        .catch(error => {
          this.$alert.error(error.response.data.message)
        }).finally(() => {
          this.loading = false
        })
    },
    getUsers () {
      this.$axios.get('users')
        .then(response => {
          this.users = response.data
        })
        .catch(error => {
          console.log(error)
        })
    },
    getMetas () {
      this.metas = []
      this.$axios.get('metas')
        .then(response => {
          response.data.forEach(meta => {
            this.metas.push({
              id: meta.id,
              name: `${meta.mes} ${meta.anio}`,
              ...meta
            })
          })
        })
        .catch(error => {
          console.log(error)
        })
    }
  },
}
</script>
