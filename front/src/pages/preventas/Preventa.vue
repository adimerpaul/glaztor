<template>
    <q-page >
        {{preventas}}
    </q-page>
    <q-page-sticky position="bottom-right" class="text-bold" :offset="[18, 18]">
        <q-btn fab icon="add" color="primary" @click="dialogClick" />
    </q-page-sticky>
    <q-dialog v-model="dialog"
              :position="esMovil ? undefined : 'right'"
              :maximized="true"
              transition-show="slide-left"
              transition-hide="slide-right"
    >
      <q-card style="width: 450px; max-width: 100vw;">
        <q-card-section class="row items-center q-px-md bg-primary text-white q-px-none">
          <q-btn flat round dense icon="fa-solid fa-arrow-left" v-close-popup />
          <q-space/>
          <div class="text-h6">{{ preventa.id ? 'Editar' : 'Nueva' }} preventa</div>
        </q-card-section>
        <q-card-section>
            <q-form @submit="submit">
                <div class="row">
                <div class="col-12">
                    <q-input dense v-model="preventa.fecha" outlined label="Fecha" type="date" :disable="true" />
                </div>
                <div class="col-6 q-pa-xs">
                    <q-btn label="Propietario" :outline="propietarioBtnBool" class="full-width" no-caps color="primary" @click="propietarioBtnBool = !propietarioBtnBool" />
                </div>
                <div class="col-6 q-pa-xs">
                    <q-btn label="Encargado" :outline="encargadoBtnBool" class="full-width" no-caps color="primary" @click="encargadoBtnBool = !encargadoBtnBool" />
                </div>
                <template v-if="!propietarioBtnBool">
                <div class="col-12">
                    <q-input dense v-model="preventa.propietario" outlined label="Propietario" />
                </div>
                <div class="col-12">
                    <q-input dense v-model="preventa.telefono_propietario" outlined label="Telefono Propietario" type="number" />
                </div>
                </template>
                <template v-if="!encargadoBtnBool">
                <div class="col-12">
                    <q-input dense v-model="preventa.contratista" outlined label="Contratista" />
                </div>
                <div class="col-12">
                    <q-input dense v-model="preventa.telefono_contratista" outlined label="Telefono Contratista" type="number" />
                </div>
                </template>
                <div class="col-12">
                    <q-input dense v-model="preventa.ubicacion" outlined label="Ubicacion" >
                        <template v-slot:append>
                            <q-btn flat icon="fa-solid fa-map-marker-alt" @click="myLocation" />
                        </template>
                    </q-input>
                </div>
                <div class="col-12">
                    <div style="height:250px; width:100%">
                        <l-map ref="map" v-model:zoom="zoom" :center="location">
                        <l-tile-layer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            layer-type="base"
                            name="OpenStreetMap"
                        ></l-tile-layer>
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
                    <q-input dense v-model="preventa.zona" outlined label="Zona" />
                </div>
                <div class="col-12">
                    <q-input dense v-model="preventa.observacion" outlined label="Observacion" />
                </div>
                <div class="col-12">
                    <q-input dense v-model="preventa.tipo_construccion" outlined label="Tipo Construccion" />
                </div>
                <div class="col-12">
                    <q-input dense v-model="preventa.volumen" outlined label="Volumen" />
                </div>
                <div class="col-12">
                    <q-input dense v-model="preventa.marca" outlined label="Marca" />
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
import moment from 'moment'
import { Loading } from 'quasar';
import { Icon } from 'leaflet';
import "leaflet/dist/leaflet.css";
import { LMap, LTileLayer, LMarker } from "@vue-leaflet/vue-leaflet";
export default {
    name: 'Preventa',
    components: {
        LMap,
        LTileLayer,
        LMarker
    },
    data () {
        return {
            location: [-17.969753, -67.114749],
            zoom: 15,
            propietarioBtnBool: true,
            encargadoBtnBool: true,
            preventas: [],
            preventa: {},
            dialog: false,
            loading: false
        }
    },
    mounted () {
        this.getPreventas()
    },
    methods: {
    //     const onMarkerMoveEnd = (event) => {
    //   const marker = event.target;
    //   const newLatLng = marker.getLatLng();
    //   location.value = [newLatLng.lat, newLatLng.lng];
    // };
        onMarkerMoveEnd (event) {
            const marker = event.target;
            const newLatLng = marker.getLatLng();
            this.location = [newLatLng.lat, newLatLng.lng];
            //lat uy lng maximo 7 decimales
            this.preventa.ubicacion = `${newLatLng.lat.toFixed(7)}, ${newLatLng.lng.toFixed(7)}`
        },
        myLocation () {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((position) => {
                    this.location = [position.coords.latitude, position.coords.longitude]
                    this.preventa.ubicacion = `${position.coords.latitude}, ${position.coords.longitude}`
                })
            }
        },
        submit () {
            this.loading = true
            this.$axios.post('preventas', this.preventa)
            .then(response => {
                this.preventas.push(response.data)
                this.dialog = false
            })
            .catch(error => {
                console.log(error)
            }).finally(() => {
                this.loading = false
            })
        },
        dialogClick () {
            this.dialog = true
            this.preventa = {
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
            }
        },
        getPreventas () {
            this.$axios.get('preventas')
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
  