<template>
  <q-page class="bg-grey-2">
    <q-card flat bordered>
      <q-card-section class="q-pa-xs">

            <q-btn
                  icon="download"
                  color="green"
                  label="Exportar"
                  @click="exportExcel"
                  no-caps
              ></q-btn>

        <q-markup-table dense class="styled-table">
          <thead>
          <tr>
            <th>Acciones</th>
            <th>Nombre</th>
            <th>Precio venta</th>
            <th>Precio compra</th>
            <th>Cantidad</th>
            <th>Descripcion</th>
            <th>Cant por Mayor</th>
            <th>foto</th>
            <th>Numero Pedido</th>
            <th>Numero Factura</th>
            <th>estado</th>
            <th>id</th>
            <th>categoria</th>
            <th>marca</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(productocemento, index) in productocementos" :key="index">
            <td>
              <q-btn-dropdown
                size="10px"
                color="primary"
                no-caps
                label="Opciones"
                dense
                class="q-mr-sm">
                <q-item clickable v-ripple @click="showProducto(productocemento)" v-close-popup>
                  <q-item-section>Editar</q-item-section>
                </q-item>
              </q-btn-dropdown>
            </td>

            <td>{{ productocemento.nombre }}</td>
            <td>{{ productocemento.precio }}</td>
            <td>{{ productocemento.precio_compra }}</td>
            <td>{{ productocemento.cantidad }}</td>
            <td>{{ productocemento.descripcion }}</td>
            <td>{{ productocemento.tonelada }}</td>
            <td>
              <a v-if="productocemento.foto" :href="$url+'..'+productocemento.foto" target="_blank">
                <!--                                  ver foto-->
                <q-img :src="$url+'..'+productocemento.foto" alt="Imagen del producto" class="img-thumbnail" height="10"/>
              </a>
            </td>
            <td>{{ productocemento.numeroPedido }}</td>
            <td>{{ productocemento.numeroFactura }}</td>

            <td>{{ productocemento.estado }}</td>
            <td>{{ productocemento.id }}</td>
            <td>{{ productocemento.categoria }}</td>
            <td>{{ productocemento.marca }}</td>
          </tr>
          </tbody>
        </q-markup-table>
<!--        <pre>{{productocementos}}</pre>-->
      </q-card-section>
    </q-card>
  </q-page>

  <q-page-sticky position="bottom-right" class="text-bold" :offset="[18, 18]">
    <q-btn fab icon="add" color="primary" @click="dialogClick"/>
  </q-page-sticky>

  <q-dialog v-model="dialog" :position="esMovil ? undefined : 'right'" :maximized="true" transition-show="slide-left"
            transition-hide="slide-right">
    <q-card style="width: 450px; max-width: 100vw;">
      <q-card-section class="row items-center q-px-md bg-primary text-white q-px-none">
        <q-btn flat round dense icon="fa-solid fa-arrow-left" v-close-popup/>
        <q-space/>
        <div class="text-h6">{{ productocemento.id ? 'Editar' : 'Nuevo' }} Producto cemento</div>
      </q-card-section>
      <q-card-section>
        <q-form @submit.prevent="confirmarGuardar">
          <div class="row">
            <div class="col-12">
              <q-select
                dense
                v-model="productocemento.categoria"
                :options="['CEMENTO']"
                outlined
                :rules="[val => !!val || 'Este campo es requerido']"
                label="Tipo"/>
            </div>
            <div class="col-12">
              <q-input
                dense
                v-model="productocemento.marca"
                outlined
                label="Marca"
                :rules="[val => !!val || 'Este campo es requerido']"
                @input="productocemento.marca = productocemento.marca.toUpperCase()"
                style="text-transform: uppercase;"/>
            </div>
            <div class="col-12">
              <q-input
                dense
                v-model="productocemento.nombre"
                outlined
                label="Nombre Producto"
                :rules="[val => !!val || 'Este campo es requerido']"
                @input="productocemento.nombre = productocemento.nombre.toUpperCase()"
                style="text-transform: uppercase;"/>
            </div>
            <div class="col-12">
              <q-input
                dense
                v-model="productocemento.descripcion"
                outlined
                label="Descripcion Producto"
                @input="productocemento.descripcion = productocemento.descripcion.toUpperCase()"
                hint=""
                style="text-transform: uppercase;"/>
            </div>
            <div class="col-6">
              <q-input dense v-model="productocemento.precio" outlined label="Precio Venta" type="number"
                       hint=""
              />
            </div>
            <div class="col-6">
              <q-input dense v-model="productocemento.precio_compra" outlined label="Precio Compra" type="number"
                       hint=""
              />
            </div>
            <div class="col-12">
              <q-input dense v-model="productocemento.cantidad" outlined label="Cantidad en stok" type="number"
                       hint=""
              >
                <template v-slot:after>
                  <q-btn
                    round
                    color="positive"
                    icon="add"
                    @click="aumentarPorTonelada"
                  />
                </template>
              </q-input>
            </div>
            <div class="col-6">
              <q-input dense v-model="productocemento.numeroPedido" outlined label="Numero de Pedido" hint=""             >
              </q-input>
            </div>
            <div class="col-6">
              <q-input dense v-model="productocemento.numeroFactura" outlined label="Numero de Factura"  hint=""
              />
            </div>


            <div class="d-grid col-6 mx-auto mb-3">
              <img v-if="productocemento.foto"
                   :src="productocemento.foto.includes('data') ? productocemento.foto : $url + '..' + productocemento.foto"
                   alt="Imagen del producto" class="img-thumbnail" height="100">
              <img v-else height="100" src="https://cdn4.iconfinder.com/data/icons/small-n-flat/24/user-256.png"
                   class="img-thumbnail" id="fotoimg" alt="">
            </div>

            <div class="input-group mb-3">
              <span class="input-group-text"><i class="fa-solid fa-gift"></i></span>
              <input v-on:change="previsualizarFoto" type="file" accept="image/png, image/jpg, image/gif"
                     class="form-control">
            </div>

            <div class="col-12">
              <q-select
                dense
                v-model="productocemento.estado"
                :options="['ACTIVO', 'INACTIVO']"
                outlined
                :rules="[val => !!val || 'Este campo es requerido']"
                label="Estado"/>
            </div>

            <q-card-actions align="right">
              <q-btn label="Cancelar" color="negative" @click="dialog = false" :loading="loading"/>
              <q-btn label="Guardar" color="primary" type="submit" :loading="loading"/>
            </q-card-actions>
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import {Excel} from "src/addons/Excel";
export default {
  name: 'productocementos',

  data() {
    return {
      productocementos: [],
      productocemento: {},
      dialog: false,
      loading: false
    }
  },
  mounted() {
    this.getProductos();
  },
  methods: {
    aumentarPorTonelada() {
      this.$q.dialog({
        title: "Aumentar ",
        message: "¿Estás seguro de que deseas aumentar la cantidad ?",
        ok: {label: "Sí", color: "primary"},
        cancel: {label: "No", color: "negative"},
        prompt: {
          model: "1",
          type: "number",
          label: "Cantidad a aumentar",
          rules: [(val) => !!val || "Este campo es requerido"],
        },
      }).onOk((data) => {
        const tonelada = parseInt(this.productocemento.tonelada);
        this.productocemento.cantidad = (parseInt(data) * tonelada) + parseInt(this.productocemento.cantidad);
      });
    },
    exportExcel() {
        let data = [{
          sheet: "productocementos",
          columns: [
            {label: "Categoria Producto", value: "categoria"},
            {label: "Marca Producto", value: "marca"},
            {label: "Nombre Producto", value: "nombre"},
            {label: "Descripcion Producto", value: "descripcion"},
            {label: "Precio Producto", value: "precio"},
            {label: "Precio compra", value: "precio_compra"},
            {label: "Cantidad en Stok", value: "cantidad"},
           //solo sale en text direccion  {label: "Foto Producto", value: "foto"},
            {label: "Tonelada por Producto", value: "tonelada"},
            {label: "Estado Producto", value: "estado"},
          ],
          content: this.productocementos
        }]

        const excel = Excel.export(data, "Reporte de Productos ladrillo");

      },

    showProducto(productocemento) {
      this.productocemento = {...productocemento}; // Esto es importante para asegurarse de que los datos del producto se copien correctamente
      this.dialog = true; // Muestra el diálogo de edición
    },

    confirmarGuardar() {
      this.$q
        .dialog({
          title: "Confirmar Guardado",
          message: "¿Estás seguro de que quieres guardar los cambios?",
          ok: {label: "Sí", color: "primary"},
          cancel: {label: "No", color: "negative"},
        })
        .onOk(() => {
          this.submit();
        });
    },
    submit() {
        this.loading = true;

        if (this.productocemento.id) {
          this.$axios.put(`productosCemento/${this.productocemento.id}`, this.productocemento)
            .then(response => {
              const index = this.productocementos.findIndex(item => item.id === this.productocemento.id);
              this.productocementos[index] = response.data; // Actualiza el producto modificado
              this.dialog = false; // Cierra el diálogo
            })
            .catch(error => {
              console.log(error);
            })
            .finally(() => {
              this.loading = false;
            });
        } else {
          this.$axios.post('productoscemento', this.productocemento)
            .then(response => {
              // this.productocemento.push(response.data);
              this.dialog = false;
              this.productocementos.push(response.data);
            })
            .catch(error => {
              this.$alert.error(error.response.data.message);
            })
            .finally(() => {
              this.loading = false;
            });
        }
      },

    eliminar(productocemento) {
      this.$q.dialog({
        title: 'Confirmar Eliminación',
        message: '¿Estás seguro de que deseas eliminar este producto?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.$axios.delete(`productocementos/${productocemento.id}`)
          .then(response => {
            this.productocementos = this.productocementos.filter(item => item.id !== productocemento.id);
          })
          .catch(error => {
            console.log(error);
          });
      });
    },

    dialogClick() {
      this.dialog = true;
      this.productocemento = {
        categoria: '',
        marca: '',
        nombre: '',
        descripcion: '',
        precio: '',
        numeroPedido: '',
        numeroFactura: '',
        foto: '',
        estado: '',
      };
    },

    getProductos() {
  this.$axios.get('productocementos')
    .then(response => {
      this.productocementos = response.data;

      // Verificar si algún producto tiene cantidad / tonelada < 2
      const sinInventario = this.productocementos.some(productocemento => {
        return productocemento.tonelada > 0 && productocemento.cantidad / productocemento.tonelada < 2;
      });
      const productosAgotados = this.productocementos.filter(
  (productocemento) =>
  productocemento.cantidad &&
  productocemento.tonelada &&
  productocemento.cantidad / productocemento.tonelada < 2
);
    if (productosAgotados.length > 0) {
      const nombres = productosAgotados.map((productocemento) => productocemento.nombre).join(", ");
      this.$q.dialog({
        title: "Inventario bajo",
        message: `Los siguientes productos están agotados: ${nombres}`,
        ok: "Entendido",
      });
    }
      if (sinInventario) {
        this.$q.notify({
          color: 'negative',
          icon: 'warning',
          message: 'Ya no hay inventario para algunos productos',
          position: 'top',
          timeout: 5000,
        });
      }
    })
    .catch(error => {
      console.log(error);
    });
    },

    previsualizarFoto(event) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = () => {
        this.foto = reader.result;
        this.productocemento.foto = this.foto; // Guardar la cadena base64 en producto.foto
      };
    }
  },
  computed: {
    esMovil() {
      return this.$q.screen.lt.md;
    }
  }
}
</script>

<style scoped>
.styled-table {
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
  font-size: 16px;
  text-align: left;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
}

.styled-table thead tr {
  background-color: #6a1b9a;
  color: #ffffff;
  text-align: left;
}

.styled-table th,
.styled-table td {
  padding: 12px 15px;
}

.styled-table tbody tr {
  border-bottom: 1px solid #dddddd;
}

.styled-table tbody tr:nth-of-type(even) {
  background-color: #f3f3f3;
}

.styled-table tbody tr:hover {
  background-color: #e9e9e9;
  cursor: pointer;
}

.img-thumbnail {
  max-width: 100px;
  border-radius: 8px;
  border: 1px solid #ddd;
}

.image-preview {
  display: flex;
  justify-content: center;
  margin-bottom: 15px;
}
</style>
