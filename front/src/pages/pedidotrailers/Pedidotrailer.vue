<template>
  <q-page class="bg-grey-3 q-pa-xs">
        <q-card>
          <q-card-section class="q-pa-xs">
            <div class="row">
              <div class="col-12 col-md-3">
                <q-input
                    outlined
                    v-model="fechaInicio"
                    label="Fecha Inicio"
                    type="date"
                    color="white"
                    dense></q-input>
              </div>
              <div class="col-12 col-md-3">
                <q-input
                    outlined
                    v-model="fechaFin"
                    label="Fecha Fin"
                    type="date"
                    color="white"
                    dense
              ></q-input>
              </div>
              <div class="col-12 col-md-6 text-right">
                <q-btn
                    icon="search"
                    color="primary"
                    label="Buscar"
                    @click="getPedidotrailers"
                    :loading="loading"
                    no-caps
                ></q-btn>
              </div>
            </div>
          </q-card-section>
   </q-card>
     <pre>{{pedidotrailers}}</pre>
   <pre>{{clientes}}</pre>
      <q-page-sticky position="bottom-right" :offset="[18, 18]">
         <q-btn
              fab
             color="primary"
              icon="add"
        @click="addPedidotrailer"
          ></q-btn>
        </q-page-sticky> 
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
          <div class="text-h6">{{ pedidotrailer.id ? 'Editar' : 'Nuevo' }} Pedido TRAILER</div>
        </q-card-section>
        <q-card-section>
          <q-form @submit="submit" v-if=" pedidotrailer.id">
            <div class="row">
              <div class="col-12 col-md-12">
                <q-input v-model="pedidotrailer" type="date" outlined />
              </div>
            </div>
          </q-form>
        </q-card-section>
        <q-card-section >
              <q-form @submit="submit" v-if="!pedidotrailer.id">
                <div class="row"> 
                  <div class="col-12">
                      <q-input dense v-model="pedidotrailer.fecha_hora_tra" outlined label="Fecha" type="date"  />
                  </div>
                  <div class="col-12">
                    <q-input dense v-model="pedidotrailer.n_tra" outlined label="Nro Trailer" type="number" />
                   </div>
                  <div class="col-12">
                    <q-select
                          dense
                          v-model="pedidotrailer.asesor_tra"
                          :options="[
                              'ZTORREZ',
                              'JLAREDO',
                              'ATERAN',
                              'MMIRANDA',
                              ]"
                          outlined
                          :rules="[val => !!val || 'Este campo es requerido']"
                          label="Asesor"/>
                  </div>
                  <div class="col-12">
                    <q-select
                          dense
                          v-model="pedidotrailer.zona_tra"
                          :options="[
                              'ESTE',
                              'NORTE',
                              ]"
                          outlined
                          :rules="[val => !!val || 'Este campo es requerido']"
                          label="ZONA"/>
                  </div>




                  <div class="col-6 q-pa-xs">
                    <q-btn label="CLIENTE 1" :outline="cliente1BtnBool" class="full-width" no-caps color="primary" @click="cliente1BtnBool = !cliente1BtnBool" />
                  </div>
                  <div class="col-6 q-pa-xs">
                    <q-btn label="CLIENTE 2" :outline="cliente2BtnBool" class="full-width" no-caps color="primary" @click="cliente2BtnBool = !cliente2BtnBool" />
                  </div>
                  <div class="col-6 q-pa-xs">
                    <q-btn label="CLIENTE 3" :outline="cliente3BtnBool" class="full-width" no-caps color="primary" @click="cliente3BtnBool = !cliente3BtnBool" />
                  </div>
                  <div class="col-6 q-pa-xs">
                    <q-btn label="CLIENTE 4" :outline="cliente4BtnBool" class="full-width" no-caps color="primary" @click="cliente4BtnBool = !cliente4BtnBool" />
                  </div>


                  <template v-if="!cliente1BtnBool">

                  <div>
                       <q-select
                            filled
                            v-model="pedidotrailer.cliente1_tra"
                            use-input
                            input-debounce="0"
                            label="Cliente 1"
                            :options="options"
                            @filter="filterFn"
                            style="width: 250px"
                            behavior="menu"
                          ></q-select>
                  </div>
                  <div>
                       <q-select
                            filled
                            v-model="pedidotrailer.producto1_tra"
                            use-input
                            input-debounce="0"
                            label="Producto 1"
                            :options="options"
                            @filter="filterFn"
                            style="width: 250px"
                            behavior="menu"
                          ></q-select>
                  </div>

                  <div class="col-12">
                    <q-input dense v-model="pedidotrailer.cantidad1_tra" outlined label="Candidad 1" type="number" />
                   </div>
                  <div class="col-12">
                   <q-input dense v-model="pedidotrailer.precio1_tra" outlined label="Precio 1" type="number" />
                  </div>

                </template>

                
                


                  <template v-if="!cliente2BtnBool">





                  <div>
                       <q-select
                            filled
                            v-model="pedidotrailer.cliente2_tra"
                            use-input
                            input-debounce="0"
                            label="Cliente 2"
                            :options="options"
                            @filter="filterFn"
                            style="width: 250px"
                            behavior="menu"
                          ></q-select>
                  </div>
                  <div>
                       <q-select
                            filled
                            v-model="pedidotrailer.producto2_tra"
                            use-input
                            input-debounce="0"
                            label="Producto 2"
                            :options="options"
                            @filter="filterFn"
                            style="width: 250px"
                            behavior="menu"
                          ></q-select>
                  </div>

                  <div class="col-12">
                    <q-input dense v-model="pedidotrailer.cantidad2_tra" outlined label="Candidad 2" type="number" />
                   </div>
                  <div class="col-12">
                   <q-input dense v-model="pedidotrailer.precio2_tra" outlined label="Precio 2" type="number" />
                  </div>


                </template>

                <template v-if="!cliente3BtnBool">


                  <div>
                       <q-select
                            filled
                            v-model="pedidotrailer.cliente3_tra"
                            use-input
                            input-debounce="0"
                            label="Cliente 3"
                            :options="options"
                            @filter="filterFn"
                            style="width: 250px"
                            behavior="menu"
                          ></q-select>
                  </div>
                  <div>
                       <q-select
                            filled
                            v-model="pedidotrailer.producto3_tra"
                            use-input
                            input-debounce="0"
                            label="Producto 3"
                            :options="options"
                            @filter="filterFn"
                            style="width: 250px"
                            behavior="menu"
                          ></q-select>
                  </div>

                  <div class="col-12">
                    <q-input dense v-model="pedidotrailer.cantidad3_tra" outlined label="Candidad 3" type="number" />
                   </div>
                  <div class="col-12">
                   <q-input dense v-model="pedidotrailer.precio3_tra" outlined label="Precio 3" type="number" />
                  </div>
                </template>

                <template v-if="!cliente4BtnBool">


                  <div>
                       <q-select
                            filled
                            v-model="pedidotrailer.cliente4_tra"
                            use-input
                            input-debounce="0"
                            label="Cliente 4"
                            :options="options"
                            @filter="filterFn"
                            style="width: 250px"
                            behavior="menu"
                          ></q-select>
                  </div>
                  <div>
                       <q-select
                            filled
                            v-model="pedidotrailer.producto4_tra"
                            use-input
                            input-debounce="0"
                            label="Producto 4"
                            :options="options"
                            @filter="filterFn"
                            style="width: 250px"
                            behavior="menu"
                          ></q-select>
                  </div>

                  <div class="col-12">
                    <q-input dense v-model="pedidotrailer.cantidad4_tra" outlined label="Candidad 4" type="number" />
                   </div>
                  <div class="col-12">
                   <q-input dense v-model="pedidotrailer.precio4_tra" outlined label="Precio 4" type="number" />
                  </div>


                </template>

                  <div class="col-6 q-pa-xs">
                      <q-btn label="CON FACTURA" :outline="facturaBtnBool" class="full-width" no-caps color="primary" @click="facturaBtnBool = !facturaBtnBool" />
                  </div>
                  <div class="col-6 q-pa-xs">
                      <q-btn label="SIN FACTURA" :outline="sinfacturaBtnBool" class="full-width" no-caps color="primary" @click="sinfacturaBtnBool = !sinfacturaBtnBool" />
                  </div>
  
                  <template v-if="!facturaBtnBool">
                  <div class="col-12">
                      <q-input dense v-model="pedidotrailer.nombre_factura_tra" outlined label="Nombre Factura" />
                  </div>
                  <div class="col-12">
                      <q-input dense v-model="pedidotrailer.nit_factura_tra" outlined label="Nit Factura" type="number" />
                  </div>
                  </template>
                  <template v-if="!sinfacturaBtnBool">
                  
                  </template>
                  
  
                  <div class="col-12">
                      <q-input dense v-model="pedidotrailer.direccion_tra" outlined label="Direccion" :rules="[val => !!val || 'Este campo es requerido']" />
                  </div>
                  <div class="col-12">
                      <q-input dense v-model="pedidotrailer.contacto_tra" outlined label="Contacto" :rules="[val => !!val || 'Este campo es requerido']" />
                  </div>
                  <div class="col-12">
                      <q-input dense v-model="pedidotrailer.telefono_tra" outlined label="Telefono 1" type="number" />
                  </div>
                  <div class="col-12">
                      <q-input dense v-model="pedidotrailer.telefono2_tra" outlined label="Telefono 2" type="number" />
                  </div>
                  <div class="col-12">
                      <q-input dense v-model="pedidotrailer.observacion_tra" outlined label="Observacion"  />
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
import { Loading } from 'quasar';

export default {
  name: 'Pedidotrailers',
  data () {
    return {
      fechaInicio: moment().startOf('month').format('YYYY-MM-DD'),
      fechaFin: moment().endOf('month').format('YYYY-MM-DD'),
      pedidotrailers: [],
      pedidotrailer: {},
      loading: false,
      dialog: false,
      facturaBtnBool: true,
      sinfacturaBtnBool: true,
      cliente1BtnBool: true,
      cliente2BtnBool: true,
      cliente3BtnBool: true,
      cliente4BtnBool: true,
      clientes: [],
    }
  },
  mounted() {
    this.getPedidotrailers()
    this.getClientes()
  },
  methods: {
    submit () {
            this.loading = true
            this.$axios.post('pedidotrailers', this.pedidotrailer)
            .then(response => {
                this.pedidotrailers.push(response.data)
                this.dialog = false
            })
            .catch(error => {
                console.log(error)
            }).finally(() => {
                this.loading = false
            })
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
    addPedidotrailer() {
      this.dialog = true
      this.pedidotrailer = {
        fecha_hora_tra: moment().format('YYYY-MM-DD HH:mm:ss'),
        n_tra:'',
        asesor_tra:'',
        zona_tra:'',
        cliente1_tra:'',
        producto1_tra:'',
        cantidad1_tra:'',
        precio1_tra:'',
        cliente2_tra:'',
        producto2_tra:'',
        cantidad2_tra:'',
        precio2_tra:'',
        cliente3_tra:'',
        producto3_tra:'',
        cantidad3_tra:'',
        precio3_tra:'',
        cliente4_tra:'',
        producto4_tra:'',
        cantidad4_tra:'',
        precio4_tra:'',
        factura_tra:'',
        nombre_factura_tra:'',
        nit_factura_tra:'',
        direccion_tra:'',
        contacto_tra:'',
        telefono_tra:'',
        telefono2_tra:'',
        observacion_tra:'',
        chofer_tra:'',
      }
    },
    getPedidotrailers() {
      this.loading = true
      this.$axios.get('pedidotrailer')
        .then(response => {
          this.pedidotrailers = response.data
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