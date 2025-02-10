<template>
    <q-page class="q-pa-md">
      <q-table :rows="cotizacionladrillos" :columns="columns" dense wrap-cells flat bordered :rows-per-page-options="[0]"
                title="cotizacioncementos" :filter="filter">
        <template v-slot:top-right>
          <q-btn
                    icon="download"
                    color="green"
                    label="Exportar"
                    @click="exportExcel"
                    no-caps
                ></q-btn>
          <q-btn color="primary" label="Nuevo" @click="cotizacionNew" outline no-caps  icon="add_circle_outline" :loading="loading" />
            <q-input v-model="filter" label="Buscar" dense outlined >
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
        </template>
        <template v-slot:body-cell-actions="props">
          <q-td :props="props">
            <q-btn-dropdown label="Opciones" no-caps size="10px" dense color="primary">
                <q-list>
                  <q-item clickable @click="cotizacionEdit(props.row)" v-close-popup>
                    <q-item-section avatar>
                      <q-icon name="edit" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>Editar</q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item clickable @click="cotizacionDelete(props.row.id)" v-close-popup>
                    <q-item-section avatar>
                      <q-icon name="delete" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>Eliminar</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
            </q-btn-dropdown>
          </q-td>
        </template>
      </q-table>
      <q-dialog v-model="cotizacionDialog" persistent>
        <q-card>
          <q-card-section class="q-pb-none row items-center">
            <div>
              {{ actionPeriodo }} Cotizacion Ladrillo
            </div>
            <q-space />
            <q-btn icon="close" flat round dense @click="cotizacionDialog = false" />
          </q-card-section>
          <q-card-section class="q-pt-none">
  
  
            <q-form @submit="cotizacionladrillo.id ? cotizacionPut() : cotizacionPost()">
              <q-input v-model="cotizacionladrillo.fecha" label="Fecha" dense outlined type="date" :disable="true"/>
  
                <q-select
                  v-model="cotizacionladrillo.cliente"
                  @filter="filterClientes"
                  @update:modelValue="changeDirecionTelefono"
                  :rules="[val => !!val || 'Seleccione un cliente']"
                  filled
                  emit-value
                  map-options
                  standout
                  use-input
                  label="Cliente"
                  :options="clientes"
                  option-value="id"
                  option-label="nombre_cliente"
                  dense
                  clearable
                
                />
  
              <q-select v-model="cotizacionladrillo.marca" label="Marca" dense outlined
               use-input @update:modelValue="filterProducts"
               :options="marcas"/>
  
  
              <q-select v-model="cotizacionladrillo.producto" label="Producto" dense outlined use-input
                          option-label="nombre_pro"
                          option-value="nombre_pro"
                          emit-value
                          map-options
                          :options="products"/>
  
              <q-input v-model="cotizacionladrillo.cantidad" label="Cantidad" type="number" dense outlined :rules="[val => !!val || 'Campo requerido']" />
                
                <q-select
                v-model="cotizacionladrillo.medida"
                filled
                standout
                label="Medida"
                dense
                outlined
                :options="[
                  { label: 'Un', value: 'un' },
                  { label: 'Tra', value: 'tra' },
                  { label: 'Kg', value: 'kg' }
                ]"
                option-value="value"
                option-label="label"
                emit-value
                map-options
              />
                 
                <q-select
                v-model="cotizacionladrillo.zona"
                filled
                standout
                label="Zona"
                dense
                outlined
                :options="zonas"
                option-value="nombre_zona"
                option-label="nombre_zona"
                emit-value
                map-options
  
              />
  
             
  
  
              <q-input v-model="cotizacionladrillo.precio_compra_cf" label="Precio Compra CF" type="number" dense outlined />
              <q-input v-model="cotizacionladrillo.precio_compra_sf" label="Precio Compra SF" type="number" dense outlined />
              <q-input v-model="cotizacionladrillo.precio_venta_cf" label="Precio Venta CF" type="number" dense outlined />
              <q-input v-model="cotizacionladrillo.precio_venta_sf" label="Precio Venta SF" type="number" dense outlined />
              <q-input v-model="cotizacionladrillo.observacion" label="Observación" dense outlined type="textarea" />
              <div class="text-right" >
                <q-btn color="negative" label="Cancelar" @click="cotizacionDialog = false" no-caps :loading="loading" />
                <q-btn color="primary" label="Guardar" type="submit" no-caps :loading="loading" class="q-ml-sm" />
              </div>
            </q-form>
          </q-card-section>
        </q-card>
      </q-dialog>
    </q-page>
  </template>
  <script>
  import moment from 'moment'
  import {Excel} from "src/addons/Excel";
  
  export default {
    name: 'Cotizacionladrillos',
    data() {
      return {
        cotizacionladrillos: [],
        cotizacionladrillo: {},
  
        cotizacionDialog: false,
        loading: false,
        filter: '',
        productosAll: [],
        products: [],
        clientes: [],
        clientesAll: [],
        zonas: [],
        marcas: [],
        actionPeriodo: '',
        filter: '',
        columns: [
          { name: 'actions', label: 'Acciones', align: 'center' },
          { name: 'fecha', label: 'Fecha', align: 'left', field: 'fecha' },
          { name: 'cliente', label: 'Cliente', align: 'left', field: 'cliente' },
          { name: 'marca', label: 'Marca', align: 'left', field: 'marca' },
          { name: 'producto', label: 'Producto', align: 'left', field: 'producto' },
          { name: 'cantidad', label: 'Cantidad', align: 'left', field: 'cantidad' },
          { name: 'medida', label: 'medida', align: 'left', field: 'medida' },
          { name: 'zona', label: 'Zona', align: 'left', field: 'zona' },
          { name: 'precio_compra_cf', label: 'Precio Compra CF', align: 'left', field: 'precio_compra_cf' },
          { name: 'precio_compra_sf', label: 'Precio Compra SF', align: 'left', field: 'precio_compra_sf' },
          { name: 'precio_venta_cf', label: 'Precio Venta CF', align: 'left', field: 'precio_venta_cf' },
          { name: 'precio_venta_sf', label: 'Precio Venta SF', align: 'left', field: 'precio_venta_sf' },
          { name: 'observacion', label: 'Observación', align: 'left', field: 'observacion' },
        ],
      }
    },
    mounted() {
      this.cotizacionsGet()
      this.getProductos()
      this.getClientes()
      this.getZonas()
  
    },
    methods: {
  
      exportExcel() {
          let data = [{
            sheet: "cotizacionladrillos",
            columns: [
              {label: "Fecha", value: "fecha"},
              {label: "Nombre del cliente", value: "cliente"},
              {label: "Marca", value: "marca"},
              {label: "Producto", value: "producto"},
              {label: "Cantidad", value: "cantidad"},
              {label: "medida", value: "medida"},
              
              {label: "Zona", value: "zona"},
              {label: "Precio_compra_cf", value: "precio_compra_cf"},
              {label: "Precio_compra_sf", value: "precio_compra_sf"},
              {label: "Precio_venta_cf", value: "precio_venta_cf"},
              {label: "Precio_venta_sf", value: "precio_venta_sf"},
              {label: "Observacion", value: "observacion"},
            ],
            content: this.cotizacioncementos
          }]
  
          const excel = Excel.export(data, "Reporte de cotizacion ladrillo");
  
        },
  
  
      getZonas() {
        this.$axios.get('zonas').then(response => {
          this.zonas = response.data
        }).catch(error => {
          console.log(error)
        })
      },
      filterClientes(val, update) {
        if (val === '') {
          update(() => {
            this.clientes = this.clientesAll
          })
          return
        }
        const needle = val.toLowerCase()
        update(() => {
          this.clientes = this.clientesAll.filter(v => v.nombre_cliente.toLowerCase().indexOf(needle) > -1)
        })
      },
      getClientes() {
        this.$axios.get('clientes').then(response => {
          this.clientes = response.data
          this.clientesAll = response.data
        }).catch(error => {
          console.log(error)
        })
      },
  
  
      filterProducts(val) {
        console.log(val)
        if (val === null) {
          return
        }
        this.products = this.productosAll.filter(product => product?.marca_pro === val)
      },
      getProductos() {
        this.$axios.get('productos')
          .then(response => {
            this.productosAll = response.data
            this.products = this.productosAll
            this.products.forEach(product => {
              if (!this.marcas.includes(product.marca_pro)) {
                this.marcas.push(product.marca_pro)
              }
            })
          })
          .catch(error => {
            console.log(error)
          })
      },
      cotizacionNew() {
        this.cotizacioncemento = {
          fecha: moment().format('YYYY-MM-DD'),
          cliente: '',
          marca: '',
          producto: '',
          cantidad: 0,
          medida: 'Un',
          zona: '',
          precio_compra_cf: 0,
          precio_compra_sf: 0,
          precio_venta_cf: 0,
          precio_venta_sf: 0,
          observacion: '',
        }
        this.actionPeriodo = 'Nueva'
        this.cotizacionDialog = true
      },
      cotizacionsGet() {
        this.loading = true
        this.$axios.get('cotizacionladrillos').then(res => {
          this.cotizacionladrillos = res.data
        }).catch(error => {
          this.$alert.error(error.response.data.message)
        }).finally(() => {
          this.loading = false
        })
      },
      cotizacionPost() {
        this.loading = true
        this.$axios.post('cotizacionladrillos', this.cotizacionladrillo).then(res => {
          this.cotizacionsGet()
          this.cotizacionDialog = false
          this.$alert.success('Cotizacion creada')
        }).catch(error => {
          this.$alert.error(error.response.data.message)
        }).finally(() => {
          this.loading = false
        })
      },
      cotizacionPut() {
        this.loading = true
        this.$axios.put('cotizacionladrillos/' + this.cotizacionladrillo.id, this.cotizacionladrillo).then(res => {
          this.cotizacionsGet()
          this.cotizacionDialog = false
          this.$alert.success('Cotizacion actualizada')
        }).catch(error => {
          this.$alert.error(error.response.data.message)
        }).finally(() => {
          this.loading = false
        })
      },
      cotizacionEdit(cotizacionladrillo) {
        this.cotizacionladrillo = { ...cotizacionladrillo }
        this.actionPeriodo = 'Editar'
        this.cotizacionDialog = true
      },
      cotizacionDelete(id) {
        this.$alert.dialog('¿Desea eliminar la cotizacion?')
          .onOk(() => {
            this.loading = true
            this.$axios.delete('cotizacionladrillos/' + id).then(res => {
              this.cotizacionsGet()
              this.$alert.success('Cotizacion eliminada')
            }).catch(error => {
              this.$alert.error(error.response.data.message)
            }).finally(() => {
              this.loading = false
            })
          })
      }
    }
  }
  </script>
  