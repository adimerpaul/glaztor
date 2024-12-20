<template>
  <q-page class="bg-grey-2 q-pa-lg">
    <q-card>
      <q-card-section class="q-pa-sm">
        <table class="styled-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>C.I.</th>
              <th>Teléfono</th>
              <th>Cargo</th>
              <th>Correo</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(ejecutivo, index) in ejecutivos" :key="index" :class="{'odd-row': index % 2 === 0}">
              <td>{{ ejecutivo.nombre_eje }}</td>
              <td>{{ ejecutivo.ci }}</td>
              <td>{{ ejecutivo.telefono_1 }}</td>
              <td>{{ ejecutivo.cargo }}</td>
              <td>{{ ejecutivo.correo }}</td>
              <td>{{ ejecutivo.estado }}</td>
              <td>
                <q-btn
                  flat
                  dense
                  icon="edit"
                  color="blue"
                  @click="modificar(ejecutivo)"
                  label="Editar"
                />
                <q-btn
                  flat
                  dense
                  icon="delete"
                  color="negative"
                  @click="eliminar(ejecutivo.id)"
                  label="Eliminar"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </q-card-section>
    </q-card>
  </q-page>

  <q-page-sticky position="bottom-right" :offset="[18, 18]">
    <q-btn fab icon="add" color="primary" @click="dialogClick" />
  </q-page-sticky>

  <!-- Diálogo mejorado -->
  <q-dialog v-model="dialog" :position="esMovil ? undefined : 'right'" :maximized="true" transition-show="slide-left" transition-hide="slide-right">
    <q-card>
      <q-card-section class="q-px-md bg-primary text-white">
        <q-btn flat round dense icon="fa-solid fa-arrow-left" v-close-popup />
        <q-space />
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
              />
            </div>
            <div class="col-12">
              <q-input
                dense
                v-model="ejecutivo.ci"
                outlined
                label="C.I."
                :rules="[val => !!val || 'Este campo es requerido']"
              />
            </div>
            <div class="col-12">
              <q-input
                dense
                v-model="ejecutivo.telefono_1"
                outlined
                label="Teléfono Ejecutivo"
                type="number"
                :rules="[val => !!val || 'Este campo es requerido']"
              />
            </div>
            <div class="col-12">
              <q-select
                dense
                v-model="ejecutivo.cargo_id"
                :options="cargos"
                outlined
                label="Cargo"
                :rules="[val => !!val || 'Este campo es requerido']"
                option-label="nombre_cargo"
                option-value="id"
              />
            </div>
            <div class="col-12">
              <q-input
                dense
                v-model="ejecutivo.correo"
                outlined
                label="Correo"
                :rules="[val => !!val || 'Este campo es requerido']"
              />
            </div>
            <div class="col-12">
              <q-select
                dense
                v-model="ejecutivo.estado"
                :options="['Activo', 'Inactivo']"
                outlined
                :rules="[val => !!val || 'Este campo es requerido']"
                label="Estado"
              />
            </div>

            <!-- Botones mejorados -->
            <q-card-actions align="right">
              <q-btn label="Cancelar" color="negative" @click="dialog = false" :loading="loading" class="q-mr-sm" />
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
import {Loading} from 'quasar';
import {Icon} from 'leaflet';
import "leaflet/dist/leaflet.css";
import {LMap, LTileLayer, LMarker} from "@vue-leaflet/vue-leaflet";

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
        ci: '',
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
