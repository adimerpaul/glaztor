<template>
  <q-page class="bg-grey-3 q-pa-xs">
    <q-card>
      <q-card-section class="q-pa-xs">
        <div class="row">
          <div class="col-12 bg-black text-white q-pa-xs text-bold text-center">
            PAGOS CEMENTO
          </div>
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
          <div class="col-6 col-md-2 text-right">
            <q-input v-model="filter" outlined label="Buscar" dense>
              <template v-slot:prepend>
                <q-icon name="search"/>
              </template>
            </q-input>
          </div>
          <div class="col-6 col-md-2 text-left">
            <q-btn
              icon="search"
              color="primary"
              label="Buscar"
              @click="getPedidos"
              :loading="loading"
              no-caps
            ></q-btn>
          </div>
          <div class="col-6 col-md-2 text-right">
            <q-btn
              icon="download"
              color="green"
              label="Exportar"
              @click="exportExcel"
              no-caps
            ></q-btn>
          </div>
        </div>
      </q-card-section>
    </q-card>
    <q-card-section class="q-pa-none">
      <q-list dense class="rounded-borders">
        <template v-if="pedidosCemento.length === 0">
          <q-item>
            <q-item-section>
              <q-item-label class="text-h6 text-grey">No hay pedidosCemento</q-item-label>
            </q-item-section>
          </q-item>
        </template>
        <q-item
          v-for="pedido in pedidosCemento"
          :key="pedido.id"
          @click="showPreventa(pedido)"
          clickable
          class="q-my-sm bg-white hover-bg-light-blue"
          style="border: 1px solid #e0e0e0; border-radius: 8px;"
        >
          <q-item-section>
            <q-item-label class="text-h6">
              {{ pedido.fecha.substring(0, 10) || 'Sin propietario' }}
              <q-icon name="check_circle"
                      :color="pedido.estado === 'PENDIENTE' ? 'red' : pedido.estado === 'ENTREGADO' ? 'green' : 'blue'"/>
            </q-item-label>
            <q-item-label class="text-subtitle1 text-grey">
              {{ pedido.direccion }}
              <q-chip>
                {{ pedido.total }}
              </q-chip>
              <!--          <pre>{{pedidosCemento}}</pre>
              <q-chip :color="pedido.totalPagado >= pedido.total ? 'positive' : 'negative'" class="text-white">
                {{ pedido.totalPagado }}
              </q-chip>-->

              <q-chip :color="pedido.totalPagado >= pedido.total ? 'positive' : 'negative'" class="text-white">
                {{ (pedido.total - pedido.pagos.reduce((acc, pago) => acc + parseFloat(pago.monto), 0)).toFixed(2) }}
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
<!--                  <pre>{{pedidosCemento}}</pre>-->

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
        <q-btn flat round dense icon="fa-solid fa-arrow-left" v-close-popup/>
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
              v-if="$store.user.role === 'Cobranza' || $store.user.role === 'Admin'"
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
            <tr v-for="pago in pedido.pagos" :key="pago.id" @click="showPago(pago)">
              <td>
                {{ pago.fecha_pago }}
                {{ pago.hora_pago }}
              </td>
              <td>
                {{ pago.numero_recibo }}
              </td>
              <td>
                <!--                <q-input v-model="pago.banco" dense filled style="width: 110px" :debounce="500" @update:modelValue="updatePago(pago)" />-->
                {{ pago.banco }}
              </td>
              <td class="text-right">
                {{ pago.monto }}
              </td>
            </tr>
            </tbody>
            <tfoot>
            <tr>
              <td colspan="2">
                Deuda
                <span class="text-bold text-red">
                    {{
                    (pedido.total - pedido.pagos.reduce((acc, pago) => acc + parseFloat(pago.monto), 0)).toFixed(2)
                  }}
                  </span>
              </td>
              <td class="text-right">Total</td>
              <td class="text-bold text-right">
                {{ (pedido.pagos.reduce((acc, pago) => acc + parseFloat(pago.monto), 0)).toFixed(2) }}
              </td>
            </tr>
            </tfoot>
          </q-markup-table>
        </q-form>
<!--                <pre>{{pedido.pagos}}</pre>-->
      </q-card-section>

    </q-card>
  </q-dialog>
  <q-dialog v-model="dialogPagos">
    <q-card style="width: 450px; max-width: 100vw;">
      <q-card-section class="row items-center q-px-md bg-primary text-white q-px-none">
        <q-btn flat round dense icon="fa-solid fa-arrow-left" @click="dialogPagos = false"/>
        <q-space/>
        <div class="text-h6">
          {{ pago.id ? 'Editar' : 'Nuevo' }}
          Pago
        </div>
      </q-card-section>
      <q-card-section>
        <q-form @submit="submitPago">
          <!--          fecha_pago -->
          <q-input
            v-model="pago.fecha_pago"
            outlined
            label="Fecha de Pago"
            type="date"
            :rules="[val => !!val || 'Campo requerido']"
            dense
          ></q-input>
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
          <q-input
            v-model="pago.observacion"
            outlined
            label="Observacion"
            dense
            hint=""
          ></q-input>
          <q-btn
            type="submit"
            class="full-width"
            :label="pago.id ? 'Actualizar' : 'Agregar'"
            :color="pago.id ? 'primary' : 'green'"
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
import {Loading} from 'quasar';
import {Excel} from "src/addons/Excel";

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
      pedidosCemento: [],
      pedidosCementoAll: [],
      // pedido: {},
      productos: [],
      filter: '',
      pedido: {
        producto_id: null,
      },
      dialogPagos: false,
      pago: {
        monto: '',
        forma_pago: 'EFECTIVO',
        numero_recibo: '',
        banco: '',
        observacion: '',
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
    exportExcel() {
      let pedidosCementoProductos = []
      this.pedidosCemento.forEach(pedido => {
        pedido.detalles.forEach(detalle => {
          const deudaPendiente = pedido.total - pedido.pagos.reduce((acc, pago) => acc + parseFloat(pago.monto), 0);

          pedidosCementoProductos.push({
            created_at: moment(pedido.created_at).format("YYYY-MM-DD HH:mm:ss"),
            fecha: pedido.fecha,
            cliente: pedido.cliente,
            producto: detalle.producto.nombre_pro,
            cantidad: detalle.cantidad,
            precio: detalle.precio,
            subtotal: detalle.cantidad * detalle.precio,
            factura: pedido.factura,
            nombre_factura: pedido.nombre_factura,
            nit_factura: pedido.nit_factura,
            direccion: pedido.direccion,
            contacto: pedido.contacto,
            telefono: pedido.telefono,
            telefono2: pedido.telefono2,
            observacion: pedido.observacion,
            chofer: pedido.chofer,
            zona: pedido.zona,
            totalPagado: pedido.totalPagado,
            pagos: pedido.pagos.length,
            estado: pedido.estado,
            fecha_pago: pedido.fecha_pago,
            user: pedido.user?.name,
            total: pedido.total,
            pago1: pedido.pagos[0]?.monto,
            pago2: pedido.pagos[1]?.monto,
            pago3: pedido.pagos[2]?.monto,
            pago4: pedido.pagos[3]?.monto,
            pago5: pedido.pagos[4]?.monto,
            pago6: pedido.pagos[5]?.monto,
            pago7: pedido.pagos[6]?.monto,
            pago8: pedido.pagos[7]?.monto,
            numero_recibo1: pedido.pagos[0]?.numero_recibo,
            numero_recibo2: pedido.pagos[1]?.numero_recibo,
            numero_recibo3: pedido.pagos[2]?.numero_recibo,
            numero_recibo4: pedido.pagos[3]?.numero_recibo,
            numero_recibo5: pedido.pagos[4]?.numero_recibo,
            numero_recibo6: pedido.pagos[5]?.numero_recibo,
            numero_recibo7: pedido.pagos[6]?.numero_recibo,
            numero_recibo8: pedido.pagos[7]?.numero_recibo,
            fecha_pago1: pedido.pagos[0]?.fecha_pago,
            fecha_pago2: pedido.pagos[1]?.fecha_pago,
            fecha_pago3: pedido.pagos[2]?.fecha_pago,
            fecha_pago4: pedido.pagos[3]?.fecha_pago,
            fecha_pago5: pedido.pagos[4]?.fecha_pago,
            fecha_pago6: pedido.pagos[5]?.fecha_pago,
            fecha_pago7: pedido.pagos[6]?.fecha_pago,
            fecha_pago8: pedido.pagos[7]?.fecha_pago,
            banco1: pedido.pagos[0]?.banco,
            observacion1: pedido.pagos[0]?.observacion,
            banco2: pedido.pagos[1]?.banco,
            observacion2: pedido.pagos[1]?.observacion,
            banco3: pedido.pagos[2]?.banco,
            observacion3: pedido.pagos[2]?.observacion,
            banco4: pedido.pagos[3]?.banco,
            observacion4: pedido.pagos[3]?.observacion,
            banco5: pedido.pagos[4]?.banco,
            observacion5: pedido.pagos[4]?.observacion,
            banco6: pedido.pagos[5]?.banco,
            observacion6: pedido.pagos[5]?.observacion,
            banco7: pedido.pagos[6]?.banco,
            observacion7: pedido.pagos[6]?.observacion,
            banco8: pedido.pagos[7]?.banco,
            observacion8: pedido.pagos[7]?.observacion,
            deudaPendiente: deudaPendiente.toFixed(2),
          })
        })
      })
      // console.log(pedidosCementoProductos)
      let data = [{
        sheet: "Cobranza",
        columns: [
          {label: "Fecha del pedido", value: "created_at"},
          {label: "Fecha de Entrega", value: "fecha"},
          {label: "Cliente", value: "cliente"},
          {label: "Producto", value: "producto"},
          {label: "Cantidad", value: "cantidad"},
          {label: "Precio", value: "precio"},
          {label: "Direccion", value: "direccion"},
          {label: "Observacion", value: "observacion"},
          {label: "Zona", value: "zona"},
          {label: "Total", value: "total"},
          {label: "Estado", value: "estado"},
          {label: "Fecha Pago", value: "fecha_pago"},
          {label: "User", value: "user"},
          {label: "Pago 1", value: "pago1"},
          {label: "Numero Recibo 1", value: "numero_recibo1"},
          {label: "Fecha Pago 1", value: "fecha_pago1"},
          {label: "Banco 1", value: "banco1"},
          {label: "Observación 1", value: "observacion1"},
          {label: "Pago 2", value: "pago2"},
          {label: "Numero Recibo 2", value: "numero_recibo2"},
          {label: "Fecha Pago 2", value: "fecha_pago2"},
          {label: "Banco 2", value: "banco2"},
          {label: "Observación 2", value: "observacion2"},
          {label: "Pago 3", value: "pago3"},
          {label: "Numero Recibo 3", value: "numero_recibo3"},
          {label: "Fecha Pago 3", value: "fecha_pago3"},
          {label: "Banco 3", value: "banco3"},
          {label: "Observación 3", value: "observacion3"},
          {label: "Pago 4", value: "pago4"},
          {label: "Numero Recibo 4", value: "numero_recibo4"},
          {label: "Fecha Pago 4", value: "fecha_pago4"},
          {label: "Banco 4", value: "banco4"},
          {label: "Observación 4", value: "observacion4"},
          {label: "Pago 5", value: "pago5"},
          {label: "Numero Recibo 5", value: "numero_recibo5"},
          {label: "Fecha Pago 5", value: "fecha_pago5"},
          {label: "Banco 5", value: "banco5"},
          {label: "Observación 5", value: "observacion5"},
          {label: "Pago 6", value: "pago6"},
          {label: "Numero Recibo 6", value: "numero_recibo6"},
          {label: "Fecha Pago 6", value: "fecha_pago6"},
          {label: "Banco 6", value: "banco6"},
          {label: "Observación 6", value: "observacion6"},
          {label: "Pago 7", value: "pago7"},
          {label: "Numero Recibo 7", value: "numero_recibo7"},
          {label: "Fecha Pago 7", value: "fecha_pago7"},
          {label: "Banco 7", value: "banco7"},
          {label: "Observación 7", value: "observacion7"},
          {label: "Pago 8", value: "pago8"},
          {label: "Numero Recibo 8", value: "numero_recibo8"},
          {label: "Fecha Pago 8", value: "fecha_pago8"},
          {label: "Banco 8", value: "banco8"},
          {label: "Observación 8", value: "observacion8"},
          {label: "Total Pagado", value: "totalPagado"},
          {label: "Pagos", value: "pagos"},
          {label: 'Deuda Pendiente', value: 'deudaPendiente'},

        ],
        content: pedidosCementoProductos
      }]

      const excel = Excel.export(data, "Reporte de Cobranzas");

    },
    showPago(pago) {
      const user = this.$store.user;
      if (user.role === 'Administrador' || user.role === 'Ventas' || user.role === 'Director' || user.role === 'Supervisor') {
        return;
      }
      this.dialogPagos = true;
      this.pago = {...pago}
    },
    updatePago(pago) {
      console.log(pago);
      this.$axios.put('pagosCemento/' + pago.id, pago)
        .then(response => {
          this.$alert.success('Pago actualizado correctamente');
          this.getPedidos();
          this.dialogPagos = false;
          this.dialog = false;
        }).catch(error => {
        console.log(error);
        this.$alert.error('Error al actualizar el pago');
      }).finally(() => {
        this.loading = false;
      });
    },
    submitPago() {
      this.loading = true;

      if (this.pago.id) {
        this.updatePago(this.pago);
        return;
      }
      this.$axios.post('pagosCemento', {
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
        fecha_pago: moment().format('YYYY-MM-DD'),
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
      this.$axios.put('pedidosCemento/' + this.pedido.id, this.pedido)
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
      this.$router.push({name: 'pedidosCementoPage'})
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
      this.$axios.get('pedidosCementoEntregados', {
        params: {
          fechaInicio: this.fechaInicio,
          fechaFin: this.fechaFin,
          filter: this.filter
        }
      }).then(response => {
        this.pedidosCemento = response.data
        this.pedidosCementoAll = response.data
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
