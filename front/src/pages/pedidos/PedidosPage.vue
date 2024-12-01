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
                    <!--                    <q-card-section>-->
                    <!--                      <q-item>-->
                    <!--                        <q-item-section>-->
                    <!--                          <q-item-label>{{producto.nombre_pro}}</q-item-label>-->
                    <!--                          <q-item-label>{{producto.precio_pro}}</q-item-label>-->
                    <!--                        </q-item-section>-->
                    <!--                        <q-item-section side>-->
                    <!--                          <q-btn-->
                    <!--                            color="primary"-->
                    <!--                            icon="add"-->
                    <!--                            @click="agregarProducto(producto)"-->
                    <!--                          />-->
                    <!--                        </q-item-section>-->
                    <!--                      </q-item>-->
                    <!--                    </q-card-section>-->
                  </q-card-section>
                </q-card>
              </div>
            </div>
            <pre>{{ productos }}</pre>
            <!--            {-->
            <!--            "id": 1,-->
            <!--            "categoria_pro": "CEMENTO",-->
            <!--            "marca_pro": "SOBOCE",-->
            <!--            "nombre_pro": "EMISA-IP40",-->
            <!--            "descripcion_pro": "CEMENTO SOBOCE EMISA-IP40",-->
            <!--            "precio_pro": 44,-->
            <!--            "foto_pro": null,-->
            <!--            "estado_pro": "ACTIVO",-->
            <!--            "user_id": null-->
            <!--            },-->
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
                    @click="console.log(sales)"
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
</template>
<script>

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
    }
  },
  mounted() {
    this.getClientes()
    this.getProductos()
  },
  methods: {
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
