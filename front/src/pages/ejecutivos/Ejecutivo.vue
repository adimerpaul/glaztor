<template>
  <q-page class="bg-grey-2 q-pa-lg">
    <q-card>
      <q-card-section class="q-pa-sm">
        <q-btn
                  icon="download"
                  color="green"
                  label="Exportar"
                  @click="exportExcel"
                  no-caps
              ></q-btn>
        
        <q-markup-table dense wrap-cells>
          <thead>
          <tr>
            <th>Nombre</th>
            <th>CI</th>
            <th>Telefono</th>
            <th>Telefono 2</th>
            <th>Cargo</th>
            <th>seudónimo</th>
            <th>Correo</th>
            <th>Direccion</th>
            <th>Foto</th>
            <th>Ubicacion</th>
            <th>Zona</th>
            <th>Cumpleaños</th>
            <th>Estado</th>
            <th>Acciones</th>


          </tr>
          </thead>
          <tbody>
          <tr v-for="(ejecutivo,index) in ejecutivos" :key="index">
            <td>{{ ejecutivo.nombre_eje }}</td>
            <td>{{ ejecutivo.ci }}</td>
            <td>{{ ejecutivo.telefono_1 }}</td>
            <td>{{ ejecutivo.telefono_2 }}</td>
            <td>{{ ejecutivo.cargo }}</td>
            <td>{{ ejecutivo.apodo }}</td>
            <td>{{ ejecutivo.correo }}</td>
            <td>{{ ejecutivo.direccion }}</td>
            <td>
              <a v-if="ejecutivo.foto" :href="$url+'..'+ejecutivo.foto" target="_blank">
                <q-img :src="$url+'..'+ejecutivo.foto" alt="Imagen del ejecutivo" class="img-thumbnail" height="10"/>
              </a>


            </td>
            <td>
              <q-btn color="red" flat dense @click="showLocation(ejecutivo)" icon="fa-solid fa-map-marker-alt"/>
            </td>

            <td>{{ ejecutivo.zona }}</td>
            <td>{{ ejecutivo.cumple }}</td>
            <td>{{ ejecutivo.estado }}</td>
            <td>
              <q-btn
                flat
                dense
                icon="edit"
                color="blue"
                label="Editar"
                @click="modificar(ejecutivo)"
              />
              <q-btn
                flat
                dense
                icon="delete"
                color="negative"
                label="Eliminar"
                @click="eliminar(ejecutivo.id)"
              />
            </td>
          </tr>
          </tbody>
        </q-markup-table>
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
        <div class="text-h6">{{ ejecutivo.id ? 'Editar' : 'Nuevo' }} Ejecutivo</div>
      </q-card-section>
      <q-card-section>
        <q-form @submit.prevent="confirmarGuardar">
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
                v-model="ejecutivo.ci"
                outlined
                label="ci"
                :rules="[val => !!val || 'Este campo es requerido']"
                @input="ejecutivo.ci = ejecutivo.ci.toUpperCase()"
                style="text-transform: uppercase;"
              />
            </div>
            <div class="col-12">
              <q-input dense v-model="ejecutivo.telefono_1" outlined label="Telefono ejecutivo" type="number"/>
            </div>
            <div class="col-12">
              <q-input dense v-model="ejecutivo.telefono_2" outlined label="Telefono ejecutivo 2" type="number"/>
            </div>
            <div class="col-12">
              <q-select
                dense
                v-model="ejecutivo.cargo"
                filled
                standout
                :options="cargos"
                outlined
                label="Cargo"
                option-label="nombre_cargo"
                option-value="nombre_cargo"
                emit-value
                map-options
              />
              <!--                        <pre>{{ejecutivo}}</pre>-->
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
                @input="ejecutivo.direccion = ejecutivo.direccion.toUpperCase()"
                style="text-transform: uppercase;"
              />
            </div>
            <div class="col-12">
              <q-input dense v-model="ejecutivo.ubicacion" outlined label="Ubicacion">
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
                v-model="ejecutivo.zona"
                :options="zonas"
                option-label="nombre_zona"
                option-value="nombre_zona"
                outlined
                :rules="[val => !!val || 'Este campo es requerido']"
                emit-value
                map-options
                label="Seleccionar Zona"
              />
            </div>

            <div class="d-grid col-6 mx-auto mb-3">
              <img v-if="ejecutivo.foto"
                   :src="ejecutivo.foto.includes('data') ? ejecutivo.foto : $url + '..' + ejecutivo.foto"
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
              <q-input dense v-model="ejecutivo.cumple" outlined label="Cumpleaños" type="date"/>
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
  name: 'ejecutivos',
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
      ejecutivos: [],
      zonas: [],
      zona: {},
      cargos: [], // Para almacenar los cargos
      ejecutivo: {},
      dialog: false,
      loading: false,
      nuevoEjecutivo: {

        zona_id: null, // ID de la zona seleccionada
      },

    }
  },
  mounted() {
    this.getEjecutivo();
    this.getZonas();
    this.getCargos(); // Llamar al método para obtener los cargos
  },
  methods: {

    exportExcel() {
        let data = [{
          sheet: "Ejecutivos",
          columns: [
            {label: "Nombre", value: "nombre_eje"},
            {label: "ci", value: "ci"},
            {label: "Telefono 1", value: "telefono_1"},
            {label: "Telefono 2 ", value: "telefono_2"},
            {label: "Cargo", value: "cargo"},
            {label: "Seudonimo", value: "apodo"},
            {label: "Correo", value: "correo"},
           //solo sale en text direccion  {label: "Foto Producto", value: "foto_pro"},
            {label: "Direccion", value: "direccion"},
            {label: "Zona", value: "zona"},
            {label: "Cumpleaños", value: "cumple"},
            {label: "Estado", value: "estado"},


          ],
          content: this.ejecutivos
        }]

        const excel = Excel.export(data, "Reporte de Personal");

      },

    showLocation(ejecutivo) {
      // console.log(ejecutivo);
      const lat = ejecutivo.ubicacion.split(',')[0];
      const lng = ejecutivo.ubicacion.split(',')[1];
      const url = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
      window.open(url, '_blank');

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
    getCargos() {
      this.$axios.get('cargos')
        .then(response => {
          this.cargos = response.data; // Asignar los cargos a la variable
        })
        .catch(error => {
          console.error("Error al obtener los cargos:", error);
        });
    },
    modificar(ejecutivo) {
      this.ejecutivo = {...ejecutivo}; // Clonamos el objeto ejecutivo
      this.dialog = true; // Abrimos el diálogo
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
    eliminar(id) {
      this.$q
        .dialog({
          title: "Eliminar Ejecutivo",
          message: "¿Estás seguro de eliminar este ejecutivo?",
          ok: {label: "Eliminar", color: "negative"},
          cancel: true,
        })
        .onOk(() => {
          this.$axios.delete(`ejecutivos/${id}`).then(() => {
            // Filtramos la lista de ejecutivos para eliminar al que se ha eliminado
            this.ejecutivos = this.ejecutivos.filter((e) => e.id !== id);
            this.$q.notify({color: "positive", message: "Ejecutivo eliminado con éxito."});
          }).catch(error => {
            this.$q.notify({
              color: 'negative',
              message: 'Hubo un error al eliminar el ejecutivo. Intenta nuevamente.',
              icon: 'report_problem',
            });
          });
        });
    },
    dialogClick() {
      this.dialog = true;
      this.ejecutivo = { // Inicializar un nuevo ejecutivo
        nombre: '',
        foto: '',
        cargo_id: null, // Inicializa el ID del cargo
      };
    },
    getEjecutivo() {
      this.$axios.get('ejecutivos')
        .then(response => {
          this.ejecutivos = response.data;
          this.getZonas();
          this.getCargos(); // Llamada para obtener cargos
        })
        .catch(error => {
          console.log(error);
        });
    },

    showEjecutivo(ejecutivo) {
      this.ejecutivo = ejecutivo
      this.dialog = true
      const lngLat = ejecutivo.ubicacion.split(',').map(Number)
      console.log(lngLat)
      this.location = lngLat
    },
    onMarkerMoveEnd(event) {
      const marker = event.target;
      const newLatLng = marker.getLatLng();
      this.location = [newLatLng.lat, newLatLng.lng];
      this.ejecutivo.ubicacion = `${newLatLng.lat.toFixed(7)}, ${newLatLng.lng.toFixed(7)}`
    },
    myLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          this.location = [position.coords.latitude, position.coords.longitude]
          this.ejecutivo.ubicacion = `${position.coords.latitude}, ${position.coords.longitude}`
        })
      }
    },
    submit() {
      this.loading = true;
      const url = this.ejecutivo.id ? `ejecutivos/${this.ejecutivo.id}` : 'ejecutivos'; // Usamos una URL dinámica dependiendo de si es una edición o una creación.
      const method = this.ejecutivo.id ? 'put' : 'post'; // Si tiene id, es edición, si no, es nueva creación

      this.$axios({
        method: method,
        url: url,
        data: this.ejecutivo,
      })
        .then(response => {
          this.$q.notify({
            color: 'positive',
            message: this.ejecutivo.id ? 'Ejecutivo actualizado correctamente' : 'Ejecutivo creado correctamente',
            icon: 'check_circle',
          });
          this.dialog = false;
          this.getEjecutivo(); // Para actualizar la lista de ejecutivos
        })
        .catch(error => {
          this.$q.notify({
            color: 'negative',
            message: 'Hubo un error al guardar los datos. Intenta nuevamente.',
            icon: 'report_problem',
          });
        })
        .finally(() => {
          this.loading = false;
        });
    }
    ,
    dialogClick() {
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
        estado: 'Activo',
      }
    },

    previsualizarFoto(event) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = () => {
        this.foto = reader.result;
        this.ejecutivo.foto = this.foto;
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
  border-radius: 8px;
}

.styled-table thead tr {
  background-color: #3f51b5;
  color: #ffffff;
}

.styled-table th, .styled-table td {
  padding: 12px 15px;
}

.styled-table tbody tr {
  border-bottom: 1px solid #ddd;
}

.styled-table tbody tr:nth-of-type(even) {
  background-color: #f9f9f9;
}

.styled-table tbody tr:hover {
  background-color: #f1f1f1;
  cursor: pointer;
}

.img-thumbnail {
  max-width: 100px;
  border-radius: 8px;
  border: 1px solid #ddd;
}

.input-group-text {
  background-color: #fff;
}

.input-group .form-control {
  border-radius: 8px;
}
</style>
