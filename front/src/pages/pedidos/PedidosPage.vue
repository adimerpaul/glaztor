<template>
  <q-page class="bg-grey-3 q-pa-xs">
    <div class="row">
      <div class="col-12 col-md-8 q-pa-xs">
        <q-card flat bordered>
          <q-card-section class="q-pa-xs">
            <q-markup-table dense flat bordered wrap-cells>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Categoria</th>
                  <th>Marca</th>
                  <th>Nombre</th>
                  <th>Descripcion</th>
                  <th>Precio</th>
                  <th>Estado</th>
                </tr>
              </thead>
            </q-markup-table>
            <pre>{{productos}}</pre>
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
            Carrito de compras
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
      clientes: [],
      productos: [],
      zonas: [],
    }
  },
  mounted() {
    this.getClientes()
    this.getProductos()
  },
  methods: {
    getProductos() {
      this.$axios.get('productos')
        .then(response => {
          this.productos = response.data
        })
        .catch(error => {
          console.log(error)
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
  },
  computed: {
    esMovil() {
      return this.$q.screen.lt.md;
    }
  }
}
</script>
