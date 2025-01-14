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
            <q-btn color="primary" label="Consultar" @click="getMetasUser" no-caps icon="search" :loading="loading" />
          </div>
          <div class="col-6 col-md-6 text-right">
            <q-btn color="green" label="Agregar" @click="addMeta" no-caps icon="add" :loading="loading" />
          </div>
          <div class="col-12">
            <q-markup-table dense wrap-cells>
              <thead>
              <tr>
                <th>Usuario</th>
                <th>Meta</th>
                <th>Logrado</th>
                <th>Faltante</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="userMeta in usersMeta" :key="userMeta.id">
                <td>{{userMeta.name}}</td>
                <td style="width: 120px">
                  <div>
                    <q-input v-model="userMeta.pivot.meta" outlined dense type="number"
                             @update:modelValue="updateMeta(userMeta.pivot.meta, userMeta.pivot.user_id, userMeta.pivot.meta_id)"
                             debounce="500"
                    />
<!--                    <pre>{{userMeta.pivot}}</pre>-->
                  </div>
                </td>
                <td class="text-right">
                  <q-chip color="primary" class="text-white bg-green-8">
                  {{userMeta.sumaToneladas}}
                  </q-chip>
                </td>
                <td class="text-right">
                  <q-chip color="primary" class="text-white bg-red-8">
                  {{userMeta.pivot.meta - userMeta.sumaToneladas}}
                  </q-chip>
                </td>
              </tr>
              </tbody>
              <tfoot>
              <tr>
                <td class="text-bold text-right">Total</td>

                <td class="text-bold">
                  {{usersMeta.reduce((acc, userMeta) => acc + parseInt(userMeta.pivot.meta), 0)}}
                </td>
              </tr>
              </tfoot>
            </q-markup-table>
          </div>
          <div class="col-12 q-pa-xs">
            <apexchart type="bar" height="350" :options="chartOptions" :series="series"></apexchart>
          </div>
          <div class="col-12">
<!--            <pre>{{metas}}</pre>-->
<!--            <pre>{{users}}</pre>-->
<!--            <pre>{{usersMeta}}</pre>-->
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
 <!--          <pre>{{mes}}</pre>
          <pre>{{anio}}</pre>
          <pre>{{user}}</pre>-->
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
import VueApexCharts from "vue3-apexcharts";
moment.locale('es')
export default {
  name: 'Metas',
  components: {
    apexchart: VueApexCharts,
  },
  data () {
    return {
      series: [
      //   {
      //   name: 'Inflation',
      //   data: [2.3, 3.1, 4.0, 10.1, 4.0, 3.6, 3.2, 2.3, 1.4, 0.8, 0.5, 0.2]
      // }
      ],
      chartOptions: {
        chart: {
          type: "bar",
          height: 350,
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: "55%",
            endingShape: "rounded",
          },
        },
        dataLabels: {
          enabled: true,
        },
        xaxis: {
          categories: [], // Nombres de los usuarios
        },
        title: {
          text: "Metas y Toneladas por Usuario",
          align: "center",
        },
      },
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
    updateChart() {
      // Actualizar series y categorías del gráfico
      const categories = this.usersMeta.map((userMeta) => userMeta.name); // Extrae los nombres correctamente
      const metas = this.usersMeta.map((userMeta) =>
        parseInt(userMeta.pivot.meta || 0)
      );
      const toneladas = this.usersMeta.map(
        (userMeta) => parseInt(userMeta.sumaToneladas || 0)
      );

      this.series = [
        { name: "Meta", data: metas },
        { name: "Toneladas", data: toneladas },
      ];

      // Asegúrate de que `categories` esté bien asignado al gráfico
      this.chartOptions = {
        ...this.chartOptions, // Mantén el resto de las opciones existentes
        xaxis: {
          ...this.chartOptions.xaxis,
          categories, // Actualiza solo las categorías
        },
      };
    },
    updateMeta (meta, user_id, meta_id) {
      console.log(meta, user_id, meta_id)
      this.$axios.put(`metas/${meta_id}`, {
        meta,
        user_id
      })
        .then(response => {
          this.$alert.success('Meta actualizada')
        })
        .catch(error => {
          this.$alert.error(error.response.data.message)
        })
    },
    saveMeta () {
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
          this.usersMeta = response.data?.users
          this.updateChart()
          // console.log(response.data)
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
      this.loading = true
      this.$axios.get('metas')
        .then(response => {
          response.data.forEach(meta => {
            this.metas.push({
              id: meta.id,
              name: `${meta.mes} ${meta.anio}`,
              ...meta
            })
            if (this.meta.length === 0) {
              this.meta = this.metas[this.metas.length - 1].id
              this.getMetasUser()
            }
          })
        })
        .catch(error => {
          console.log(error)
        }).finally(() => {
          this.loading = false
        })
    }
  },
}
</script>
