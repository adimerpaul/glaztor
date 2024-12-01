<template>
  <q-page class="bg-grey-3 q-pa-xs">
    <div class="row">
      <div class="col-12 col-md-8 q-pa-xs">
        <q-card flat bordered>
          <q-card-section class="q-pa-xs">
            <div class="row">
              <div class="col-12 col-md-3" v-for="producto in productos" :key="producto.id">
                <q-card flat bordered class="q-ma-xs">
                  <q-card-section class="q-pa-none">
                    <q-img
                      :src="$url+'..'+producto.foto_pro"
                      :alt="producto.nombre_pro"
                      class="full-width"
                    >
                      <div class="absolute-bottom text-subtitle2 text-center" style="padding: 0;">
                        {{producto.nombre_pro}}
                        <br>
                        {{producto.precio_pro}} Bs.
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
