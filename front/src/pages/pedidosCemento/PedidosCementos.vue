<template>
  <q-page class="bg-grey-3 q-pa-xs">
    <q-card>
      <q-card-section class="q-pa-xs">
        <div class="row">
          <div class="col-6 col-md-2">
            <q-input
              outlined
              v-model="fechaInicio"
              label="Fecha Inicio"
              type="date"
              color="white"
              dense></q-input>
          </div>
          <div class="col-6 col-md-2">
            <q-input
              outlined
              v-model="fechaFin"
              label="Fecha Fin"
              type="date"
              color="white"
              dense
            ></q-input>
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
          <div class="col-6 col-md-2 text-left">
            <q-select v-model="estado" label="Estado" outlined dense :options="estados" @update:modelValue="getPedidosFilter">
              <template v-slot:after>
                <q-icon name="check_circle"
                        :color="estado === 'PENDIENTE' ? 'red' : estado === 'ENTREGADO' ? 'green' : estado === 'REZAGO' ? 'blue': 'orange'"/>
              </template>
            </q-select>
          </div>
          <div class="col-6 col-md-2 text-right">
            <q-btn
              icon="get_app"
              color="green"
              label="Excel"
              @click="exportExcel"
              :loading="loading"
              no-caps
            ></q-btn>
          </div>
          <div class="col-6 col-md-2 text-right">

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
                      :color="pedido.estado === 'PENDIENTE' ? 'red' : pedido.estado === 'ENTREGADO' ? 'green': pedido.estado === 'REZAGO' ? 'blue' : 'orange'"/>
            </q-item-label>
            <q-item-label class="text-subtitle1 text-grey">
              {{ pedido.direccion }}
              <q-chip>
                {{ pedido.total }}
              </q-chip>
              <!--                <pre>{{ pedido}}</pre>-->
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
<!--        <pre>{{pedidosCemento}}</pre>-->
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
        <q-form @submit="submit" :disable="$store.user.role == 'Ventas' || $store.user.role == 'Cobranza' || $store.user.role == 'Director' || $store.user.role == 'Supervisor'">
          <q-input v-model="pedido.fecha"
                   label="Fecha"
                   outlined
                   :disable="$store.user.role == 'Ventas' || $store.user.role == 'Cobranza' || $store.user.role == 'Director' || $store.user.role == 'Supervisor'"
                   dense
                   type="date"
          ></q-input>
          <q-input
            v-model="pedido.cliente"
            label="Cliente"
            outlined
            :disable="$store.user.role == 'Ventas' || $store.user.role == 'Cobranza' || $store.user.role == 'Director' || $store.user.role == 'Supervisor'"
            dense
          ></q-input>
          <q-input
            v-model="pedido.nombre_factura"
            label="Nombre Factura"
            outlined
            :disable="$store.user.role == 'Ventas' || $store.user.role == 'Cobranza' || $store.user.role == 'Director' || $store.user.role == 'Supervisor'"
            dense
          ></q-input>
          <q-input
            v-model="pedido.nit_factura"
            label="Nit Factura"
            outlined
            :disable="$store.user.role == 'Ventas' || $store.user.role == 'Cobranza' || $store.user.role == 'Director' || $store.user.role == 'Supervisor'"
            dense
          ></q-input>
          <q-input
            v-model="pedido.direccion"
            label="Direccion"
            outlined
            :disable="$store.user.role == 'Ventas' || $store.user.role == 'Cobranza' || $store.user.role == 'Director' || $store.user.role == 'Supervisor'"
            dense
          ></q-input>
          <q-input
            v-model="pedido.contacto"
            label="Contacto"
            outlined
            :disable="$store.user.role == 'Ventas' || $store.user.role == 'Cobranza' || $store.user.role == 'Director' || $store.user.role == 'Supervisor'"
            dense
          ></q-input>
          <q-input
            v-model="pedido.telefono"
            label="Telefono"
            outlined
            :disable="$store.user.role == 'Ventas' || $store.user.role == 'Cobranza' || $store.user.role == 'Director' || $store.user.role == 'Supervisor'"
            dense
          ></q-input>
          <q-input
            type="textarea"
            v-model="pedido.observacion"
            label="Observacion"
            outlined
            :disable="$store.user.role == 'Ventas' || $store.user.role == 'Cobranza' || $store.user.role == 'Director' || $store.user.role == 'Supervisor'"
            dense
          ></q-input>
          <q-input
            v-model="pedido.chofer"
            label="chofer"
            outlined
            :disable="$store.user.role == 'Ventas' || $store.user.role == 'Cobranza' || $store.user.role == 'Director' || $store.user.role == 'Supervisor'"
            dense
          ></q-input>

          <q-select
            v-model="pedido.zona"
            label="zonas"
            outlined
            :disable="$store.user.role == 'Ventas' || $store.user.role == 'Cobranza' || $store.user.role == 'Director' || $store.user.role == 'Supervisor'"
            dense
            :options="zonas"
            emit-value
            map-options
            option-label="nombre_zona"
            option-value="nombre_zona"
          ></q-select>
          <q-select
            v-model="pedido.estado"
            label="Estado"
            outlined
            :disable="$store.user.role == 'Ventas' || $store.user.role == 'Cobranza' || $store.user.role == 'Director' || $store.user.role == 'Supervisor'"
            dense
            :options="[ 'PENDIENTE', 'ENTREGADO', 'ANULADO', 'REZAGO']"
          >
            <template v-slot:after>
              <q-icon name="check_circle"
                      :color="pedido.estado === 'PENDIENTE' ? 'red' : pedido.estado === 'ENTREGADO' ? 'green' : pedido.estado === 'REZAGO' ? 'blue': 'orange'"/>
            </template>
          </q-select>
          <div class="text-bold q-pa-xs">
            <label>Total</label>
            <div>{{ pedido.total }}</div>
          </div>
          <q-markup-table dense flat bordered wrap-cells>
            <thead>
            <tr>
              <th>Producto</th>
              <th>Cantidad</th>
              <th>Precio</th>
              <th>Subtotal</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="sale in pedido.detalles" :key="sale.id">
              <td>
                <q-icon name="delete" @click="sales.splice(sales.indexOf(sale), 1)" class="cursor-pointer" color="red"/>
                {{ sale.producto?.nombre_pro }}
                {{ sale.producto?.marca_pro }}
              </td>
              <td>
                <input v-model="sale.cantidad" type="number" style="width: 50px" step="0.01"/>
              </td>
              <td>
                <input v-model="sale.precio" type="number" style="width: 70px" step="0.01"/>
              </td>
              <td>{{ (sale.cantidad * sale.precio).toFixed(2) }}</td>
            </tr>
            </tbody>
            <tfoot>
            <tr>
              <td colspan="3" class="text-right">Total</td>
              <td class="text-bold">
<!--                {{ (pedido.detalles.reduce((acc, sale) => acc + sale.cantidad * sale.precio, 0)).toFixed(2) }}-->
              </td>
            </tr>
            <tr v-if="$store.user.role === 'Administrador' || $store.user.role === 'Admin'">
              <td colspan="4">
                <q-btn
                  no-caps
                  class="full-width"
                  color="blue"
                  :loading="loading"
                  type="submit"
                  label="Actualizar pedido"
                />
              </td>
            </tr>
            </tfoot>
          </q-markup-table>
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
      fechaInicio: moment().format('YYYY-MM-DD'),
      fechaFin: moment().format('YYYY-MM-DD'),
      zonas: [],
      pedidosCemento: [],
      pedidosCementoAll: [],
      estados: ['PENDIENTE', 'ENTREGADO', 'ANULADO', 'REZAGO','TODOS'],
      estado : 'TODOS',
      // pedido: {},
      productos: [],
      pedido: {
        producto_id: null,
      },
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
            total: pedido.total,
            estado: pedido.estado,
            fecha_pago: pedido.fecha_pago,
            user: pedido.user?.name,
          })
        })
      })
      let data = [{
        sheet: "Pedidos",
        columns: [
        { label: "Fecha del pedido", value: "created_at" },
          {label: "Fecha de Entrega", value: "fecha"},
          {label: "Cliente", value: "cliente"},
          {label: "Producto", value: "producto"},
          {label: "Cantidad", value: "cantidad"},
          {label: "Precio", value: "precio"},
          {label: "Subtotal", value: "subtotal"},
          {label: "Factura", value: "factura"},
          {label: "Nombre Factura", value: "nombre_factura"},
          {label: "Nit Factura", value: "nit_factura"},
          {label: "Direccion", value: "direccion"},
          {label: "Contacto", value: "contacto"},
          {label: "Telefono", value: "telefono"},
          {label: "Telefono2", value: "telefono2"},
          {label: "Observacion", value: "observacion"},
          {label: "Chofer", value: "chofer"},
          {label: "Zona", value: "zona"},
          {label: "Total", value: "total"},
          {label: "Estado", value: "estado"},
          {label: "Fecha Pago", value: "fecha_pago"},
          {label: "User", value: "user"},
        ],
        content: pedidosCementoProductos
      }]

      const excel = Excel.export(data, "Reporte de Pedidos");

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
      // const user = this.$store.user
      // if (user.role === 'Administrador') {
      this.pedido = {...pedido}
      this.dialog = true;
      // }
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
      this.$router.push('pedidosCementoPage')
    },
    getPedidosFilter() {
      console.log(this.estado)
      if (this.estado === 'TODOS') {
        this.pedidosCemento = this.pedidosCementoAll
      } else {
        this.pedidosCemento = this.pedidosCementoAll.filter(pedido => pedido.estado === this.estado)
      }
    },
    getPedidos() {
      this.loading = true
      this.$axios.get('pedidosCemento', {
        params: {
          fechaInicio: this.fechaInicio,
          fechaFin: this.fechaFin
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
