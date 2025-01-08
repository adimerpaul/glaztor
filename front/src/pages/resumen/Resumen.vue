<template>
  <q-page class="bg-grey-3 q-pa-xs">
    <q-card flat bordered>
      <q-card-section>
        <div class="row">
          <div class="col-12 col-md-2">
            <q-input v-model="fechaInicio" outlined dense type="date" label="Fecha inicio"/>
          </div>
          <div class="col-12 col-md-2">
            <q-input v-model="fechaFin" outlined dense type="date" label="Fecha fin"/>
          </div>
          <div class="col-12 col-md-2 flex flex-center">
            <q-btn label="Consultar" icon="search" color="info" dense no-caps @click="productosGet" :loading="loading"/>
          </div>
          <div class="col-12"></div>
          <div class="col-12 col-md-4 q-pa-xs">
            <q-markup-table flat bordered dense>
              <thead>
                <tr class="bg-primary text-white">
                  <th colspan="5" class="text-center">1 CALCULO DE INGRESOS POR VENTAS</th>
                </tr>
                <tr class="bg-primary text-white">
                  <th>#</th>
                  <th>Producto</th>
                  <th>Cantidad</th>
                  <th>Precio</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(producto, index) in productos.resumenVentas" :key="index">
                  <td>{{index+1}}</td>
                  <td>{{producto.producto}}</td>
                  <td class="text-center">{{producto.cantidad}}</td>
                  <td class="text-right">{{producto.precio}}</td>
                  <td class="text-right text-bold">{{producto.cantidad * producto.precio}}</td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td colspan="4" class="text-right text-bold">Total</td>
                  <td class="text-right text-bold">
                    {{sumVentas}}
                  </td>
                </tr>
              </tfoot>
            </q-markup-table>
          </div>
          <div class="col-12 col-md-4 q-pa-xs">
            <q-markup-table flat bordered dense>
              <thead>
              <tr class="bg-primary text-white">
                <th colspan="5" class="text-center">2 CALCULO DE COSTOS POR COMPRA</th>
              </tr>
              <tr class="bg-primary text-white">
                <th>#</th>
                <th>Producto</th>
                <th>Cantidad</th>
                <th>Precio</th>
                <th>Total</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(producto, index) in productos.resumenCostos" :key="index">
                <td>{{index+1}}</td>
                <td>{{producto.producto}}</td>
                <td class="text-center">{{producto.cantidad}}</td>
                <td class="text-right">{{producto.precio}}</td>
                <td class="text-right text-bold">{{producto.cantidad * producto.precio}}</td>
              </tr>
              </tbody>
              <tfoot>
              <tr>
                <td colspan="4" class="text-right text-bold">Total</td>
                <td class="text-right text-bold">
                  {{sumCostos}}
                </td>
              </tr>
              </tfoot>
            </q-markup-table>
          </div>
          <div class="col-12 col-md-4 q-pa-xs">
            <q-markup-table flat bordered dense>
              <thead>
              <tr class="bg-primary text-white">
                <th colspan="2" class="text-center">3 CALCULO DE CANTIDAD BRUTA</th>
              </tr>
              <tr>
                <th class="bg-primary text-white">Ingresos por ventas </th>
                <th>{{sumVentas}}</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <th class="bg-primary text-white">Costos de compra</th>
                <th>{{sumCostos}}</th>
              </tr>
              </tbody>
              <tfoot>
              <tr>
                <td class="text-right text-bold">Total</td>
                <td class="text-right text-bold">
                  {{ (sumVentas - sumCostos).toFixed(2) }}
                </td>
              </tr>
              </tfoot>
            </q-markup-table>
          </div>
          <div class="col-12 col-md-4 q-pa-xs">
            <q-markup-table flat bordered dense>
              <thead>
              <tr class="bg-primary text-white">
                <th colspan="2" class="text-center">4 CALCULO DE COSTOS OPERATIVOS</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(producto, index) in productos.resumenServicios" :key="index">
                <th class="bg-primary text-white">{{producto.servicio}}</th>
                <th>{{producto.monto}}</th>
              </tr>
              </tbody>
              <tfoot>
              <tr>
                <td class="text-right text-bold">Total</td>
                <td class="text-right text-bold">
                  {{ totalCostosOperativos }}
                </td>
              </tr>
              </tfoot>
            </q-markup-table>
          </div>
          <div class="col-12 col-md-4 q-pa-xs">
            <q-markup-table flat bordered dense>
              <thead>
              <tr class="bg-primary text-white">
                <th colspan="2" class="text-center">5 CALCULO DE GANANCIA NETA</th>
              </tr>
              <tr>
                <th class="bg-primary text-white">Utilidad bruta</th>
                <th>{{ (sumVentas - sumCostos).toFixed(2) }}</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <th class="bg-primary text-white">Costos operativos</th>
                <th>{{ totalCostosOperativos }}</th>
              </tr>
              </tbody>
              <tfoot>
              <tr>
                <td class="text-right text-bold">Total</td>
                <td class="text-right text-bold">
                  {{ ((sumVentas - sumCostos) - totalCostosOperativos).toFixed(2) }}
                </td>
              </tr>
              </tfoot>
            </q-markup-table>
          </div>
<!--          <div class="col-12">-->
<!--            <pre>{{productos}}</pre>-->
<!--          </div>-->
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>
<script>
import moment from "moment";

export default {
  name: 'Resumen',
  data () {
    return {
      fechaInicio: moment().startOf('month').format('YYYY-MM-DD'),
      fechaFin: moment().endOf('month').format('YYYY-MM-DD'),
      productos: [],
      loading: false
    }
  },
  mounted() {
    this.productosGet()
  },
  methods: {
    productosGet(){
      this.loading = true
      this.$axios.post('ingresoVentas',{
        fechaInicio:this.fechaInicio,
        fechaFin:this.fechaFin,
      }).then(res=>{
        this.productos = res.data
      }).catch(err=>{
        console.log(err)
      }).finally(()=>{
        this.loading = false
      })

    }
  },
  computed: {
    sumVentas(){
      let sum = 0
      for (let i = 0; i < this.productos?.resumenVentas?.length; i++) {
        sum += this.productos.resumenVentas[i].cantidad * this.productos.resumenVentas[i].precio
      }
      return sum
    },
    sumCostos(){
      let sum = 0
      for (let i = 0; i < this.productos?.resumenCostos?.length; i++) {
        sum += this.productos.resumenCostos[i].cantidad * this.productos.resumenCostos[i].precio
      }
      return sum
    },
    totalCostosOperativos(){
      let sum = 0
      for (let i = 0; i < this.productos?.resumenServicios?.length; i++) {
        sum += parseFloat(this.productos.resumenServicios[i].monto)
      }
      return sum
    }
  }
}
</script>
