<template>
    <q-page class="bg-grey-2 q-pa-md">
      <q-card flat bordered class="q-pa-md">
        <q-card-section>
          <div class="text-h5 text-primary">Lista de Preventas LADRILLO</div>
          <div ><q-btn  icon="download" color="green"  label="Exportar" @click="exportExcel"   no-caps></q-btn></div>
        </q-card-section>
        <q-separator spaced/>
        <q-card-section class="q-pa-none">
          <q-list dense class="rounded-borders">
            <template v-if="preventaladrillos.length === 0">
              <q-item>
                <q-item-section>
                  <q-item-label class="text-h6 text-grey">No hay preventas</q-item-label>
                </q-item-section>
              </q-item>
            </template>
            <q-item
              v-for="preventaladrillo in preventaladrillos"
              :key="preventaladrillo.id"
              @click="showPreventaladrillo(preventaladrillo)"
              clickable
              class="q-my-sm bg-white hover-bg-light-blue"
              style="border: 1px solid #e0e0e0; border-radius: 8px;"
            >
              <q-item-section avatar>
                <q-icon name="home" color="grey" size="md"/>
              </q-item-section>
  
              <q-item-section>
                <q-item-label class="text-h6">
                  {{ preventaladrillo.propietario || 'Sin propietario' }}
                  {{ preventaladrillo.telefono_propietario ? `(${preventaladrillo.telefono_propietario})` : '' }}
                </q-item-label>
                <q-item-label class="text-subtitle1 text-grey">{{ preventaladrillo.direccion }}</q-item-label>
                <q-item-label class="text-caption text-positive">
                  {{ preventaladrillo.zona }} - {{ preventaladrillo.tipo_construccion }} - {{ preventaladrillo.user?.name }}
                  - {{ preventaladrillo.fecha }}
                </q-item-label>
              </q-item-section>
  
              <q-item-section side>
                <q-icon name="arrow_forward"/>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
      </q-card>
  <!--    <pre class="q-mt-md q-pa-sm bg-grey-4 rounded-borders text-body2">-->
  <!--    {{ preventas }}-->
  <!--  </pre>-->
    </q-page>
    <q-page-sticky position="bottom-right" class="text-bold" :offset="[18, 18]">
      <q-btn fab icon="add" color="primary" @click="dialogClick"/>
    </q-page-sticky>
    <q-dialog v-model="dialog"
              :position="esMovil ? undefined : 'right'"
              :maximized="true"
              transition-show="slide-left"
              transition-hide="slide-right"
    >
      <q-card style="width: 450px; max-width: 100vw;">
        <q-card-section class="row items-center q-px-md bg-primary text-white q-px-none">
          <q-btn flat round dense icon="fa-solid fa-arrow-left" v-close-popup/>
          <q-space/>
          <div class="text-h6">{{ preventaladrillo.id ? 'Editar' : 'Nueva' }} preventa</div>
        </q-card-section>
        <q-card-section>
          <q-form @submit="submit">
            <div class="row">
              <div class="col-12">
                <q-input dense v-model="preventaladrillo.fecha" outlined label="Fecha" type="date"
                         :disable="$store.user.role !== 'Admin' && $store.user.role !== 'Administrador'"/>
              </div>
              <div class="col-6 q-pa-xs">
                <q-btn label="Propietario" :outline="propietarioBtnBool" class="full-width" no-caps color="primary"
                       @click="propietarioBtnBool = !propietarioBtnBool"
                       :disable="$store.user.role !== 'Admin' && $store.user.role !== 'Administrador'"
                />
              </div>
              <div class="col-6 q-pa-xs">
                <q-btn label="Encargado" :outline="encargadoBtnBool" class="full-width" no-caps color="primary"
                       @click="encargadoBtnBool = !encargadoBtnBool"
                        :disable="$store.user.role !== 'Admin' && $store.user.role !== 'Administrador'"
                />
              </div>
              <template v-if="!propietarioBtnBool">
                <div class="col-12">
                  <q-input dense v-model="preventaladrillo.propietario" outlined label="Propietario"
                           :rules="[val => !!val || 'Este campo es requerido']"
                           :disable="$store.user.role !== 'Admin' && $store.user.role !== 'Administrador'"
                  />
                </div>
                <div class="col-12">
                  <q-input dense v-model="preventaladrillo.telefono_propietario" outlined label="Telefono Propietario"
                           type="number"
                            :disable="$store.user.role !== 'Admin' && $store.user.role !== 'Administrador'"
                  />
                </div>
              </template>
              <template v-if="!encargadoBtnBool">
                <div class="col-12">
                  <q-input dense v-model="preventaladrillo.contratista" outlined label="Encargado"
                            :disable="$store.user.role !== 'Admin' && $store.user.role !== 'Administrador'"
                  />
                </div>
                <div class="col-12">
                  <q-input dense v-model="preventaladrillo.telefono_contratista" outlined label="Telefono Encargado"
                            :disable="$store.user.role !== 'Admin' && $store.user.role !== 'Administrador'"
                           type="number"/>
                </div>
              </template>
              <div class="col-12">
                <q-input dense v-model="preventaladrillo.ubicacion" outlined label="Ubicacion"
                          :disable="$store.user.role !== 'Admin' && $store.user.role !== 'Administrador'"
                >
                  <template v-slot:append>
                    <q-btn flat icon="fa-solid fa-map-marker-alt" @click="myLocation"/>
                  </template>
                </q-input>
              </div>
              <div class="col-12">
                <div style="height:250px; width:100%">
                              <div class="div">
                                <q-btn icon="my_location" color="primary" @click="openGoogleMaps" dense flat/>
                              </div>
                  <l-map
                    ref="map"
                    v-model:zoom="zoom"
                    :use-global-leaflet="false"
                    :center="location"
                    @click="onMapClick"
                  >
                    <l-tile-layer
                      v-for="tileProvider in tileProviders"
                      :key="tileProvider.name"
                      :name="tileProvider.name"
                      :visible="tileProvider.visible"
                      :url="tileProvider.url"
                      :attribution="tileProvider.attribution"
                      layer-type="base"
                    />
                    <l-marker
                      :lat-lng="location"
                      @moveend="onMarkerMoveEnd"
                      ref="marker"
                      :draggable="true"
                    />
                  </l-map>
                </div>
              </div>
              <div class="col-12">
                <q-input dense v-model="preventaladrillo.direccion" outlined label="Direccion"
                         :rules="[val => !!val || 'Este campo es requerido']"
                         :disable="$store.user.role !== 'Admin' && $store.user.role !== 'Administrador'"
                />
              </div>
              <div class="col-12">
                <!-- <q-input dense v-model="preventa.zona" outlined label="Zona" /> -->
                <q-select
                  dense
                  v-model="preventaladrillo.zona"
                  :options="[
                              'NORTE',
                              'ESTE',
                              'SUD',
                              'OESTE',
                              'CENTRO',
                          ]"
                  outlined
                  :rules="[val => !!val || 'Este campo es requerido']"
                  :disable="$store.user.role !== 'Admin' && $store.user.role !== 'Administrador'"
                  label="Zona"/>
              </div>
              <div class="col-12">
                <!-- <q-input dense v-model="preventa.tipo_construccion" outlined label="Tipo Construccion" /> -->
                <q-select dense v-model="preventaladrillo.tipo_construccion" outlined label="Estado de la Obra"
                          use-input
                          :options="['Inicio Obra','Columnas', 'Muralla', 'Zapata', 'Sobrecimiento', 'Losa', 'Paralizada', 'Concluida']"
                          :disable="$store.user.role !== 'Admin' && $store.user.role !== 'Administrador'"
                />
              </div>
              <div class="col-12">
                <q-input dense v-model="preventaladrillo.volumen" outlined label="Cantidad" type="number"
                         :disable="$store.user.role !== 'Admin' && $store.user.role !== 'Administrador'"
                />
              </div>
              <div class="col-12">
                <!-- <q-input dense v-model="preventa.tipo_construccion" outlined label="Tipo Construccion" /> -->
                <q-select dense v-model="preventaladrillo.medida" outlined label="Medida"
                          use-input
                          :options="['Un','tra', 'Kg']"
                          :disable="$store.user.role !== 'Admin' && $store.user.role !== 'Administrador'"
                />
              </div>
  
              <div class="col-12">
                <!-- <q-input dense v-model="preventa.marca" outlined label="Marca" /> -->
                <q-select dense v-model="preventaladrillo.marca" outlined label="Marca"
                use-input @update:modelValue="filterProducts"
                          :disable="$store.user.role !== 'Admin' && $store.user.role !== 'Administrador'"
                :options="marcas"/>
              </div>
              <div class="col-12">
                <!-- <q-input dense v-model="preventa.marca" outlined label="Marca" /> -->
                <q-select dense v-model="preventaladrillo.producto" outlined label="Producto"
                          use-input
                          option-label="nombre_pro"
                          option-value="nombre_pro"
                          emit-value
                          map-options
                          :disable="$store.user.role !== 'Admin' && $store.user.role !== 'Administrador'"
                          :options="products"/>
              </div>
              <div class="col-12">
                <q-input dense v-model="preventaladrillo.observacion" outlined label="Observacion"
                          :disable="$store.user.role !== 'Admin' && $store.user.role !== 'Administrador'"
                />
              </div>
              <q-card-actions align="right" v-if="$store.user.role === 'Admin' || $store.user.role === 'Administrador'">
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
  import moment from 'moment'
  import {Loading} from 'quasar';
  import {Icon} from 'leaflet';
  import "leaflet/dist/leaflet.css";
  import {LMap, LTileLayer, LMarker} from "@vue-leaflet/vue-leaflet";
  import {Excel} from "src/addons/Excel";
  
  export default {
    name: 'Preventaladrillo',
    components: {
      LMap,
      LTileLayer,
      LMarker
    },
    data() {
      return {
        tileProviders: [
          {
            name: 'Mapa',
            visible: true,
            url: 'https://mt1.google.com/vt/lyrs=r&x={x}&y={y}&z={z}',
            attribution: '&copy; Google Maps'
          },
          {
            name: 'Satelite',
            visible: false,
            url: 'https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',
            attribution: '&copy; Google Maps'
          }
        ],
        location: [-17.969753, -67.114749],
        zoom: 15,
        propietarioBtnBool: true,
        encargadoBtnBool: true,
        preventaladrillos: [],
        preventaladrillo: {},
        dialog: false,
        loading: false,
        productosAll: [],
        products: [],
        marcas: []
      }
    },
    mounted() {
      this.getPreventas()
      this.getProductos()
    },
    methods: {
  
      exportExcel() {
          let data = [{
            sheet: "Preventaladrillo",
            columns: [
            { label: "Fecha", value: "fecha" },
            { label: "Propietario", value: "propietario" },
            { label: "Teléfono del propietario", value: "telefono_propietario" },
            { label: "Contratista", value: "contratista" },
            { label: "Teléfono del contratista", value: "telefono_contratista" },
            { label: "Dirección", value: "direccion" },
            { label: "Ubicación", value: "ubicacion" },
            { label: "Zona", value: "zona" },
            { label: "Tipo de construcción", value: "tipo_construccion" },
            { label: "Cantidad", value: "volumen" },
            { label: "Medida", value: "medida" },
            { label: "Marca", value: "marca" },
            { label: "Producto", value: "producto" },
            { label: "Observación", value: "observacion" },
            ],
            content: this.preventaladrillos
          }]
  
          const excel = Excel.export(data, "Reporte de Prospecciones");
  
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
      onMapClick(event) {
        this.location = [event.latlng.lat, event.latlng.lng]
        this.preventaladrillo.ubicacion = `${event.latlng.lat.toFixed(7)}, ${event.latlng.lng.toFixed(7)}`
      },
      openGoogleMaps() {
        const [lat, lng] = this.preventaladrillo.ubicacion.split(',').map(Number)
        window.open(`https://www.google.com/maps/search/?api=1&query=${lat},${lng}`)
      },
      deletePreventa(preventaladrillo) {
        this.$alert.dialog('¿Desea eliminar la preventa?')
          .onOk(() => {
            this.$axios.delete(`preventas/${preventaladrillo.id}`)
              .then(() => {
                this.preventaladrillo = this.preventaladrillos.filter(p => p.id !== preventaladrillo.id)
                this.dialog = false
              })
              .catch(error => {
                console.log(error)
              })
          })
      },
      showPreventaladrillo(preventaladrillo) {
        this.preventaladrillo = preventaladrillo
        this.dialog = true
        const lngLat = preventaladrillo.ubicacion.split(',').map(Number)
        console.log(lngLat)
        this.location = lngLat
      },
      onMarkerMoveEnd(event) {
        const marker = event.target;
        const newLatLng = marker.getLatLng();
        this.location = [newLatLng.lat, newLatLng.lng];
        this.preventaladrillo.ubicacion = `${newLatLng.lat.toFixed(7)}, ${newLatLng.lng.toFixed(7)}`
      },
      myLocation() {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition((position) => {
            this.location = [position.coords.latitude, position.coords.longitude]
            this.preventaladrillo.ubicacion = `${position.coords.latitude}, ${position.coords.longitude}`
          })
        }
      },
      submit() {
        if (this.preventaladrillo.id) {
          this.updatePreventa()
        } else {
          this.createPreventa()
        }
  
      },
      updatePreventa() {
        this.loading = true
        this.$axios.put(`preventaladrillos/${this.preventaladrillo.id}`, this.preventaladrillo)
          .then(() => {
            const index = this.preventaladrillos.findIndex(p => p.id === this.preventaladrillo.id)
            this.preventaladrillos.splice(index, 1, this.preventaladrillo)
            this.dialog = false
          })
          .catch(error => {
            console.log(error)
          }).finally(() => {
          this.loading = false
        })
      },
      createPreventa() {
        this.loading = true
        this.$axios.post('preventaladrillos', this.preventaladrillo)
          .then(response => {
            this.preventaladrillos.unshift(response.data)
            this.dialog = false
          })
          .catch(error => {
            console.log(error)
          }).finally(() => {
          this.loading = false
        })
      },
      dialogClick() {
        this.dialog = true
        this.preventaladrillo = {
          fecha: moment().format('YYYY-MM-DD'),
          propietario: '',
          contratista: '',
          telefono_propietario: '',
          telefono_contratista: '',
          ubicacion: '-17.969753, -67.114749',
          zona: '',
          observacion: '',
          tipo_construccion: '',
          volumen: '',
          marca: '',
          direccion: ''
        }
      },
      getPreventas() {
        this.$axios.get('preventaladrillos')
          .then(response => {
            this.preventas = response.data
          })
          .catch(error => {
            console.log(error)
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
  