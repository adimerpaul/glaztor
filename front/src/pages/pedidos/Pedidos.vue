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
   <pre>{{pedidos}}</pre>
 <pre>{{clientes}}</pre>
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
       <q-btn
            fab
           color="primary"
            icon="add"
      @click="addPedido"
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
        <div class="text-h6">{{ pedido.id ? 'Editar' : 'Nuevo' }} Pedido</div>
      </q-card-section>
      <q-card-section>
        <q-form @submit="submit" v-if=" pedido.id">
          <div class="row">
            <div class="col-12 col-md-12">
              <q-input v-model="pedido" type="date" outlined />
            </div>
          </div>
        </q-form>
      </q-card-section>
      <q-card-section >
            <q-form @submit="submit" v-if="!pedido.id">
              <div class="row">
                <div class="col-12">
                    <q-input dense v-model="pedido.fecha" outlined label="Fecha" type="date"  />
                </div>
                <div class="col-12">
                  <q-select
                        dense
                        v-model="pedido.tipo"
                        :options="[
                            'FERRETERIA',
                            'OBRA',
                            'EMPRESA CONSTRUCTORA',
                            ]"
                        outlined
                        :rules="[val => !!val || 'Este campo es requerido']"
                        label="Tipo"/>
                </div>
                <div>
                     <q-select
                          filled
                          v-model="pedido.cliente"
                          use-input
                          input-debounce="0"
                          label="Cliente"
                          :options="options"
                          @filter="filterFn"
                          style="width: 250px"
                          behavior="menu"
                        ></q-select>
                </div>
                <div>
                     <q-select
                          filled
                          v-model="pedido.producto"
                          use-input
                          input-debounce="0"
                          label="Producto"
                          :options="options"
                          @filter="filterFn"
                          style="width: 250px"
                          behavior="menu"
                        ></q-select>
                </div>
                <div class="col-12">
                  <q-input dense v-model="pedido.cantidad" outlined label="Candidad" type="number" />
                 </div>
                <div class="col-12">
                 <q-input dense v-model="pedido.precio" outlined label="Precio" type="number" />
                </div>

                <div class="col-6 q-pa-xs">
                    <q-btn label="CON FACTURA" :outline="facturaBtnBool" class="full-width" no-caps color="primary" @click="facturaBtnBool = !facturaBtnBool" />
                </div>
                <div class="col-6 q-pa-xs">
                    <q-btn label="SIN FACTURA" :outline="sinfacturaBtnBool" class="full-width" no-caps color="primary" @click="sinfacturaBtnBool = !sinfacturaBtnBool" />
                </div>

                              <template v-if="!facturaBtnBool">
                              <div class="col-12">
                                  <q-input dense v-model="pedido.nombre_factura" outlined label="Nombre Factura" />
                              </div>
                              <div class="col-12">
                                  <q-input dense v-model="pedido.nit_factura" outlined label="Nit Factura" type="number" />
                              </div>
                              </template>
                <template v-if="!sinfacturaBtnBool">

                </template>


                <div class="col-12">
                    <q-input dense v-model="pedido.direccion" outlined label="Direccion" :rules="[val => !!val || 'Este campo es requerido']" />
                </div>
                <div class="col-12">
                    <q-input dense v-model="pedido.contacto" outlined label="Contacto" :rules="[val => !!val || 'Este campo es requerido']" />
                </div>
                <div class="col-12">
                    <q-input dense v-model="pedido.telefono" outlined label="Telefono 1" type="number" />
                </div>
                <div class="col-12">
                    <q-input dense v-model="pedido.telefono2" outlined label="Telefono 2" type="number" />
                </div>
                <div class="col-12">
                    <q-input dense v-model="pedido.observacion" outlined label="Observacion"  />
                </div>
                <q-card-actions align="right">
                    <q-btn label="Cancelar" color="negative" @click="dialog = false" :loading="loading" />
                    <q-btn label="Guardar" color="primary" type="submit" :loading="loading" />
                </q-card-actions>

              </div>
            </q-form>

        </q-card-section>
        <q-card-section >
              <q-form @submit="submit" v-if="!pedido.id">
                <div class="row">
                  <div class="col-12">
                      <q-input dense v-model="pedido.fecha" outlined label="Fecha" type="date"  />
                  </div>
                  <div class="col-12">
                    <q-select
                          dense
                          v-model="pedido.tipo"
                          :options="[
                              'FERRETERIA',
                              'OBRA',
                              'EMPRESA CONSTRUCTORA',
                              ]"
                          outlined
                          :rules="[val => !!val || 'Este campo es requerido']"
                          label="Tipo"/>
                  </div>
                  <div class="col-12">
                   <q-input dense v-model="pedido.cliente" outlined label="cliente"/>
                </div>
                <div class="col-12">
                  <q-input dense v-model="pedido.producto" outlined label="producto"/>
                 </div>

                  <div class="col-12">
                    <q-input dense v-model="pedido.cantidad" outlined label="Candidad" type="number" />
                   </div>
                  <div class="col-12">
                   <q-input dense v-model="pedido.precio" outlined label="Precio" type="number" />
                  </div>

                  <div class="col-6 q-pa-xs">
                      <q-btn label="CON FACTURA" :outline="facturaBtnBool" class="full-width" no-caps color="primary" @click="facturaBtnBool = !facturaBtnBool" />
                  </div>
                  <div class="col-6 q-pa-xs">
                      <q-btn label="SIN FACTURA" :outline="sinfacturaBtnBool" class="full-width" no-caps color="primary" @click="sinfacturaBtnBool = !sinfacturaBtnBool" />
                  </div>

                                <template v-if="!facturaBtnBool">
                                <div class="col-12">
                                    <q-input dense v-model="pedido.nombre_factura" outlined label="Nombre Factura" />
                                </div>
                                <div class="col-12">
                                    <q-input dense v-model="pedido.nit_factura" outlined label="Nit Factura" type="number" />
                                </div>
                                </template>
                  <template v-if="!sinfacturaBtnBool">

                  </template>


                  <div class="col-12">
                      <q-input dense v-model="pedido.direccion" outlined label="Direccion" :rules="[val => !!val || 'Este campo es requerido']" />
                  </div>
                  <div class="col-12">
                      <q-input dense v-model="pedido.contacto" outlined label="Contacto" :rules="[val => !!val || 'Este campo es requerido']" />
                  </div>
                  <div class="col-12">
                      <q-input dense v-model="pedido.telefono" outlined label="Telefono 1" type="number" />
                  </div>
                  <div class="col-12">
                      <q-input dense v-model="pedido.telefono2" outlined label="Telefono 2" type="number" />
                  </div>
                  <div class="col-12">
                      <q-input dense v-model="pedido.observacion" outlined label="Observacion"  />
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
    name: 'Pedidos',
    data() {
      return {
        loading: false,
        dialog: false,
        clientes: [],
        fechaInicio: moment().startOf('month').format('YYYY-MM-DD'),
        fechaFin: moment().endOf('month').format('YYYY-MM-DD'),
        pedidos: [],
        // pedido: {},
        productos: [],
        pedido: {
          producto_id: null,
        },
      }
    },
    mounted() {
      this.getPedidos()
      this.getClientes()
      this.getProductos();
    },
    methods: {
      submit() {
        this.loading = true;
        console.log(this.pedido);
        this.$axios.post('pedidos', this.pedido)
          .then(response => {
            this.pedidos.push(response.data);
            this.dialog = false;
            this.$q.notify({
              color: 'positive',
              message: 'Pedido guardado correctamente',
              icon: 'check_circle'
            });
          })
          .catch(error => {
            console.log(error);
            this.$q.notify({
              color: 'negative',
              message: 'Error al guardar el pedido',
              icon: 'error'
            });
          })
          .finally(() => {
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
        this.$axios.get('pedidos')
          .then(response => {
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
