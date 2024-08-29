<template>
<!--    <q-page class="bg-grey-3 q-pa-xs">-->
<!--      <q-card>-->
<!--        <q-card-section class="q-pa-xs">-->
<!--          <div class="row">-->
<!--            <div class="col-12 col-md-3">-->
<!--              <q-input-->
<!--                  outlined-->
<!--                  v-model="fechaInicio"-->
<!--                  label="Fecha Inicio"-->
<!--                  type="date"-->
<!--                  color="white"-->
<!--                  dense-->
<!--              />-->
<!--            </div>-->
<!--            <div class="col-12 col-md-3">-->
<!--              <q-input-->
<!--                  outlined-->
<!--                  v-model="fechaFin"-->
<!--                  label="Fecha Fin"-->
<!--                  type="date"-->
<!--                  color="white"-->
<!--                  dense-->
<!--              />-->
<!--            </div>-->
<!--            <div class="col-12 col-md-6 text-right">-->
<!--              <q-btn-->
<!--                  icon="search"-->
<!--                  color="primary"-->
<!--                  label="Buscar"-->
<!--                  @click="getPedidos"-->
<!--                  :loading="loading"-->
<!--                  no-caps-->
<!--              />-->
<!--            </div>-->
<!--          </div>-->
<!--        </q-card-section>-->
<!--      </q-card>-->
<!--        <pre>{{pedidos}}</pre>-->
<!--      <pre>{{clientes}}</pre>-->
<!--      <q-page-sticky position="bottom-right" :offset="[18, 18]">-->
<!--        <q-btn-->
<!--            fab-->
<!--            color="primary"-->
<!--            icon="add"-->
<!--            @click="addPedido"-->
<!--        />-->
<!--      </q-page-sticky>-->
<!--    </q-page>-->
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
    </q-card>
  </q-dialog>
</template>

<script>
import moment from "moment";

export default {
  name: 'Pedidos',
  data () {
    return {
      fechaInicio: moment().startOf('month').format('YYYY-MM-DD'),
      fechaFin: moment().endOf('month').format('YYYY-MM-DD'),
      pedidos: [],
      pedido: {},
      loading: false,
      dialog: false,
      clientes: [],
    }
  },
  mounted() {
    this.getPedidos()
    this.getClientes()
  },
  methods: {
    submit() {
      if (this.pedido.id) {
        this.updatePedido()
      } else {
        this.savePedido()
      }
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
      this.dialog = true
      this.pedido = {
        fecha_hora: moment().format('YYYY-MM-DD HH:mm:ss'),
        cliente: '',
        tipo: '',
        producto: '',
        cantidad: 0,
        precio: 0,
        factura: '',
        nombre_factura: '',
        nit_factura: '',
        direccion: '',
        contacto: '',
        telefono: '',
        observacion: '',
        chofer: '',
        fecha_pago: moment().format('YYYY-MM-DD'),
      }
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
  