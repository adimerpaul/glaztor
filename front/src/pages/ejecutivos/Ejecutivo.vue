<template>
    <q-page class="bg-grey-3 q-pa-xs">
        <q-card>
            <q-card-section class="q-pa-xs">
                <table border="1" style="width:100%; border-collapse:collapse;">
                        <thead>
                            <tr>
                                <th style="padding: 5px;">Nombre</th>
                                <th style="padding: 5px;">Apellido</th>
                                <th style="padding: 5px;">Telefono</th>
                                <th style="padding: 5px;">Telefono 2</th>
                                <th style="padding: 5px;">Cargo</th>
                                <th style="padding: 5px;">seudónimo</th>
                                <th style="padding: 5px;">Correo</th>
                                <th style="padding: 5px;">Direccion</th>
                                <th style="width:10%;padding: 5px;">Ubicacion</th>
                                <th style="padding: 5px;">Zona</th>
                                <th style="padding: 5px;">Cumpleaños</th>
                                <th style="padding: 5px;">Estado</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(ejecutivo,index) in ejecutivos" :key="index">
                                <td style="padding: 5px; line-height: 1.2;">{{ejecutivo.nombre_eje}}</td>
                                <td style="padding: 5px; line-height: 1.2;">{{ejecutivo.apellido_eje}}</td>
                                <td style="padding: 5px; line-height: 1.2;">{{ejecutivo.telefono_1}}</td>
                                <td style="padding: 5px; line-height: 1.2;">{{ejecutivo.telefono_2}}</td>
                                <td style="padding: 5px; line-height: 1.2;">{{ejecutivo.cargo}}</td>
                                <td style="padding: 5px; line-height: 1.2;">{{ejecutivo.apodo}}</td>
                                <td style="padding: 5px; line-height: 1.2;">{{ejecutivo.correo}}</td>
                                <td style="padding: 5px; line-height: 1.2;">{{ejecutivo.direccion}}</td>
                                <td style="padding: 2px; line-height: 1.2;">{{ejecutivo.ubicacion}} ver ubicacion </td>
                                <td style="padding: 5px; line-height: 1.2;">{{ejecutivo.zona}}</td>
                                <td style="padding: 5px; line-height: 1.2;">{{ejecutivo.cumple}}</td>
                                <td style="padding: 5px; line-height: 1.2;">{{ejecutivo.estado}}</td>
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
            transition-hide="slide-right"
    >
    <q-card style="width: 450px; max-width: 100vw;">
        <q-card-section class="row items-center q-px-md bg-primary text-white q-px-none">
        <q-btn flat round dense icon="fa-solid fa-arrow-left" v-close-popup />
        <q-space/>
        <div class="text-h6">{{ ejecutivo.id ? 'Editar' : 'Nuevo' }} Ejecutivo</div>
        </q-card-section>
        <q-card-section>
            <q-form @submit="submit" v-if="!ejecutivo.id">
                <div class="row">
                    <div class="col-12">
                        <q-input
                            dense
                            v-model="ejecutivo.nombre_eje"
                            outlined
                            label="Nombre"
                            :rules="[val => !!val || 'Este campo es requerido']"
                            @input="ejecutivo.nombre_eje = ejecutivo.nombre_eje.toUpperCase()"
                            style="text-transform: uppercase;"
                        />
                         </div>
                        <div class="col-12">
                        <q-input
                            dense
                            v-model="ejecutivo.apellido_eje"
                            outlined
                            label="Apellido"
                            :rules="[val => !!val || 'Este campo es requerido']"
                            @input="ejecutivo.apellido_eje = ejecutivo.apellido_eje.toUpperCase()"
                            style="text-transform: uppercase;"
                        />
                         </div>
                        <div class="col-12">
                        <q-input dense v-model="ejecutivo.telefono_1" outlined label="Telefono ejecutivo" type="number" :rules="[val => !!val || 'Este campo es requerido']" />
                        </div>
                        <div class="col-12">
                        <q-input dense v-model="ejecutivo.telefono_2" outlined label="Telefono ejecutivo 2" type="number" />
                        </div>
                        <div class="col-12">
                        <q-input
                            dense
                            v-model="ejecutivo.cargo"
                            outlined
                            label="Cargo"
                            :rules="[val => !!val || 'Este campo es requerido']"
                            @input="ejecutivo.cargo = ejecutivo.cargo.toUpperCase()"
                            style="text-transform: uppercase;"
                        />
                         </div>
                         <div class="col-12">
                        <q-input
                            dense
                            v-model="ejecutivo.apodo"
                            outlined
                            label="seudónimo"
                            :rules="[val => !!val || 'Este campo es requerido']"
                            @input="ejecutivo.apodo = ejecutivo.apodo.toUpperCase()"
                            style="text-transform: uppercase;"
                        />
                         </div>
                         <div class="col-12">
                        <q-input
                            dense
                            v-model="ejecutivo.correo"
                            outlined
                            label="Correo"
                            :rules="[val => !!val || 'Este campo es requerido']"
                            @input="ejecutivo.correo = ejecutivo.correo.toUpperCase()"
                            style="text-transform: uppercase;"
                        />
                         </div>
                        <div class="col-12">
                            <q-input
                                dense
                                v-model="ejecutivo.direccion"
                                outlined
                                label="Dirección"
                                :rules="[val => !!val || 'Este campo es requerido']"
                                @input="ejecutivo.direccion = ejecutivo.direccion.toUpperCase()"
                                style="text-transform: uppercase;"
                            />
                        </div>
                    <div class="col-12">
                        <q-input dense v-model="ejecutivo.ubicacion" outlined label="Ubicacion" >
                            <template v-slot:append>
                                <q-btn flat icon="fa-solid fa-map-marker-alt" @click="myLocation" />
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
                                v-model="ejecutivo.zona"
                                :options="[
                                    'NORTE',
                                    'SUD',
                                    'ESTE',
                                    'OESTE',
                                    'CENTRO',
                                ]"
                                outlined
                                :rules="[val => !!val || 'Este campo es requerido']"
                                label="Zona"/>
                    </div>
                    
                    
                    <div class="col-12">
                        <q-input dense v-model="ejecutivo.cumple" outlined label="Cumpleaños" type="date" />
                    </div>
                    <div class="col-12">
                        <!-- <q-input dense v-model="cliente.zona" outlined label="Zona" /> -->
                        <q-select
                            dense
                            v-model="ejecutivo.estado"
                            :options="[
                                'ACTIVO',
                                'INACTIVO',
                            ]"
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
</template>

<script>
import moment from 'moment'
import { Loading } from 'quasar';
import { Icon } from 'leaflet';
import "leaflet/dist/leaflet.css";
import { LMap, LTileLayer, LMarker } from "@vue-leaflet/vue-leaflet";

export default {
    name: 'ejecutivos',
    components: {
        LMap,
        LTileLayer,
        LMarker
    },
    data () {
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
            ejecutivos: [],
            ejecutivo: {},
            dialog: false,
            loading: false
        }
    },
    mounted () {
        this.getEjecutivo()
    },
    methods: {
        showEjecutivo(ejecutivo) {
            this.ejecutivo = ejecutivo
            this.dialog = true
            const lngLat = ejecutivo.ubicacion.split(',').map(Number)
            console.log(lngLat)
            this.location = lngLat
        },
        onMarkerMoveEnd (event) {
            const marker = event.target;
            const newLatLng = marker.getLatLng();
            this.location = [newLatLng.lat, newLatLng.lng];
            this.ejecutivo.ubicacion = `${newLatLng.lat.toFixed(7)}, ${newLatLng.lng.toFixed(7)}`
        },
        myLocation () {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((position) => {
                    this.location = [position.coords.latitude, position.coords.longitude]
                    this.ejecutivo.ubicacion = `${position.coords.latitude}, ${position.coords.longitude}`
                })
            }
        },
        submit () {
            this.loading = true
            this.$axios.post('ejecutivos', this.ejecutivo)
            .then(response => {
                this.ejecutivos.push(response.data)
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
            this.ejecutivo = {
                nombre_eje: '',
                apellido_eje: '',
                telefono_1: '',
                telefono_2: '',
                cargo: '',
                apodo: '',
                correo: '',
                direccion: '',
                ubicacion: '-17.969753, -67.114749',
                zona: '',
                cumple: moment().format('YYYY-MM-DD'),
                estado: ''
            }
        },
        getEjecutivo () {
            this.$axios.get('ejecutivos')
            .then(response => {
                this.ejecutivos = response.data
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
  