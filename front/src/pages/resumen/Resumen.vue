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
            <q-btn label="Consultar" icon="search" color="info" dense no-caps @click="productosGet"/>
          </div>
          <div class="col-12">
            <pre>{{productos}}</pre>
          </div>
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
      productos: []
    }
  },
  mounted() {
    this.productosGet()
  },
  methods: {
    productosGet(){
      this.$axios.post('ingresoVentas',{
        fechaInicio:this.fechaInicio,
        fechaFin:this.fechaFin,
      }).then(res=>{
        this.productos = res.data
      }).catch(err=>{
        console.log(err)
      })

    }
  }
}
</script>
<script setup lang="ts">
</script>
