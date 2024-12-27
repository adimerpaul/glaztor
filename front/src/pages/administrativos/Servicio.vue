<template>
  <q-page class="bg-grey-3 q-pa-xs">
      <q-card>
          <q-card-section class="q-pa-xs">
            <q-markup-table dense wrap-cells>
                  <thead>
                      <tr>
                          <th>ID</th>
                          <th>Nombre servicio</th>
                          <th>Periodo de pago</th>
                          <th>Monto</th>
                          <th>Monto cancelado</th>
                          <th>Numero de Recibo</th>
                          <th>observacion</th>
                          <th>Estado</th>
                          <th>Acciones</th>
                      </tr>
                  </thead>
                  <tbody>
                      <tr v-for="(servicio, index) in servicios" :key="servicio.id">
                          <td>{{ servicio.id }}</td>
                          <td>{{ servicio.nombre_servicio }}</td>
                          <td>{{ servicio.fecha_pago }}</td>
                          <td>{{ servicio.monto }}</td>
                          <td>{{ servicio.monto_cancelado }}</td>
                          <td>{{ servicio.numero_recibo }}</td>
                          <td>{{ servicio.observacion }}</td>


                          <td>{{ servicio.estado }}</td>
                          <td>
                              <q-btn @click="eliminar(servicio.id)" color="negative" size="xs" icon="delete" />
                              <q-btn @click="modificar(servicio)" class="glossy" rounded color="deep-orange" label="Modificar" />
                          </td>
                      </tr>
                  </tbody>
              </q-markup-table>
          </q-card-section>
      </q-card>
  </q-page>




  <q-page-sticky position="bottom-right" class="text-bold" :offset="[18, 18]">
      <q-btn fab icon="add" color="primary" @click="dialogClick" />
  </q-page-sticky>
  <q-dialog v-model="dialog"
      :position="esMovil ? undefined : 'right'"
      :maximized="true"
      transition-show="slide-left"
      transition-hide="slide-right">
      <q-card style="width: 450px; max-width: 100vw;">
          <q-card-section class="row items-center q-px-md bg-primary text-white q-px-none">
              <q-btn flat round dense icon="fa-solid fa-arrow-left" v-close-popup />
              <q-space />
              <div class="text-h6">{{ servicio.id ? 'Editar' : 'Nuevo' }} servicio</div>
          </q-card-section>
          <q-card-section>
              <q-form @submit.prevent="confirmarGuardar">
                  <div class="row">

                      <div class="col-12">
                          <q-select
                              dense
                              v-model="servicio.nombre_servicio"
                              :options="['LUZ', 'AGUA', 'ALQUILER', 'INTERNET', 'TELEFONIA', 'ALQUILER']"
                              outlined
                              :rules="[val => !!val || 'Este campo es requerido']"
                              label="Nombre servicio" />
                      </div>
                      <div class="col-12">
                          <q-select
                                  dense
                                  v-model="servicio.fecha_pago"
                                  :options="periodosPago"
                                  outlined
                                  label="Periodo de Pago"
                                  :rules="[val => !!val || 'Este campo es requerido']"
                              />
                       </div>
                       <div class="col-12">
                        <q-input dense v-model="servicio.monto" outlined label="monto" type="number" />
                       </div>
                       <div class="col-12">
                        <q-input dense v-model="servicio.monto_cancelado" outlined label="monto cancelado" type="number" />
                       </div>
                       <div class="col-12">
                          <q-input
                              dense
                              v-model="servicio.numero_recibo"
                              outlined
                              label="Numero de Recibo"
                              @input="servicio.numero_recibo = servicio.numero_recibo.toUpperCase()"
                              style="text-transform: uppercase;" />
                      </div>

                      <div class="col-12">
                          <q-input
                              dense
                              v-model="servicio.observacion"
                              outlined
                              label="observacion"
                              @input="servicio.observacion = servicio.observacion.toUpperCase()"
                              style="text-transform: uppercase;" />
                      </div>




                      <div class="col-12">
                          <q-select
                              dense
                              v-model="servicio.estado"
                              :options="['CANCELADO', 'PENDIENTE']"
                              outlined
                              :rules="[val => !!val || 'Este campo es requerido']"
                              label="Estado" />
                      </div>
                      <q-card-actions align="right">
                          <q-btn label="Cancelar" color="negative" @click="dialog = false" :loading="loading" />
                          <q-btn label="Guardar" color="primary" type="submit" :loading="loading" />
                      </q-card-actions>
                  </div>
              </q-form>
          </q-card-section>
      </q-card>
  </q-dialog>

</template>

<script>
import moment from "moment";
import "moment/locale/es"; // Importar español
moment.locale("es"); // Configurar idioma por defect

export default {

  name: 'servicios',

  data() {
  return {
      servicios: [],
      servicio: {},
      dialog: false,
      loading: false,
      periodosPago: this.generarPeriodos(), // Lista dinámica de períodos
  };
  },
  mounted() {
  moment.locale("es"); // Forzar idioma español al montar el componente
  this.getServicios();
  },
  methods: {
      modificar(servicio) {
          this.servicio = { ...servicio }; // Clonamos el objeto region
          this.dialog = true; // Abrimos el diálogo
      },
      confirmarGuardar() {
          this.$q.dialog({
              title: 'Confirmar Guardado',
              message: '¿Estás seguro de que quieres guardar los cambios?',
              ok: { label: 'Sí', color: 'primary' },
              cancel: { label: 'No', color: 'negative' }
          }).onOk(() => {
              this.submit(); // Llamamos al método submit si el usuario confirma
          });
      },
      submit() {
  this.loading = true;

  const apiCall = this.servicio.id
      ? this.$axios.put(`servicios/${this.servicio.id}`, this.servicio)
      : this.$axios.post('servicios', this.servicio);

  apiCall
      .then(response => {
          if (response.status === 200 || response.status === 201) {
              if (this.servicio.id) {
                  const index = this.servicios.findIndex(r => r.id === this.servicio.id);
                  if (index !== -1) {
                      this.$set(this.servicios, index, response.data);
                  }
              } else {
                  this.servicios.push(response.data);
              }

              this.$q.notify({
                  color: 'positive',
                  message: 'Servicio guardado exitosamente.',
                  icon: 'check_circle'
              });
              this.dialog = false; // Cerrar el diálogo después de guardar
          }
      })
      .catch(error => {
          console.error("Error al guardar el servicio:", error);
          this.$q.notify({
              color: 'negative',
              message: 'Error al guardar el servicio. Intenta nuevamente.',
              icon: 'report_problem'
          });
      })
      .finally(() => {
          this.loading = false;
          this.getServicios(); // Refresca la lista después de guardar
      });
  },

      eliminar(id) {
          this.$q.dialog({
              title: 'Eliminar servicio',
              message: '¿Estás seguro de que quieres eliminar esta servicio?',
              ok: { label: 'Eliminar', color: 'negative' },
              cancel: true
          }).onOk(() => {
              this.loading = true;
              this.$axios.delete(`servicios/${id}`)
                  .then(response => {
                      this.servicios = this.servicios.filter(servicio => servicio.id !== id);
                      this.$q.notify({
                          color: 'positive',
                          message: 'servicio eliminada exitosamente.',
                          icon: 'check_circle'
                      });
                  })
                  .catch(error => {
                      console.error("Error al eliminar la servicio:", error);
                      this.$q.notify({
                          color: 'negative',
                          message: 'Error al eliminar la región. Intenta nuevamente.',
                          icon: 'report_problem'
                      });
                  })
                  .finally(() => {
                      this.loading = false;
                  });
          });
      },
      dialogClick() {
          this.dialog = true;
          this.servicio = {
              nombre_servicio: '',
              fecha_pago: '',
              monto: '',
              monto_cancelado: '',
              numero_recibo: '',
              observacion: '',
              estado: '',
          };
      },
      getServicios() {
          this.$axios.get('servicios')
              .then(response => {
                  this.servicios = response.data.map(servicio => ({
                      ...servicio,
                      fecha_pago: moment(servicio.fecha_pago, "YYYY-MM-DD").locale("es").format("MMMM - YYYY"),
                  }));
              })
              .catch(error => {
                  console.error("Error al obtener los servicios:", error);
              });
      },

      getServicios() {
          this.$axios.get('servicios')
              .then(response => {
                  this.servicios = response.data.map(servicio => ({
                      ...servicio,
                      fecha_pago: moment(servicio.fecha_pago).locale("es").format("MMMM - YYYY"),
                  }));
              })
              .catch(error => {
                  console.error("Error al obtener los servicios:", error);
              });
      },
      generarPeriodos() {
              const periodos = [];
              const hoy = moment(); // Fecha actual
              const inicio = hoy.clone().subtract(5, "years"); // 5 años atrás
              const fin = hoy.clone().add(2, "years"); // 2 años adelante

              while (inicio.isSameOrBefore(fin)) {
                  periodos.push(inicio.locale("es").format("MMMM - YYYY")); // Asegura el idioma
                  inicio.add(1, "months"); // Avanza un mes
              }

              return periodos;
          },
          confirmarGuardar() {
            const fechaEstandarizada = moment(this.servicio.fecha_pago, "MMMM - YYYY").format("YYYY-MM-DD");
              this.servicio.fecha_pago = fechaEstandarizada;

              this.$q.dialog({
                  title: 'Confirmar Guardado',
                  message: '¿Estás seguro de que quieres guardar los cambios?',
                  ok: { label: 'Sí', color: 'primary' },
                  cancel: { label: 'No', color: 'negative' }
              }).onOk(() => {
                  this.submit(); // Llama al método submit para guardar
              });
          },
      formatPeriodoPago(fechaPago) {
          return moment(fechaPago).format("MMMM - YYYY");
      },
  getServicios() {
      this.$axios.get('servicios')
          .then(response => {
              this.servicios = response.data.map(servicio => ({
                  ...servicio,
                  fecha_pago: this.formatPeriodoPago(servicio.fecha_pago), // Formatea las fechas al cargar
              }));
          })
          .catch(error => {
              console.error("Error al obtener los servicios:", error);
          });
  },

  },
  computed: {
      esMovil() {
          return this.$q.screen.lt.md;
      }
  }
};
</script>

<style scoped>
.styled-table {
width: 100%;
border-collapse: collapse;
border-radius: 8px;
overflow: hidden;
box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.styled-table th,
.styled-table td {
padding: 12px;
text-align: left;
}

.styled-table thead {
background-color: #3442a8;
color: white;
}

.styled-table tbody tr {
transition: background-color 0.3s;
}

.styled-table tbody tr:nth-child(even) {
background-color: #f9f9f9;
}

.styled-table tbody tr:hover {
background-color: #e3e3e3;
}
</style>
