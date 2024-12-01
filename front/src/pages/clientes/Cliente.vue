<template>
  <q-page class="bg-grey-3 q-pa-xs">
    <q-card>
      <q-card-section class="q-pa-xs">
        <q-table :rows="clientes" :columns="columns" dense wrap-cells flat bordered :rows-per-page-options="[0]"
                 title="Clientes" :filter="filter">
          <template v-slot:top-right>
            <q-btn color="primary" label="Mapa" @click="showGlobal" outline no-caps icon="public" :loading="loading"/>
            <q-input v-model="filter" label="Buscar" dense outlined>
              <template v-slot:append>
                <q-icon name="search"/>
              </template>
            </q-input>
          </template>
          <template v-slot:body-cell-actions="props">
            <q-td :props="props">
              <q-btn-dropdown label="Opciones" no-caps size="10px" dense color="primary">
                <q-list>
                  <q-item clickable @click="userEdit(props.row)" v-close-popup>
                    <q-item-section avatar>
                      <q-icon name="edit"/>
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>Editar</q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item clickable @click="userDelete(props.row.id)" v-close-popup>
                    <q-item-section avatar>
                      <q-icon name="delete"/>
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>Eliminar</q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item clickable @click="userEditPassword(props.row)" v-close-popup>
                    <q-item-section avatar>
                      <q-icon name="edit"/>
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>Cambiar contraseña</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-btn-dropdown>
            </q-td>
          </template>
          <template v-slot:body-cell-role="props">
            <q-td :props="props">
              <q-chip :label="props.row.role"
                      :color="props.row.role === 'Administrador' ? 'primary' : props.row.role === 'Gerente' ? 'info' : 'positive'"
                      text-color="white" dense size="14px"/>
            </q-td>
          </template>
        </q-table>
      </q-card-section>
    </q-card>
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
        <div class="text-h6">{{ cliente.id ? 'Editar' : 'Nuevo' }} cliente</div>
      </q-card-section>
      <q-card-section>
        <q-form @submit="submit" v-if="!cliente.id">
          <div class="row">
            <div class="col-12">
              <!-- <q-input dense v-model="cliente.zona" outlined label="Zona" /> -->
              <q-select
                dense
                v-model="cliente.tipo_cliente"
                :options="[
                                'FERRETERIA',
                                'OBRA',
                                'EMPRESA CONSTRUCTORA',
                            ]"
                outlined
                :rules="[val => !!val || 'Este campo es requerido']"
                label="Tipo"/>
            </div>
            <div class="col-12">
              <q-input
                dense
                v-model="cliente.nombre_cliente"
                outlined
                label="Cliente"
                :rules="[val => !!val || 'Este campo es requerido']"
                @input="cliente.nombre_cliente = cliente.nombre_cliente.toUpperCase()"
                style="text-transform: uppercase;"
              />
            </div>
            <div class="col-12">
              <q-input dense v-model="cliente.telefono_1" outlined label="Telefono cliente" type="number"
                       :rules="[val => !!val || 'Este campo es requerido']"/>
            </div>
            <div class="col-12">
              <q-input dense v-model="cliente.telefono_2" outlined label="Telefono cliente 2" type="number"/>
            </div>
            <div class="col-12">
              <q-input
                dense
                v-model="cliente.direccion"
                outlined
                label="Dirección"
                :rules="[val => !!val || 'Este campo es requerido']"
                @input="cliente.direccion = cliente.direccion.toUpperCase()"
                style="text-transform: uppercase;"
              />
            </div>
            <div class="col-12">
              <q-input
                dense
                v-model="cliente.complemento"
                outlined
                label="Complemento"
                @input="cliente.complemento = cliente.complemento.toUpperCase()"
                style="text-transform: uppercase;"
              />
            </div>
            <div class="col-12">
              <q-input dense v-model="cliente.ubicacion" outlined label="Ubicacion">
                <template v-slot:append>
                  <q-btn flat icon="fa-solid fa-map-marker-alt" @click="myLocation"/>
                </template>
              </q-input>
            </div>
            <div class="col-12">
              <div style="height:250px; width:100%">
                <l-map ref="map" v-model:zoom="zoom" :use-global-leaflet="false" :center="location">
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
              <q-select
                dense
                v-model="zonass.zona_id"
                :options="zonas"
                option-label="nombre_zona"
                option-value="id"
                outlined
                :rules="[val => !!val || 'Este campo es requerido']"
                label="Seleccionar Zona"
              />
            </div>
            <div class="col-12">
            <q-select
              dense
              v-model="ejecutivoss.ejecutivo_id"
              :options="ejecutivos"
              option-label="apodo"
              option-value="id"
              outlined
              label="Seleccionar Ejecutivo"
              :rules="[val => !!val || 'Este campo es requerido']"
              
            />
          </div>

            <div class="col-12">
              <q-select
                dense
                v-model="cliente.region_id"
                :options="regions"
                option-value="id"
                option-label="nombre_region"
                outlined
                label="Región"
                :rules="[val => !!val || 'Seleccione una región']"
              />
            </div>
            <div class="col-12">
              <q-input dense v-model="cliente.cumple" outlined label="Cumpleaños" type="date"/>
            </div>
            <div class="col-12">
              <!-- <q-input dense v-model="cliente.zona" outlined label="Zona" /> -->
              <q-select
                dense
                v-model="cliente.estado"
                :options="[
                                'ACTIVO',
                                'INACTIVO',
                            ]"
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
        <div class="row" v-else>
          <div class="col-5">
            <div style="height: 150px; width: 100%;"> <!-- Reduce el alto del mapa -->
              <l-map ref="map"
                     v-model:zoom="zoom"
                     :use-global-leaflet="false"
                     :center="location"
                     :scrollWheelZoom="false"
                     :dragging="false"
                     :touchZoom="false"
                     :doubleClickZoom="false"
                     :boxZoom="false"
                     :keyboard="false">
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
                  ref="marker"
                />
              </l-map>
            </div>
          </div>

        </div>


      </q-card-section>
    </q-card>
  </q-dialog>
  <q-dialog v-model="dialogGlobal">
    <q-card style="width: 650px; max-width: 650px;">
      <q-card-section class="q-pa-md row items-center">
        <div class="text-subtitle2">
          Vista de clientes
        </div>
        <q-space/>
        <q-btn flat round dense icon="close" v-close-popup/>
      </q-card-section>
      <q-card-section>
        <div style="height: 500px; width: 100%;">
          <l-map ref="map" v-model:zoom="zoom" :use-global-leaflet="false" :center="location">
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
              v-for="cliente in clientes"
              :key="cliente.id"
              :lat-lng="[parseFloat(cliente.lat), parseFloat(cliente.lng)]"
              @click="showCliente(cliente)"
            />
          </l-map>
        </div>
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

export default {
  name: 'clientes',
  components: {
    LMap,
    LTileLayer,
    LMarker
  },
  data() {
    return {
      dialogGlobal: false,
      filter: '',
      columns: [
        {name: 'actions', label: 'Acciones', align: 'center'},
        {name: 'tipo_cliente', label: 'Tipo cliente', align: 'left', field: 'tipo_cliente'},
        {name: 'nombre_cliente', label: 'Nombre', align: 'left', field: 'nombre_cliente'},
        {name: 'telefono_1', label: 'Telefono', align: 'left', field: 'telefono_1'},
        {name: 'telefono_2', label: 'Telefono 2', align: 'left', field: 'telefono_2'},
        {name: 'direccion', label: 'Direccion', align: 'left', field: 'direccion'},
        {name: 'complemento', label: 'Complemento', align: 'left', field: 'complemento'},
        {name: 'ubicacion', label: 'Ubicacion', align: 'left', field: 'ubicacion'},
        {name: 'zona', label: 'Zona', align: 'left', field: 'zona'},
        {name: 'ejecutivo', label: 'Ejecutivo', align: 'left', field: 'ejecutivo'},
        {name: 'region', label: 'Region', align: 'left', field: 'region'},
        {name: 'cumple', label: 'Cumpleaños', align: 'left', field: 'cumple'},
        {name: 'estado', label: 'Estado', align: 'left', field: 'estado'},
      ],
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
      clientes: [],
      cliente: {region_id: null,},
      zonass: {zona_id: null,},
      ejecutivoss: {ejecutivo_id: null,},
      regions: [],
      dialog: false,
      loading: false

    }
  },
  mounted() {
    this.getClientes();
    this.getZonas();
    this.getEjecutivos();
    this.getRegions(); // Carga las regiones al montar el componente

  },
  methods: {
    showGlobal() {
      this.dialogGlobal = true
    },
    getZonas() {
      this.loading = true;
      this.$axios.get('zonas')
        .then(response => {
          this.zonas = response.data.map(zona => ({
            id: zona.id,               // Asegúrate de que estos nombres son correctos
            nombre_zona: zona.nombre_zona,
          }));
        })
        .catch(error => {
          console.error("Error al obtener las zonas:", error);
          this.$q.notify({
            color: 'negative',
            message: 'Error al obtener las zonas. Intenta nuevamente.',
            icon: 'report_problem',
          });
        })
        .finally(() => {
          this.loading = false;
        });
    },
    getRegions() {
      this.$axios
        .get("/regions") // Ajusta la URL del endpoint según tu API
        .then((response) => {
          this.regions = response.data;
        })
        .catch((error) => {
          console.error("Error al cargar las regiones:", error);
          this.$q.notify({
            color: "negative",
            message: "No se pudo cargar las regiones.",
          });
        });
    },
    getEjecutivos() {
      this.loading = true;
      this.$axios.get('ejecutivos')
        .then(response => {
          this.ejecutivos = response.data.map(ejecutivo => ({
            id: ejecutivo.id,               // Verifica que estos nombres coinciden con los datos de la API
            apodo: ejecutivo.apodo
          }));
        })
        .catch(error => {
          console.error("Error al obtener los ejecutivos:", error);
          this.$q.notify({
            color: 'negative',
            message: 'Error al obtener los ejecutivos. Intenta nuevamente.',
            icon: 'report_problem'
          });
        })
        .finally(() => {
          this.loading = false;
        });
    },

    showCliente(cliente) {
      this.cliente = cliente
      this.dialog = true
      const lngLat = cliente.ubicacion.split(',').map(Number)
      console.log(lngLat)
      this.location = lngLat
    },
    onMarkerMoveEnd(event) {
      const marker = event.target;
      const newLatLng = marker.getLatLng();
      this.location = [newLatLng.lat, newLatLng.lng];
      this.cliente.ubicacion = `${newLatLng.lat.toFixed(7)}, ${newLatLng.lng.toFixed(7)}`
    },
    myLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          this.location = [position.coords.latitude, position.coords.longitude]
          this.cliente.ubicacion = `${position.coords.latitude}, ${position.coords.longitude}`
        })
      }
    },
    submit() {
      this.loading = true
      this.$axios.post('clientes', this.cliente)
        .then(response => {
          this.clientes.unshift(response.data)
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
      this.cliente = {
        tipo_cliente: '',
        nombre_cliente: '',
        telefono_1: '',
        telefono_2: '',
        direccion: '',
        complemento: '',
        ubicacion: '-17.969753, -67.114749',
        zona: '',
        region: '',
        cumple: moment().format('YYYY-MM-DD'),
        estado: 'ACTIVO',
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
  background-color: #4c9baf;
  color: white;
}

.styled-table tbody tr:hover {
  background-color: #f1f1f1;
}
</style>
