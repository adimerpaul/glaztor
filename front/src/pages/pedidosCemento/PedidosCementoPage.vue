<template>
  <q-page class="bg-grey-3 q-pa-xs">
    <div class="row">
      <div class="col-12 col-md-7 q-pa-xs">
        <q-card flat bordered>
          <q-card-section class="q-pa-xs">
            <div class="row">
              <div class="col-12">
                <q-input
                  v-model="filter"
                  filled
                  standout
                  placeholder="Buscar producto"
                  @update:modelValue="filterProductos"
                  dense
                  clearable
                >
                  <template v-slot:prepend>
                    <q-icon name="search" />
                  </template>
<!--                  btn atras-->
                  <template v-slot:before>
                    <q-btn
                      flat
                      round
                      dense
                      icon="arrow_back"
                      @click="this.$router.go(-1)"
                    />
                  </template>
                </q-input>
              </div>
              <div class="col-4 col-md-3" v-for="producto in productoCemento" :key="producto.id">
                <q-card flat bordered class="q-ma-xs cursor-pointer" @click="agregarProducto(producto)">
                  <q-card-section class="q-pa-none">
<!--                    <pre>{{$url + '..' + producto.foto}}</pre>-->
                    <q-img
                      :src="$url+'..'+producto.foto"
                      :alt="producto.nombre"
                      class="full-width"
                      style="height: 130px;"
                    >
                      <div class="absolute-bottom" style="padding: 0;margin: 0">
                        <div class="row items-center" style="font-size: 9px;">
                          <div>{{ producto.nombre }}</div>
                          <div>{{ producto.marca_pro }}</div>
                        </div>
                        <div style="display: flex; justify-content: space-between; font-size: 12px;">
                          <div>
                            {{ producto.precio }} Bs.
                          </div>
                          <div :class="'text-bold ' + (producto.cantidad == '0' ? 'text-negative' : 'text-positive')">
                            {{ producto.cantidad }}
                          </div>

                        </div>
                      </div>
                    </q-img>
                  </q-card-section>
                </q-card>
              </div>
            </div>
<!--            <pre>{{ productoCemento }}</pre>-->
          </q-card-section>
        </q-card>
      </div>
      <div class="col-12 col-md-5 q-pa-xs">
        <q-card flat bordered>
          <q-card-section class="q-pa-xs">
            <div class="row items-center">
              Carrito de compras

<!--              select de traler-->
              <q-select v-model="trailer" outlined dense :options="['LOCAL', 'TRAILER', 'OTRO']" />
              <q-space />
              <q-btn
                dense
                flat
                color="red"
                icon="delete"
                label="Limpiar"
                @click="sales = []"
                no-caps
              />
            </div>
            <q-markup-table dense flat bordered wrap-cells>
              <thead>
              <tr>
                <th>Producto</th>
<!--                <th>Tipo</th>-->
                <th>Cant.</th>
                <th>Cant. Real</th>
                <th>Precio</th>
                <th>Subtotal</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="sale in sales" :key="sale.producto.id">
                <td>
                  <q-icon name="delete" @click="sales.splice(sales.indexOf(sale), 1)" class="cursor-pointer" color="red" />
                  {{ sale.producto.nombre }}
                  {{ sale.producto.marca_pro }}
                </td>
<!--                <td>-->
<!--                  <q-select v-model="sale.tipo_pro" filled dense :options="['BA', 'TN']" />-->
<!--                </td>-->
                <td>
                  <input v-model="sale.cantidadVenta" type="number" style="width: 50px" filled />
                </td>
                <td>
                  <template v-if="sale.tipo_pro == 'BA'">
                    {{ sale.cantidadVenta }}
                  </template>
                  <template v-else>
                    {{ sale.cantidadVenta * sale.producto.tonelada }}
                  </template>

                </td>
                <td>
                  <input v-model="sale.precioVenta" type="number" style="width: 70px" filled />
                </td>

                <td>
                  <template v-if="sale.tipo_pro == 'BA'">
                    {{ (sale.cantidadVenta * sale.precioVenta).toFixed(2) }}
                  </template>
                  <template v-else>
                    {{ (sale.cantidadVenta * sale.precioVenta * sale.producto.tonelada).toFixed(2) }}
                  </template>
                  <q-icon name="calculate" @click="openCalculate(sale)" class="cursor-pointer" color="primary" />
<!--                  {{ (sale.cantidadVenta * sale.precioVenta).toFixed(2) }}-->
                </td>
              </tr>
              </tbody>
              <tfoot>
              <tr>
                <td colspan="3" class="text-right text-bold">Total</td>
                <td class="text-bold">
                  <template v-if="sales.length > 0">
                    {{ totalVenta }} Bs
                  </template>
                </td>
              </tr>
              <tr>
                <td colspan="4">
                  <q-btn
                    no-caps
                    class="full-width"
                    icon="save"
                    color="positive"
                    label="Realizar pedido"
                    @click="dialogPedidoClick"
                  />
                </td>
              </tr>
              </tfoot>
              <!--            sales-->
<!--              <q-card-section class="q-pa-xs" v-for="sale in sales" :key="sale.producto.id">-->
<!--              </q-card-section>-->
            </q-markup-table>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
  <q-dialog v-model="dialogPedido" >
    <q-card style="width: 650px; max-width: 90vw;">
      <q-card-section class="bg-primary text-white q-pb-none">
        <div class="row items-center">
          <div class="text-h6">Realizar pedido</div>
          <q-space />
          <q-btn flat round dense icon="close" v-close-popup />
        </div>
      </q-card-section>
      <q-card-section class="q-mt-none">
        <q-form @submit="submit">
          <div class="row">
            <div class="col-12 col-md-6">
              <q-select
                v-model="pedido.cliente_id"
                @filter="filterClientes"
                @update:modelValue="changeDirecionTelefono"
                :rules="[val => !!val || 'Seleccione un cliente']"
                filled
                emit-value
                map-options
                standout
                use-input
                label="Cliente"
                :options="clientes"
                option-value="id"
                option-label="nombre_cliente"
                dense
                clearable
              />
<!--              <pre>{{pedido}}</pre>-->
            </div>
            <div class="col-12 col-md-6">
              <q-input
                v-model="pedido.direccion"
                filled
                standout
                label="Dirección"
                dense
                hint=""
              />
            </div>
            <div class="col-12 col-md-3">
              <q-input
                v-model="pedido.telefono"
                filled
                standout
                label="Teléfono"
                dense
                hint=""
              />
            </div>
            <div class="col-12 col-md-3">
              <q-input
                v-model="pedido.telefono2"
                filled
                standout
                label="Teléfono 2"
                dense
                hint=""
              />
            </div>
            <div class="col-12 col-md-3">
              <q-input
                v-model="pedido.fecha_hora"
                filled
                standout
                label="Fecha de Entrega"
                type="date"
                dense
              />
            </div>
            <div class="col-12 col-md-3">
              <q-input
                v-model="pedido.nombre_factura"
                filled
                standout
                label="Nombre factura"
                dense
                hint=""
              />
            </div>
            <div class="col-12 col-md-4">
              <q-input
                v-model="pedido.nit_factura"
                filled
                standout
                label="NIT factura"
                dense
                hint=""
              />
            </div>
            <div class="col-12 col-md-4">
              <q-input
                v-model="pedido.fecha_pago"
                filled
                type="date"
                standout
                label="Fecha de pago"
                dense
              />
            </div>
            <div class="col-12 col-md-4">
              <q-select
                v-model="pedido.zona_id"
                filled
                standout
                label="Zona"
                :options="zonas"
                option-value="nombre_zona"
                option-label="nombre_zona"
                emit-value
                map-options
                :rules="[val => !!val || 'Seleccione una zona']"
                dense
              />
<!--              <pre>{{zonas}}</pre>-->
            </div>
            <div class="col-12">
              <q-input
                v-model="pedido.contacto"
                filled
                standout
                label="Contacto"
                dense
                hint=""
              />
            </div>
            <div class="col-12">
              <q-input
                v-model="pedido.observacion"
                filled
                standout
                label="Observación"
                dense
                hint=""
              />
            </div>
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
            <tr v-for="sale in sales" :key="sale.producto.id">
              <td>{{ sale.producto.nombre }}</td>
              <td>{{ sale.cantidadVenta }}</td>
              <td>{{ sale.precioVenta }}</td>
              <td>{{ (sale.cantidadVenta * sale.precioVenta).toFixed(2) }}</td>
            </tr>
            </tbody>
            <tfoot>
            <tr>
              <td colspan="3" class="text-right">Total</td>
              <td class="text-bold">
                {{ totalVenta }} Bs
              </td>
            </tr>
            </tfoot>
          </q-markup-table>
          <div class="row">
            <div class="col-6">
              <q-btn
                :loading="loading"
                no-caps
                class="q-mt-sm full-width"
                icon="save"
                color="positive"
                label="Guardar pedido"
                type="submit"
              />
            </div>
            <div class="col-6">
              <q-btn
                no-caps
                class="q-mt-sm full-width"
                icon="picture_as_pdf"
                color="primary"
                label="Descargar Cotización"
                @click="generarPDFCotizacion"
              />
            </div>
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<script>

import moment from "moment";
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
export default {
  name: 'Pedidos',
  data() {
    return {
      loading: false,
      filter: '',
      clientes: [],
      clientesAll: [],
      productoCemento: [],
      productoCementoAll: [],
      zonas: [],
      sales: [],
      pedido:{},
      dialogPedido: false,
      trailer: 'LOCAL'
    }
  },
  mounted() {
    this.getClientes()
    this.getProductos()
    this.getZonas()
  },
  methods: {
    generarPDFCotizacion() {
      const doc = new jsPDF()
      const fecha = new Date().toLocaleDateString()

      doc.setFontSize(16)
      doc.text('COTIZACIÓN', 14, 20)

      doc.setFontSize(10)
      doc.text(`Fecha: ${fecha}`, 14, 28)

      const cliente = this.pedido
      doc.text(`Cliente: ${cliente.contacto || ''}`, 14, 34)
      doc.text(`Teléfono: ${cliente.telefono || ''}`, 14, 40)
      doc.text(`Dirección: ${cliente.direccion || ''}`, 14, 46)
      doc.text(`Zona: ${cliente.zona_id || ''}`, 14, 52)

      // Tabla de productos
      const rows = this.sales.map(sale => [
        `${sale.producto.nombre} ${sale.producto.marca_pro}`,
        sale.cantidadVenta,
        `${sale.precioVenta} Bs`,
        `${(sale.cantidadVenta * sale.precioVenta).toFixed(2)} Bs`
      ])

      autoTable(doc, {
        startY: 60,
        head: [['Producto', 'Cantidad', 'Precio', 'Subtotal']],
        body: rows
      })

      // Total
      doc.setFontSize(12)
      doc.text(`Total: ${this.totalVenta} Bs`, 14, doc.lastAutoTable.finalY + 10)

      doc.save(`cotizacion-${fecha}.pdf`)
    },
    openCalculate(sale) {
      console.log(sale)
    //   < template
    //   v -
    //   if= "sale.tipo_pro == 'BA'" >
    //     {{
    //     (sale.cantidadVenta * sale.precioVenta).toFixed(2)
    //   }
    // }
    // </template>
    //   <template v-else>
    //     {{(sale.cantidadVenta * sale.precioVenta * sale.producto.tonelada).toFixed(2)}}
    //   </template>

      let total = 0
      if (sale.tipo_pro === 'BA') {
        total = sale.cantidadVenta * sale.precioVenta
      }else{
        total = sale.cantidadVenta * sale.precioVenta * sale.producto.tonelada
      }
      this.$q.dialog({
        title: 'Calcular',
        message: 'Ingrese el total de toneladas',
        prompt: {
          model: total,
          type: 'text' // optional
        },
        cancel: true,
        persistent: true
    }).
      onOk(data => {
        let cantidadReal = 0

      //     < template
      //   v -
      //   if= "sale.tipo_pro == 'BA'" >
      //     {{
      //     sale.cantidadVenta
      //   }
      // }
      // </template>
      //   <template v-else>
      //     {{sale.cantidadVenta * sale.producto.tonelada}}
      //   </template>
        if (sale.tipo_pro === 'BA') {
          cantidadReal = sale.cantidadVenta
        } else {
          cantidadReal = sale.cantidadVenta * sale.producto.tonelada
        }
        sale.precioVenta = data / cantidadReal
      }).onCancel(() => {
        // console.log('>>>> Cancel')
      }).onDismiss(() => {
        // console.log('I am triggered on both OK and Cancel')
      })
    },
    getZonas() {
      this.$axios.get('zonas').then(response => {
        this.zonas = response.data
      }).catch(error => {
        console.log(error)
      })
    },
    filterClientes(val, update) {
      if (val === '') {
        update(() => {
          this.clientes = this.clientesAll
        })
        return
      }
      const needle = val.toLowerCase()
      update(() => {
        this.clientes = this.clientesAll.filter(v => v.nombre_cliente.toLowerCase().indexOf(needle) > -1)
      })
    },
    submit() {
      this.loading = true
      this.pedido.trailer = this.trailer
      this.$axios.post('pedidosCemento', {
        ...this.pedido,
        detalles: this.sales.map(sale => ({
          id: sale.producto.id,
          cantidadVenta: sale.cantidadVenta,
          precioVenta: sale.precioVenta,
          tipo_pro: sale.tipo_pro
        }))
      }).then(response => {
        this.$alert.success('Pedido guardado')
        this.dialogPedido = false
        this.sales = []
        this.$router.push('/pedidoCemento')
      }).catch(error => {
        console.log(error)
        this.$alert.error(error.response.data.message)
      }).finally(() => {
        this.loading = false
      })
    },
    dialogPedidoClick() {
      if (this.sales.length === 0) {
        this.$alert.error('No hay productoCemento en el carrito')
        return false
      }

      this.dialogPedido = true
      this.pedido = {
        fecha_hora: moment().format('YYYY-MM-DD'),
        nombre_factura: '',
        nit_factura: '',
        contacto: '',
        direccion: '',
        telefono: '',
        telefono2: '',
        fecha_pago: moment().format('YYYY-MM-DD'),
        observacion: '',
      }
    },
    changeDirecionTelefono() {
      const cliente = this.clientes.find(cliente => cliente.id === this.pedido.cliente_id)
      // console.log(cliente)
      this.pedido.direccion = cliente.direccion
      this.pedido.telefono = cliente.telefono_1
      this.pedido.telefono2 = cliente.telefono_2
      this.pedido.contacto = cliente.nombre_cliente
    },
    agregarProducto(producto) {

      const cantidad = parseInt(producto.cantidad)
      if (cantidad === 0) {
        this.$alert.error('Producto sin stock')
        return false
      }

      // const index = this.sales.findIndex(sale => sale.producto.id === producto.id)
      // if (index !== -1) {
      //   this.sales[index].cantidadVenta += 1
      // } else {
        this.sales.push({
          producto,
          cantidadVenta: 1,
          precioVenta: producto.precio,
          tipo_pro: 'BA'
        })
      // }
    },
    filterProductos() {
      this.productoCemento = this.productoCementoAll.filter(producto => {
        return producto.nombre.toLowerCase().includes(this.filter.toLowerCase()) ||
          producto.marca_pro.toLowerCase().includes(this.filter.toLowerCase());
      });
    },
    getProductos() {
      this.$axios.get('productosCementoActivo').then(response => {
        this.productoCemento = response.data
        this.productoCementoAll = response.data
      }).catch(error => {
        console.log(error)
      })
    },
    getClientes() {
      this.$axios.get('clientes').then(response => {
        this.clientes = response.data
        this.clientesAll = response.data
      }).catch(error => {
        console.log(error)
      })
    },
  },
  computed: {
    esMovil() {
      return this.$q.screen.lt.md;
    },
    totalVenta() {
      let sum = 0
      this.sales.forEach(sale => {
        if (sale.tipo_pro === 'BA') {
          sum += sale.cantidadVenta * sale.precioVenta
        } else {
          sum += (sale.cantidadVenta * sale.precioVenta * sale.producto.tonelada)
        }
      })
      return sum
    }
  }
}
</script>
