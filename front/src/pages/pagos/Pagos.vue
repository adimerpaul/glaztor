<template>
<q-page class="bg-grey-3 q-pa-xs">
      <q-card>
        <q-card-section class="q-pa-xs">
          <div class="row">
            <div class="col-6 col-md-3">
              <q-input
                  outlined
                  v-model="fechaInicio"
                  label="Fecha Inicio"
                  type="date"
                  color="white"
                  dense></q-input>
            </div>
            <div class="col-6 col-md-3">
              <q-input
                  outlined
                  v-model="fechaFin"
                  label="Fecha Fin"
                  type="date"
                  color="white"
                  dense
            ></q-input>
            </div>
            <div class="col-6 col-md-3 text-left">
              <q-btn
                  icon="search"
                  color="primary"
                  label="Buscar"
                  @click="getPedidos"
                  :loading="loading"
                  no-caps
              ></q-btn>
            </div>
            <div class="col-6 col-md-3 text-right">
              <q-btn
                icon="add_circle_outline"
                color="green"
                label="Nuevo Pedido"
                @click="addPedido"
                :loading="loading"
                no-caps
              ></q-btn>
            </div>
          </div>
        </q-card-section>
 </q-card>
 <q-card-section class="q-pa-none">
        <q-list dense class="rounded-borders">
          <template v-if="pedidos.length === 0">
            <q-item>
              <q-item-section>
                <q-item-label class="text-h6 text-grey">No hay pedidos</q-item-label>
              </q-item-section>
            </q-item>
          </template>
          <q-item
            v-for="pedido in pedidos"
            :key="pedido.id"
            @click="showPreventa(pedido)"
            clickable
            class="q-my-sm bg-white hover-bg-light-blue"
            style="border: 1px solid #e0e0e0; border-radius: 8px;"
          >
            <q-item-section>
              <q-item-label class="text-h6">
                {{ pedido.fecha.substring(0,10) || 'Sin propietario' }}
                <q-icon name="check_circle" :color="pedido.estado === 'PENDIENTE' ? 'red' : pedido.estado === 'ENTREGADO' ? 'green' : 'orange'"/>
              </q-item-label>
              <q-item-label class="text-subtitle1 text-grey">
                {{ pedido.direccion }}
                <q-chip>
                  {{ pedido.total }}
                </q-chip>
                <q-chip :color="pedido.totalPagado >= pedido.total ? 'positive' : 'negative'">
                  {{ pedido.totalPagado }}
                </q-chip>
              </q-item-label>
              <q-item-label class="text-caption text-positive">
                {{ pedido.cliente }} - {{ pedido.tipo_construccion }} - {{ pedido.user?.name }}
                - {{ pedido.fecha }}
              </q-item-label>
            </q-item-section>

            <q-item-section side>
              <q-icon name="arrow_forward"/>
            </q-item-section>
          </q-item>
<!--          <pre>{{pedidos}}</pre>-->
        </q-list>
      </q-card-section>

 </q-page>
 <q-dialog v-model="dialog"
            :position="esMovil ? undefined : 'right'"
            :maximized="true"
            transition-show="slide-left"
            transition-hide="slide-right"
  >
    <q-card style="width: 450px; max-width: 100vw;">
      <q-card-section class="row items-center q-px-md bg-primary text-white q-px-none">
        <q-btn flat round dense icon="fa-solid fa-arrow-left" v-close-popup />
        <q-space/>
        <div class="text-h6">{{ pedido.id ? 'Editar' : 'Nuevo' }} Pedido</div>
      </q-card-section>
      <q-card-section>
        <q-form @submit="submit">
          <div class="text-bold row items-center  ">
            <div>Pagos de {{ pedido.cliente }}</div>
            <q-space/>
            <q-btn
              size="11px"
              icon="add_circle_outline"
              color="green"
              dense
              label="Agregar Pago"
              @click="clickDialogPago"
              no-caps
            ></q-btn>
          </div>
          <div class="text-bold q-pa-xs">
            <label>Total</label>
            <div>{{ pedido.total }}</div>
          </div>
          <q-markup-table dense flat bordered wrap-cells>
            <thead>
            <tr>
              <th>Fecha</th>
              <th>Numero de Recibo</th>
              <th>Banco</th>
              <th>Subtotal</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="pago in pedido.pagos" :key="pago.id">
              <td>
                {{ pago.fecha_pago }}
                {{ pago.hora_pago }}
              </td>
              <td>
                {{ pago.numero_recibo }}
              </td>
              <td>
                <q-input v-model="pago.banco" dense filled style="width: 110px" :debounce="500" @update:modelValue="updatePago(pago)" />
              </td>
              <td>
                {{ pago.monto  }}
              </td>
            </tr>
            </tbody>
            <tfoot>
            <tr>
              <td colspan="3" class="text-right">Total</td>
              <td class="text-bold">
                {{ (pedido.pagos.reduce((acc, pago) => acc + parseFloat(pago.monto), 0)).toFixed(2) }}
              </td>
            </tr>
            </tfoot>
          </q-markup-table>
        </q-form>
<!--        <pre>{{pedido.pagos}}</pre>-->
      </q-card-section>

      </q-card>
    </q-dialog>
  <q-dialog v-model="dialogPagos">
    <q-card style="width: 450px; max-width: 100vw;">
      <q-card-section class="row items-center q-px-md bg-primary text-white q-px-none">
        <q-btn flat round dense icon="fa-solid fa-arrow-left" @click="dialogPagos = false" />
        <q-space/>
        <div class="text-h6">Agregar Pago</div>
      </q-card-section>
      <q-card-section>
        <q-form @submit="submitPago">
          <q-input
            v-model="pago.monto"
            outlined
            label="Monto"
            type="number"
            :rules="[val => !!val || 'Campo requerido']"
            dense
          ></q-input>
          <q-select
            v-model="pago.forma_pago"
            outlined
            label="Forma de Pago"
            dense
            :options="['EFECTIVO', 'TRANSFERENCIA', 'CHEQUE']"
            :rules="[val => !!val || 'Campo requerido']"
          ></q-select>
          <q-input
            v-model="pago.numero_recibo"
            outlined
            label="Número de Recibo"
            :rules="[val => !!val || 'Campo requerido']"
            dense
          ></q-input>
          <q-input
            v-model="pago.banco"
            outlined
            label="Banco"
            dense
            hint=""
          ></q-input>
          <q-btn
            type="submit"
            class="full-width"
            label="Agregar Pago"
            color="green"
            :loading="loading"
            no-caps
          ></q-btn>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>

  </template>

  <script>
  import moment from "moment";
  import { Loading } from 'quasar';

  export default {
    name: 'Pedidos',
    data() {
      return {
        loading: false,
        dialog: false,
        clientes: [],
        fechaInicio: moment().startOf('month').format('YYYY-MM-DD'),
        fechaFin: moment().endOf('month').format('YYYY-MM-DD'),
        zonas: [],
        pedidos: [],
        // pedido: {},
        productos: [],
        pedido: {
          producto_id: null,
        },
        dialogPagos: false,
        pago: {
          monto: '',
          forma_pago: 'EFECTIVO',
          numero_recibo: '',
          banco: '',
        }
      }
    },
    mounted() {
      this.getZonas()
      this.getPedidos()
      this.getClientes()
      this.getProductos();
    },
    methods: {
      updatePago(pago) {
        console.log(pago);
        this.$axios.put('pagos/' + pago.id, pago)
          .then(response => {
            this.$alert.success('Pago actualizado correctamente');
          }).catch(error => {
            console.log(error);
            this.$alert.error('Error al actualizar el pago');
          });
      },
      submitPago() {
        this.loading = true;
        this.$axios.post('pagos', {
          ...this.pago,
          pedido_id: this.pedido.id
        })
          .then(response => {
            this.dialogPagos = false;
            this.$alert.success('Pago agregado correctamente');
            this.pedido.pagos.push(response.data);
            this.getPedidos();
          }).catch(error => {
            console.log(error);
            this.$alert.error('Error al agregar el pago');
          }).finally(() => {
            this.loading = false;
          });
      },
      clickDialogPago() {
        this.dialogPagos = true;
        this.pago = {
          monto: '',
          forma_pago: 'EFECTIVO',
          numero_recibo: '',
          banco: '',
        }
      },
      getZonas() {
        this.$axios.get('zonas')
          .then(response => {
            this.zonas = response.data
          })
          .catch(error => {
            console.log(error)
          })
      },
      showPreventa(pedido) {
        this.pedido = {...pedido}
        this.dialog = true;
      },
      submit() {
        this.loading = true;
        this.$axios.put('pedidos/' + this.pedido.id, this.pedido)
          .then(response => {
            this.dialog = false;
            this.$alert.success('Pedido actualizado correctamente');
            this.getPedidos();
          }).catch(error => {
            console.log(error);
            this.$alert.error('Error al actualizar el pedido');
          }).finally(() => {
            this.loading = false;
          });
      },
      getProductos() {
        this.$axios.get('productos')
          .then(response => {
            this.productos = response.data;
          })
          .catch(error => {
            console.log(error);
          });
      },

      getClientes() {
        this.$axios.get('clientes')
          .then(response => {
            this.clientes = response.data
          })
          .catch(error => {
            console.log(error)
          })
      },
      addPedido() {
        this.$router.push({ name: 'pedidosPage' })
        // this.dialog = true
        // this.pedido = {
        //   fecha_hora: moment().format('YYYY-MM-DD HH:mm:ss'),
        //   cliente: '',
        //   tipo: '',
        //   producto: '',
        //   cantidad: 0,
        //   precio: 0,
        //   factura: '',
        //   nombre_factura: '',
        //   nit_factura: '',
        //   direccion: '',
        //   contacto: '',
        //   telefono: '',
        //   telefono2: '',
        //   observacion: '',
        //   chofer: '',
        //   fecha_pago: moment().format('YYYY-MM-DD'),
        // }
      },
      getPedidos() {
        this.loading = true
        this.$axios.get('pedidosEntregados', {
          params: {
            fechaInicio: this.fechaInicio,
            fechaFin: this.fechaFin
          }
        }).then(response => {
            this.pedidos = response.data
            this.loading = false
          })
          .catch(error => {
            console.log(error)
            this.loading = false
          })
      },
    },
    computed: {
      esMovil() {
        return this.$q.screen.lt.md;
      }
    }
  }
</script>
