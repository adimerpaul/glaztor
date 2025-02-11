
<template>
  <q-page class="bg-grey-3 q-pa-xs">
    <q-card>
      <q-card-section class="q-pa-xs">
        <div class="row">
          <div class="col-12 col-md-6 text-bold text-h6">
            Productos de Cemento
          </div>
          <div class="col-12 col-md-6 text-right">
            <q-btn outline color="primary" label="Nuevo Producto" @click="productoNew"  no-caps icon="add_circle_outline" />
          </div>
          <div class="col-12">
            <q-markup-table dense wrap-cells>
              <thead>
              <tr>
                <th>Opciones</th>
                <th>Foto</th>
                <th>Categoria</th>
                <th>Marca</th>
                <th>Nombre</th>
                <th>Descripcion</th>
                <th>Precio</th>
                <th>Cantidad</th>
                <th>Estado</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="producto in productos" :key="producto.id">
                <td>
                  <q-btn
                    color="primary"
                    icon="edit"
                    @click="producto"
                    size="10px"
                  />
                  <q-btn
                    color="negative"
                    icon="delete"
                    @click="producto"
                    size="10px"
                  />
                </td>
                <td>
                  <img v-if="producto.foto"
                       :src="producto.foto.includes('data') ? producto.foto : $url + '..' + producto.foto"
                       alt="Imagen del producto" class="img-thumbnail" height="30">
                  <img v-else height="100" src="https://cdn4.iconfinder.com/data/icons/small-n-flat/24/user-256.png"
                       class="img-thumbnail" id="fotoimg" alt="">
                </td>
                <td>{{ producto.categoria }}</td>
                <td>{{ producto.marca }}</td>
                <td>{{ producto.nombre }}</td>
                <td>{{ producto.descripcion }}</td>
                <td>{{ producto.precio }}</td>
                <td>{{ producto.cantidad }}</td>
                <td>{{ producto.estado }}</td>
              </tr>
              </tbody>
            </q-markup-table>
<!--            <pre>{{ productos }}</pre>-->
            <!--        [-->
            <!--        {-->
            <!--        "id": 1,-->
            <!--        "categoria": "Cemento",-->
            <!--        "marca": "SOBOCE",-->
            <!--        "nombre": "Viacha Eco Plus",-->
            <!--        "descripcion": "Cemento Viacha Eco Plus",-->
            <!--        "precio": "47.00",-->
            <!--        "cantidad": 0,-->
            <!--        "foto": "/storage/fotos/VIACHAECOPLUS.jpeg",-->
            <!--        "numeroPedido": null,-->
            <!--        "numeroFactura": null,-->
            <!--        "estado": "ACTIVO"-->
            <!--        },-->
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-page>
  <q-dialog v-model="dialog" :position="esMovil ? undefined : 'right'" :maximized="true" transition-show="slide-left"
            transition-hide="slide-right">
    <q-card style="width: 450px; max-width: 100vw;">
      <q-card-section class="row items-center q-px-md bg-primary text-white q-px-none">
        <q-btn flat round dense icon="fa-solid fa-arrow-left" v-close-popup/>
        <q-space/>
        <div class="text-h6">{{ producto.id ? 'Editar' : 'Nuevo' }} Producto</div>
      </q-card-section>
      <q-card-section>
        <q-input outlined dense v-model="producto.marca" label="Marca" />
        <q-input outlined dense v-model="producto.nombre" label="Nombre" />
        <q-input outlined dense v-model="producto.descripcion" label="Descripcion" />
        <q-input outlined dense v-model="producto.precio" label="Precio" />
        <q-input outlined dense v-model="producto.cantidad" label="Cantidad" />
        <q-input outlined dense v-model="producto.foto" label="Foto" />
        <q-input outlined dense v-model="producto.numeroPedido" label="Numero Pedido" />
        <q-input outlined dense v-model="producto.numeroFactura" label="Numero Factura" />
        <q-input outlined dense v-model="producto.estado" label="Estado" />
      </q-card-section>
      <q-card-actions align="right">
        <q-btn label="Cancelar" color="negative" @click="dialog = false" />
        <q-btn label="Guardar" color="primary" @click="dialog = false" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script>
export default {
  name: 'ProductosCemento',
  data () {
    return {
      loading: false,
      productos: [],
      producto: {},
      dialog: false
    }
  },
  mounted() {
    this.getProductos()
  },
  methods: {
    productoNew() {
      this.dialog = true
      this.producto = {
        categoria: 'Cemento',
        marca: '',
        nombre: '',
        descripcion: '',
        precio: 0,
        cantidad: 0,
        foto: '',
        numeroPedido: '',
        numeroFactura: '',
        estado: 'ACTIVO'
      }
    },
    getProductos() {
      this.loading = true
      this.$axios.get('productosCemento')
        .then(response => {
          this.productos = response.data
          this.loading = false
        })
        .catch(error => {
          console.log(error)
          this.loading = false
        })
    }
  },
  computed: {
    esMovil() {
      return this.$q.screen.lt.md;
    }
  }
}

</script>
