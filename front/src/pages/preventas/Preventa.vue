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
                <q-input v-model="preventa.fecha" outlined label="Fecha" type="date" />
                <q-input v-model="preventa.propietario" outlined label="Propietario" />
                <q-input v-model="preventa.contratista" outlined label="Contratista" />
                <q-input v-model="preventa.telefono_propietario" outlined label="Telefono Propietario" type="number" />
                <q-input v-model="preventa.telefono_contratista" outlined label="Telefono Contratista" type="number" />
                <q-input v-model="preventa.ubicacion" outlined label="Ubicacion" />
                <q-input v-model="preventa.zona" outlined label="Zona" />
                <q-input v-model="preventa.observacion" outlined label="Observacion" />
                <q-input v-model="preventa.tipo_construccion" outlined label="Tipo Construccion" />
                <q-input v-model="preventa.volumen" outlined label="Volumen" />
                <q-input v-model="preventa.marca" outlined label="Marca" />
                <q-card-actions align="right">
                    <q-btn label="Cancelar" color="negative" @click="dialog = false" :loading="loading" />
                    <q-btn label="Guardar" color="primary" type="submit" :loading="loading" />
                </q-card-actions>
            </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>

</template>

<script>
import moment from 'moment'
import { Loading } from 'quasar';

export default {
    name: 'Preventa',
    data () {
        return {
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
                ubicacion: '',
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
  