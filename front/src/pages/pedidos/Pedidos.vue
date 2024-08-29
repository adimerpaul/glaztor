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
                  dense
              />
            </div>
            <div class="col-12 col-md-3">
              <q-input
                  outlined
                  v-model="fechaFin"
                  label="Fecha Fin"
                  type="date"
                  color="white"
                  dense
              />
            </div>
            <div class="col-12 col-md-6 text-right">
              <q-btn
                  icon="search"
                  color="primary"
                  label="Buscar"
                  @click="getPedidos"
                  :loading="loading"
                  no-caps
              />
            </div>
          </div>
        </q-card-section>
      </q-card>
        <pre>{{pedidos}}</pre>
      <q-page-sticky position="bottom-right" :offset="[18, 18]">
        <q-btn
            fab
            color="primary"
            icon="add"
            @click="addPedido"
        />
      </q-page-sticky>
    </q-page>
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
    }
  },
  mounted() {
    this.getPedidos()
  },
  methods: {
    addPedido() {
      this.dialog = true
      // protected $fillable = [
      //   'fecha_hora',
      //   'tipo',
      //   'cliente',
      //   'producto',
      //   'cantidad',
      //   'precio',
      //   'factura',
      //   'nombre_factura',
      //   'nit_factura',
      //   'direccion',
      //   'contacto',
      //   'telefono',
      //   'observacion',
      //   'chofer',
      //   'fecha_pago',
      //   'user_id'
      // ];
      this.pedido = {
        fecha_hora: moment().format('YYYY-MM-DD HH:mm:ss'),
        tipo: 'Preventa',
        cliente: '',
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
        user_id: 1,
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
  }
}
</script>
  