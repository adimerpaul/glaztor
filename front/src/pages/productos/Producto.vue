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
            <th>estado</th>
            <th>id</th>
            <th>categoria</th>
            <th>marca</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(producto, index) in productos" :key="index">
            <td>
              <q-btn-dropdown
                size="10px"
                color="primary"
                no-caps
                label="Opciones"
                dense
                class="q-mr-sm">
                <q-item clickable v-ripple @click="showProducto(producto)" v-close-popup>
                  <q-item-section>Editar</q-item-section>
                </q-item>
              </q-btn-dropdown>
            </td>

            <td>{{ producto.nombre_pro }}</td>
            <td>{{ producto.precio_pro }}</td>
            <td>{{ producto.precio_compra }}</td>
            <td>{{ producto.cantidad_pro }}</td>
            <td>{{ producto.descripcion_pro }}</td>
            <td>{{ producto.tonelada }}</td>
            <td>
              <a v-if="producto.foto_pro" :href="$url+'..'+producto.foto_pro" target="_blank">
                <!--                                  ver foto-->
                <q-img :src="$url+'..'+producto.foto_pro" alt="Imagen del producto" class="img-thumbnail" height="10"/>
              </a>
            </td>

            <td>{{ producto.estado_pro }}</td>
            <td>{{ producto.id }}</td>
            <td>{{ producto.categoria_pro }}</td>
            <td>{{ producto.marca_pro }}</td>
          </tr>
          </tbody>
        </q-markup-table>
<!--        <pre>{{productos}}</pre>-->
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
        <div class="text-h6">{{ producto.id ? 'Editar' : 'Nuevo' }} Producto</div>
      </q-card-section>
      <q-card-section>
        <q-form @submit.prevent="confirmarGuardar">
          <div class="row">
            <div class="col-12">
              <q-select
                dense
                v-model="producto.categoria_pro"
                :options="['CEMENTO', 'LADRILLO', 'FIERRO']"
                outlined
                :rules="[val => !!val || 'Este campo es requerido']"
                label="Tipo"/>
            </div>
            <div class="col-12">
              <q-input
                dense
                v-model="producto.marca_pro"
                outlined
                label="Marca"
                :rules="[val => !!val || 'Este campo es requerido']"
                @input="producto.marca_pro = producto.marca_pro.toUpperCase()"
                style="text-transform: uppercase;"/>
            </div>
            <div class="col-12">
              <q-input
                dense
                v-model="producto.nombre_pro"
                outlined
                label="Nombre Producto"
                :rules="[val => !!val || 'Este campo es requerido']"
                @input="producto.nombre_pro = producto.nombre_pro.toUpperCase()"
                style="text-transform: uppercase;"/>
            </div>
            <div class="col-12">
              <q-input
                dense
                v-model="producto.descripcion_pro"
                outlined
                label="Descripcion Producto"
                @input="producto.descripcion_pro = producto.descripcion_pro.toUpperCase()"
                hint=""
                style="text-transform: uppercase;"/>
            </div>
            <div class="col-6">
              <q-input dense v-model="producto.precio_pro" outlined label="Precio Venta" type="number"
                       hint=""
              />
            </div>
            <div class="col-6">
              <q-input dense v-model="producto.precio_compra" outlined label="Precio Compra" type="number"
                       hint=""
              />
            </div>
            <div class="col-12">
              <q-input dense v-model="producto.cantidad_pro" outlined label="Cantidad en stok" type="number"
                       hint=""
              />
            </div>
            <div class="col-12">
              <q-input dense v-model="producto.tonelada" outlined label="Cantidad Mayor general en ventas" type="number"
                       hint=""
              />
            </div>

            <div class="d-grid col-6 mx-auto mb-3">
              <img v-if="producto.foto_pro"
                   :src="producto.foto_pro.includes('data') ? producto.foto_pro : $url + '..' + producto.foto_pro"
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
                v-model="producto.estado_pro"
                :options="['Activo', 'Inactivo']"
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
  name: 'productos',

  data() {
    return {
      productos: [],
      producto: {},
      dialog: false,
      loading: false
    }
  },
  mounted() {
    this.getProductos();
  },
  methods: {
    exportExcel() {
        let data = [{
          sheet: "Productos",
          columns: [
            {label: "Categoria Producto", value: "categoria_pro"},
            {label: "Marca Producto", value: "marca_pro"},
            {label: "Nombre Producto", value: "nombre_pro"},
            {label: "Descripcion Producto", value: "descripcion_pro"},
            {label: "Precio Producto", value: "precio_pro"},
            {label: "Precio compra", value: "precio_compra"},
            {label: "Cantidad en Stok", value: "cantidad_pro"},
           //solo sale en text direccion  {label: "Foto Producto", value: "foto_pro"},
            {label: "Tonelada por Producto", value: "tonelada"},
            {label: "Estado Producto", value: "estado_pro"},
          ],
          content: this.productos
        }]

        const excel = Excel.export(data, "Reporte de Productos");

      },

    showProducto(producto) {
      this.producto = {...producto}; // Esto es importante para asegurarse de que los datos del producto se copien correctamente
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

      if (this.producto.id) {
        this.$axios.put(`productos/${this.producto.id}`, this.producto)
          .then(response => {
            const index = this.productos.findIndex(item => item.id === this.producto.id);
            this.productos[index] = response.data; // Actualiza el producto modificado
            this.dialog = false; // Cierra el diálogo
          })
          .catch(error => {
            console.log(error);
          })
          .finally(() => {
            this.loading = false;
          });
      } else {
        this.$axios.post('productos', this.producto)
          .then(response => {
            this.productos.push(response.data);
            this.dialog = false;
          })
          .catch(error => {
            console.log(error);
          })
          .finally(() => {
            this.loading = false;
          });
      }
    },

    eliminar(producto) {
      this.$q.dialog({
        title: 'Confirmar Eliminación',
        message: '¿Estás seguro de que deseas eliminar este producto?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.$axios.delete(`productos/${producto.id}`)
          .then(response => {
            this.productos = this.productos.filter(item => item.id !== producto.id);
          })
          .catch(error => {
            console.log(error);
          });
      });
    },

    dialogClick() {
      this.dialog = true;
      this.producto = {
        categoria_pro: '',
        marca_pro: '',
        nombre_pro: '',
        descripcion_pro: '',
        precio_pro: '',
        foto_pro: '',
        estado_pro: 'Activo',
      };
    },

    getProductos() {
  this.$axios.get('productos')
    .then(response => {
      this.productos = response.data;
      
      // Verificar si algún producto tiene cantidad_pro / tonelada < 2
      const sinInventario = this.productos.some(producto => {
        return producto.tonelada > 0 && producto.cantidad_pro / producto.tonelada < 2;
      });
      const productosAgotados = this.productos.filter(
  (producto) =>
    producto.cantidad_pro &&
    producto.tonelada &&
    producto.cantidad_pro / producto.tonelada < 2
);
    if (productosAgotados.length > 0) {
      const nombres = productosAgotados.map((producto) => producto.nombre_pro).join(", ");
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
        this.producto.foto_pro = this.foto; // Guardar la cadena base64 en producto.foto_pro
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
