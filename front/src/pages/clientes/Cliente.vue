<template>
    <q-page class="bg-grey-3 q-pa-xs">
        <q-card>
            <q-card-section class="q-pa-xs">
                <table border="1" style="width:100%; border-collapse:collapse;">
                        <thead>
                            <tr>
                                <th style="padding: 5px;">Tipo cliente</th>
                                <th style="padding: 5px;">Nombre</th>
                                <th style="padding: 5px;">Telefono</th>
                                <th style="padding: 5px;">Telefono 2</th>
                                <th style="padding: 5px;">Direccion</th>
                                <th style="padding: 5px;">Complemento</th>
                                <th style="width:10%;padding: 5px;">Ubicacion</th>
                                <th style="padding: 5px;">Zona</th>
                                <th style="padding: 5px;">Ejecutivo</th>
                                <th style="padding: 5px;">Region</th>
                                <th style="padding: 5px;">Cumpleaños</th>
                                <th style="padding: 5px;">Estado</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(cliente,index) in clientes" :key="index">
                                <td style="padding: 5px; line-height: 1.2;">{{cliente.tipo_cliente}}</td>
                                <td style="padding: 5px; line-height: 1.2;">{{cliente.nombre_cliente}}</td>
                                <td style="padding: 5px; line-height: 1.2;">{{cliente.telefono_1}}</td>
                                <td style="padding: 5px; line-height: 1.2;">{{cliente.telefono_2}}</td>
                                <td style="padding: 5px; line-height: 1.2;">{{cliente.direccion}}</td>
                                <td style="padding: 5px; line-height: 1.2;">{{cliente.complemento}}</td>
                                <td style="padding: 2px; line-height: 1.2;">{{cliente.ubicacion}} ver ubicacion </td>
                                <td style="padding: 5px; line-height: 1.2;">{{cliente.zona}}</td>
                                <td style="padding: 5px; line-height: 1.2;">{{cliente.ejecutivo}}</td>
                                <td style="padding: 5px; line-height: 1.2;">{{cliente.region}}</td>
                                <td style="padding: 5px; line-height: 1.2;">{{cliente.cumple}}</td>
                                <td style="padding: 5px; line-height: 1.2;">{{cliente.estado}}</td>
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
                        <q-input dense v-model="cliente.telefono_1" outlined label="Telefono cliente" type="number" :rules="[val => !!val || 'Este campo es requerido']" />
                        </div>
                        <div class="col-12">
                        <q-input dense v-model="cliente.telefono_2" outlined label="Telefono cliente 2" type="number" />
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
                        <q-input dense v-model="cliente.ubicacion" outlined label="Ubicacion" >
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
                                v-model="cliente.zona"
                                :options="[
                                    'NORTE',
                                    'SUD',
                                    'ESTE',
                                    'OESTE',
                                    'CENTRO',
                                    'SUDESTE',
                                    'NORESTE',
                                    'SUDOESTE',
                                    'NOROESTE',
                                ]"
                                outlined
                                :rules="[val => !!val || 'Este campo es requerido']"
                                label="Zona"/>
                    </div>
                    <div class="col-12">
                        <q-select
                            dense
                            v-model="cliente.ejecutivo"
                            :options="[
                                'ZTORREZ',
                                'JLAREDO',
                                'MMIRANDA',
                                'ATERAN',
                                'MLAREDO',
                                'VTORREZ',
                               
                            ]"
                            outlined
                            :rules="[val => !!val || 'Este campo es requerido']"
                            label="Ejecutivo"/>
                    </div>
                    <div class="col-12">
                        <q-select
                            dense
                            v-model="cliente.region"
                            :options="[
                                'ORURO',
                                'CHALLAPATA',
                                'COLQUIRI',
                                'POOPO',
                                'HUARI',
                                'SICA SICA',
                                'EUCALIPTUS',
                            ]"
                            outlined
                            :rules="[val => !!val || 'Este campo es requerido']"
                            label="Region"/>
                    </div>
                    <div class="col-12">
                        <q-input dense v-model="cliente.cumple" outlined label="Cumpleaños" type="date" />
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
    name: 'clientes',
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
            clientes: [],
            cliente: {},
            dialog: false,
            loading: false
        }
    },
    mounted () {
        this.getClientes()
    },
    methods: {
        showCliente(cliente) {
            this.cliente = cliente
            this.dialog = true
            const lngLat = cliente.ubicacion.split(',').map(Number)
            console.log(lngLat)
            this.location = lngLat
        },
        onMarkerMoveEnd (event) {
            const marker = event.target;
            const newLatLng = marker.getLatLng();
            this.location = [newLatLng.lat, newLatLng.lng];
            this.cliente.ubicacion = `${newLatLng.lat.toFixed(7)}, ${newLatLng.lng.toFixed(7)}`
        },
        myLocation () {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((position) => {
                    this.location = [position.coords.latitude, position.coords.longitude]
                    this.cliente.ubicacion = `${position.coords.latitude}, ${position.coords.longitude}`
                })
            }
        },
        submit () {
            this.loading = true
            this.$axios.post('clientes', this.cliente)
            .then(response => {
                this.clientes.push(response.data)
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
                estado: ''
            }
        },
        getClientes () {
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
  