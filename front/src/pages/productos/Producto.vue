<template>
    <q-page class="bg-grey-3 q-pa-xs">
        <q-card>
            <q-card-section class="q-pa-xs">
                <table border="1" style="width:100%" class="styled-table">
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>categoria</th>
                            <th>marca</th>
                            <th>nombre</th>
                            <th>descripcion</th>
                            <th>precio</th>
                            <th>foto</th>
                            <th>estado</th>
                            <th>acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(producto, index) in productos" :key="index">
                            <td>{{ producto.id }}</td>
                            <td>{{ producto.categoria_pro }}</td>
                            <td>{{ producto.marca_pro }}</td>
                            <td>{{ producto.nombre_pro }}</td>
                            <td>{{ producto.descripcion_pro }}</td>
                            <td>{{ producto.precio_pro }}</td>
                            <td>
                                <a v-if="producto.foto_pro" :href="producto.foto_pro" target="_blank">Ver Foto</a>
                            </td>
                            <td>{{ producto.estado_pro }}</td>
                            <td>
                                <q-btn @click="eliminar(producto)" color="negative" size="xs" icon="delete"/>
                                <q-btn @click="showProducto(producto)" class="glossy" rounded color="deep-orange" label="Modificar" />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </q-card-section>
        </q-card>
    </q-page>
    
    <q-page-sticky position="bottom-right" class="text-bold" :offset="[18, 18]">
        <q-btn fab icon="add" color="primary" @click="dialogClick" />
    </q-page-sticky>

    <q-dialog v-model="dialog"
              :position="esMovil ? undefined : 'right'"
              :maximized="true"
              transition-show="slide-left"
              transition-hide="slide-right">
        <q-card style="width: 450px; max-width: 100vw;">
            <q-card-section class="row items-center q-px-md bg-primary text-white q-px-none">
                <q-btn flat round dense icon="fa-solid fa-arrow-left" v-close-popup />
                <q-space/>
                <div class="text-h6">{{ producto.id ? 'Editar' : 'Nuevo' }} Producto</div>
            </q-card-section>
            <q-card-section>
                <q-form @submit="submit" v-if="!producto.id">
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
                                style="text-transform: uppercase;"/>
                        </div>
                        <div class="col-12">
                            <q-input dense v-model="producto.precio_pro" outlined label="Precio Producto" type="number"/>
                        </div>

                        <div class="d-grid col-6 mx-auto mb-3">
                            <img v-if="producto.foto_pro" :src="producto.foto_pro" alt="Imagen del producto" class="img-thumbnail" height="100">
                            <img v-else height="100" src="https://cdn4.iconfinder.com/data/icons/small-n-flat/24/user-256.png" class="img-thumbnail" id="fotoimg" alt="">     
                        </div>

                        <div class="input-group mb-3">
                            <span class="input-group-text"><i class="fa-solid fa-gift"></i></span>
                            <input v-on:change="previsualizarFoto" type="file" accept="image/png, image/jpg, image/gif" class="form-control">
                        </div>

                        <div class="col-12">
                            <q-select
                                dense
                                v-model="producto.estado_pro"
                                :options="['ACTIVO', 'INACTIVO']"
                                outlined
                                :rules="[val => !!val || 'Este campo es requerido']"
                                label="Estado"/>
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
export default {
    name: 'productos',
    
    data () {
        return {
            productos: [],
            producto: {},
            dialog: false,
            loading: false
        }
    },
    mounted () {
        this.getProductos();
    },
    methods: {
        showProducto(producto) {
            this.producto = producto;
            this.dialog = true;
        },
        
        submit() {
            this.loading = true;
            
            this.$axios.post('productos', this.producto)
                .then(response => {
                    this.productos.push(response.data);
                    this.dialog = false;
                })
                .catch(error => {
                    console.log(error);
                }).finally(() => {
                    this.loading = false;
                });
        },
        
        eliminar(producto) {
            // Confirmar eliminación
            this.$q.dialog({
                title: 'Confirmar Eliminación',
                message: '¿Estás seguro de que deseas eliminar este producto?',
                cancel: true,
                persistent: true
            }).onOk(() => {
                this.$axios.delete(`productos/${producto.id}`)
                    .then(response => {
                        // Filtrar el producto eliminado de la lista
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
                estado_pro:'ACTIVO',
            };
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
}

.styled-table th,
.styled-table td {
  padding: 12px;
  text-align: left;
}

.styled-table thead {
  background-color: #974ac1;
  color: white;
}

.styled-table tbody tr:hover {
  background-color: #f1f1f1;
}
</style>