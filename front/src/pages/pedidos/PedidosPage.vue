<template>
  <q-page class="bg-grey-3 q-pa-xs">
    <div class="row">
      <div class="col-12 col-md-8 q-pa-xs">
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
                </q-input>
              </div>
              <div class="col-6 col-md-3" v-for="producto in productos" :key="producto.id">
                <q-card flat bordered class="q-ma-xs cursor-pointer" @click="agregarProducto(producto)">
                  <q-card-section class="q-pa-none">
                    <q-img
                      :src="$url+'..'+producto.foto_pro"
                      :alt="producto.nombre_pro"
                      class="full-width"
                    >
                      <div class="absolute-bottom text-subtitle2 text-center" style="padding: 0;">
                        {{ producto.nombre_pro }}
                        <br>
                        {{ producto.precio_pro }} Bs.
                      </div>
                    </q-img>
                  </q-card-section>
                </q-card>
              </div>
            </div>
<!--            <pre>{{ productos }}</pre>-->
          </q-card-section>
        </q-card>
      </div>
      <div class="col-12 col-md-4 q-pa-xs">
        <q-card flat bordered>
          <q-card-section class="q-pa-xs">
            <div class="row items-center">
              Carrito de compras
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
                <th>Cantidad</th>
                <th>Precio</th>
                <th>Subtotal</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="sale in sales" :key="sale.producto.id">
                <td>
                  <q-icon name="delete" @click="sales.splice(sales.indexOf(sale), 1)" class="cursor-pointer" color="red" />
                  {{ sale.producto.nombre_pro }}
                </td>
                <td>
                  <q-input v-model="sale.cantidadVenta" type="number" dense style="width: 50px" filled />
<!--                  {{ sale.cantidadVenta }}-->
                </td>
                <td>
<!--                  {{ sale.precioVenta }}-->
                  <q-input v-model="sale.precioVenta" type="number" dense style="width: 70px" filled />
                </td>
                <td>{{ (sale.cantidadVenta * sale.precioVenta).toFixed(2) }}</td>
              </tr>
              </tbody>
              <tfoot>
              <tr>
                <td colspan="3" class="text-right">Total</td>
                <td class="text-bold">
                  {{ (sales.reduce((acc, sale) => acc + sale.cantidadVenta * sale.precioVenta, 0)).toFixed(2) }}
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
    <q-card style="width: 450px; max-width: 90vw;">
      <q-card-section>
        <div class="row items-center">
          <div class="text-h6">Realizar pedido</div>
          <q-space />
          <q-btn flat round dense icon="close" v-close-popup />
        </div>
      </q-card-section>
      <q-card-section>
        <q-form @submit="submit">
          <q-input
            v-model="pedido.fecha_ped"
            filled
            standout
            label="Fecha"
            type="date"
            dense
            clearable
          />
          <q-select
            v-model="pedido.cliente"
            filled
            standout
            label="Cliente"
            :options="clientes"
            option-value="id"
            option-label="nombre_cli"
            dense
            clearable
          />
          <q-select
            v-model="pedido.zona"
            filled
            standout
            label="Zona"
            :options="zonas"
            option-value="id"
            option-label="nombre_zon"
            dense
            clearable
          />
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
              <td>{{ sale.producto.nombre_pro }}</td>
              <td>{{ sale.cantidadVenta }}</td>
              <td>{{ sale.precioVenta }}</td>
              <td>{{ (sale.cantidadVenta * sale.precioVenta).toFixed(2) }}</td>
            </tr>
            </tbody>
            <tfoot>
            <tr>
              <td colspan="3" class="text-right">Total</td>
              <td class="text-bold">
                {{ (sales.reduce((acc, sale) => acc + sale.cantidadVenta * sale.precioVenta, 0)).toFixed(2) }}
              </td>
            </tr>
            </tfoot>
          </q-markup-table>
          <q-btn
            no-caps
            class="full-width"
            icon="save"
            color="positive"
            label="Guardar pedido"
          />
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<script>

import moment from "moment";

export default {
  name: 'Pedidos',
  data() {
    return {
      filter: '',
      clientes: [],
      productos: [],
      productosAll: [],
      zonas: [],
      sales: [],
      pedido:{},
      dialogPedido: false,

    }
  },
  mounted() {
    this.getClientes()
    this.getProductos()
  },
  methods: {
    dialogPedidoClick() {
      this.dialogPedido = true
      this.pedido = {
        'fecha_hora': moment().format('YYYY-MM-DD HH:mm:ss'),
        'tipo': 'Pedido',
        // 'producto',
        // 'cantidad',
        // 'precio',
        // 'factura',
        // 'nombre_factura',
        // 'nit_factura',
        // 'direccion',
        // 'contacto',
        // 'telefono',
        // 'telefono2',
        // 'observacion',
        // 'chofer',
        // 'fecha_pago',
        // 'cliente_id'
      }
    },
    agregarProducto(producto) {
      // verificar si existe en el carrito y aiumentar cantidadventas
      const index = this.sales.findIndex(sale => sale.producto.id === producto.id)
      if (index !== -1) {
        this.sales[index].cantidadVenta += 1
      } else {
        this.sales.push({
          producto,
          cantidadVenta: 1,
          precioVenta: producto.precio_pro
        })
      }
    },
    filterProductos() {
      this.productos = this.productosAll.filter(producto => {
        return producto.nombre_pro.toLowerCase().includes(this.filter.toLowerCase())
      })
    },
    getProductos() {
      this.$axios.get('productos').then(response => {
        this.productos = response.data
        this.productosAll = response.data
      }).catch(error => {
        console.log(error)
      })
    },
    getClientes() {
      this.$axios.get('clientes').then(response => {
        this.clientes = response.data
      }).catch(error => {
        console.log(error)
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
