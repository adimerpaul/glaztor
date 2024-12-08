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
          <pre>{{pedidos}}</pre>
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
          <q-input v-model="pedido.fecha"
                   label="Fecha"
                   outlined
                   dense
                   color="white"
                   type="date"
          ></q-input>
          <q-input
            v-model="pedido.cliente"
            label="Cliente"
            outlined
            dense
          ></q-input>
          <q-input
            v-model="pedido.nombre_factura"
            label="Nombre Factura"
            outlined
            dense
          ></q-input>
          <q-input
            v-model="pedido.nit_factura"
            label="Nit Factura"
            outlined
            dense
          ></q-input>
          <q-input
            v-model="pedido.direccion"
            label="Direccion"
            outlined
            dense
          ></q-input>
          <q-input
            v-model="pedido.contacto"
            label="Contacto"
            outlined
            dense
          ></q-input>
          <q-input
            v-model="pedido.telefono"
            label="Telefono"
            outlined
            dense
          ></q-input>
          <q-input
            type="textarea"
            v-model="pedido.observacion"
            label="Observacion"
            outlined
            dense
          ></q-input>
          <q-input
            v-model="pedido.chofer"
            label="chofer"
            outlined
            dense
          ></q-input>

          <q-select
            v-model="pedido.zona"
            label="zonas"
            outlined
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
            dense
            :options="[ 'PENDIENTE', 'ENTREGADO', 'ANULADO']"
          >
            <template v-slot:after>
              <q-icon name="check_circle" :color="pedido.estado === 'PENDIENTE' ? 'red' : pedido.estado === 'ENTREGADO' ? 'green' : 'orange'"/>
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
                <q-icon name="delete" @click="sales.splice(sales.indexOf(sale), 1)" class="cursor-pointer" color="red" />
                {{ sale.producto?.nombre_pro }}
                {{ sale.producto?.marca_pro }}
              </td>
              <td>
                <input v-model="sale.cantidad" type="number" dense style="width: 90px" filled />
              </td>
              <td>
                <input v-model="sale.precio" type="number" dense style="width: 110px" filled />
              </td>
              <td>{{ (sale.cantidad * sale.precio).toFixed(2) }}</td>
            </tr>
            </tbody>
            <tfoot>
            <tr>
              <td colspan="3" class="text-right">Total</td>
              <td class="text-bold">
                {{ (pedido.detalles.reduce((acc, sale) => acc + sale.cantidad * sale.precio, 0)).toFixed(2) }}
              </td>
            </tr>
            <tr>
              <td colspan="4">
                <q-btn
                  no-caps
                  class="full-width"
                  color="blue"
                  :loading="loading"
                  type="submit"
                  label="Actulizar pedido"
                />
              </td>
            </tr>
            </tfoot>
          </q-markup-table>
        </q-form>
        <pre>{{pedido}}</pre>
<!--        {-->
<!--        "id": 1,-->
<!--        "fecha_hora": "2024-12-08 00:00:00",-->
<!--        "tipo": "",-->
<!--        "cliente": "MARTHA MARTINEZ ACHACOLLO MAMANI",-->
<!--        "producto": "",-->
<!--        "cantidad": null,-->
<!--        "precio": null,-->
<!--        "factura": "",-->
<!--        "nombre_factura": "",-->
<!--        "nit_factura": null,-->
<!--        "direccion": "AVENIDA 24 DE JUNIO A LADO DE CARTONBOL",-->
<!--        "contacto": "MARTHA MARTINEZ ACHACOLLO MAMANI",-->
<!--        "telefono": "71888721",-->
<!--        "telefono2": null,-->
<!--        "observacion": null,-->
<!--        "chofer": "",-->
<!--        "zona": null,-->
<!--        "total": "612.00",-->
<!--        "estado": "PENDIENTE",-->
<!--        "fecha_pago": "2024-12-08",-->
<!--        "user_id": 2,-->
<!--        "cliente_id": 166,-->
<!--        "detalles": [-->
<!--        {-->
<!--        "id": 1,-->
<!--        "pedido_id": 1,-->
<!--        "user_id": 2,-->
<!--        "producto": null,-->
<!--        "cantidad": 1,-->
<!--        "precio": "392.00"-->
<!--        },-->
<!--        {-->
<!--        "id": 2,-->
<!--        "pedido_id": 1,-->
<!--        "user_id": 2,-->
<!--        "producto": null,-->
<!--        "cantidad": 1,-->
<!--        "precio": "220.00"-->
<!--        }-->
<!--        ]-->
<!--        }-->
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
        fechaInicio: moment().format('YYYY-MM-DD'),
        fechaFin: moment().format('YYYY-MM-DD'),
        zonas: [],
        pedidos: [],
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
        this.$axios.get('pedidos', {
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
