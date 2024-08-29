<template>
    <q-page class="bg-grey-3 q-pa-xs">
        <q-card>
            <q-card-section class="q-pa-xs">
                <q-list dense separator>
                    <q-item v-for="cliente in clientes" :key="cliente.id"
                    @click="showCliente(cliente)" clickable>
                        <q-item-section>
                            <q-item-label>
                                <div class="text-h6">{{ cliente.nombre_cliente }}</div>
                                <div class="text-subtitle1">{{ cliente.direccion }}</div>
                            </q-item-label>
                        </q-item-section>
                    </q-item>
                </q-list>
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
                                'ESTE',
                                'SUD',
                                'OESTE',
                                'CENTRO',
                            ]"
                            outlined
                            :rules="[val => !!val || 'Este campo es requerido']"
                            label="Zona"/>
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
                <div class="col-6">
                    <label class="text-grey text-caption">Tipo Cliente:</label>
                    <div class="text-bold">{{ cliente.tipo_cliente }}</div>
                </div>
                <div class="col-6">
                    <label class="text-grey text-caption">Cliente:</label>
                    <div class="text-bold">{{ cliente.nombre_cliente }}</div>
                </div>
                <div class="col-6">
                    <label class="text-grey text-caption">Teléfono Cliente:</label>
                    <div class="text-bold">{{ cliente.telefono_1 }}</div>
                </div>
                <div class="col-6">
                    <label class="text-grey text-caption">Teléfono 2:</label>
                    <div class="text-bold">{{ cliente.telefono_2 }}</div>
                </div>
                <div class="col-12">
                    <label class="text-grey text-caption">Dirección:</label>
                    <div class="text-bold">{{ cliente.direccion }}</div>
                </div>
                <div class="col-12">
                    <label class="text-grey text-caption">Complemento:</label>
                    <div class="text-bold">{{ cliente.complemento }}</div>
                </div>
                <div class="col-12">
                    <label class="text-grey text-caption">Ubicación:</label>
                    <div class="text-bold">{{ cliente.ubicacion }}</div>
                </div>
                <div class="col-12">
                    <div style="height:250px; width:100%">
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
                <div class="col-6">
                    <label class="text-grey text-caption">Zona:</label>
                    <div class="text-bold">{{ cliente.zona }}</div>
                </div>
                <div class="col-6">
                    <label class="text-grey text-caption">Region:</label>
                    <div class="text-bold">{{ cliente.region }}</div>
                </div>
                  <div class="col-12">
                    <label class="text-grey text-caption">Cumpleaños:</label>
                    <div class="text-bold">{{ cliente.cumple }}</div>
                </div>
                <div class="col-6">
                    <label class="text-grey text-caption">Estado:</label>
                    <div class="text-bold">{{ cliente.estado }}</div>
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
  