<template>
  <q-page class="bg-grey-2">
    <q-card flat bordered>
      <q-card-section>
        <q-table
          flat
          bordered
          dense
          :rows="sueldos"
          row-key="id"
          :columns="columns"
          class="styled-table"
          hide-bottom
        >
          <template v-slot:top-right>
            <q-btn icon="add" label="Nuevo Sueldo" color="primary" @click="openDialog"/>
          </template>
          <template v-slot:body-cell-acciones="props">
            <q-btn-dropdown flat dense color="primary" no-caps label="Opciones">
              <q-item clickable v-ripple @click="editSueldo(props.row)" v-close-popup>
                <q-item-section>
                  <q-icon name="edit"/>
                  Editar
                </q-item-section>
              </q-item>
              <q-item clickable v-ripple @click="deleteSueldo(props.row)" v-close-popup>
                <q-item-section>
                  <q-icon name="delete"/>
                  Eliminar
                </q-item-section>
              </q-item>
            </q-btn-dropdown>
          </template>
        </q-table>
      </q-card-section>
    </q-card>

    <!-- Dialog para formulario -->
    <q-dialog v-model="dialog" transition-show="slide-up" transition-hide="slide-down">
      <q-card style="width: 500px; max-width: 100vw;">
        <q-card-section class="row items-center bg-primary text-white">
          <q-btn flat round dense icon="arrow_back" v-close-popup/>
          <q-space/>
          <div class="text-h6">{{ sueldo.id ? 'Editar Sueldo' : 'Nuevo Sueldo' }}</div>
        </q-card-section>
        <q-card-section>
          <q-form @submit.prevent="saveSueldo">
            <!-- Formulario -->
            <div class="col-12">
              <q-input
                dense
                v-model="sueldo.sueldo_correspondiente"
                type="date"
                outlined
                label="sueldo Correspondiente"
              />
            </div>
            <div class="row q-col-gutter-md">
              <div class="col-12">
                <q-select
                  dense
                  v-model="sueldo.tipo"
                  :options="['PERMANENTE', 'TEMPORAL']"
                  outlined
                  label="Tipo"
                />
              </div>
              <div class="col-12">
                <q-select
                  v-model="sueldo.ejecutivo_id"
                  @filter="filterEjecutivos"
                  @update:modelValue="changeDirecionTelefono"
                  :rules="[val => !!val || 'Seleccione un cliente']"
                  filled
                  emit-value
                  map-options
                  standout
                  use-input
                  label="Nombre"
                  :options="ejecutivos"
                  option-value="id"
                  option-label="nombre_eje"
                  dense
                  clearable
                />
                <!--                  <pre>{{ejecutivos}}</pre>-->


              </div>
              <div class="col-6">
                <q-input dense v-model="sueldo.ci" outlined label="C.I."/>
              </div>
              <div class="col-6">
                <q-input dense v-model="sueldo.cargo" outlined label="Cargo"/>
              </div>
              <div class="col-12">
                <q-input
                  dense
                  v-model="sueldo.fecha_ingreso"
                  type="date"
                  outlined
                  label="Fecha de Ingreso"
                />
              </div>
              <div class="col-6">
                <q-input
                  dense
                  v-model="sueldo.haber_basico"
                  outlined
                  type="number"
                  label="Haber Básico"
                />
              </div>
              <div class="col-6">
                <q-input
                  dense
                  v-model="sueldo.bono_antiguedad"
                  outlined
                  type="number"
                  label="bono antiguedad"
                />
              </div>
              <div class="col-12">
                <q-input
                  dense
                  v-model="sueldo.monto_acumulado"
                  outlined
                  type="number"
                  label="total Ganado"
                  readonly
                />
              </div>

              <div class="col-6">
                <q-input
                  dense
                  v-model="sueldo.descuento_afp"
                  outlined
                  type="number"
                  label="Descuento AFP (0.5%)"
                  readonly
                />
              </div>
              <div class="col-6">
                <q-input
                  dense
                  v-model="sueldo.descuento_seguro"
                  outlined
                  type="number"
                  label="Descuento Seguro"

                />
              </div>
              <div class="col-6">
                <q-input
                  dense
                  v-model="sueldo.descuento_solidario"
                  outlined
                  type="number"
                  label="Descuento Solidario"

                />
              </div>
              <div class="col-6">
                <q-input
                  dense
                  v-model="sueldo.descuento_otros"
                  outlined
                  type="number"
                  label="Descuento Otros"

                />
              </div>
              <div class="col-12">
                <q-input
                  dense
                  v-model="sueldo.total_descuentos_lab"
                  outlined
                  type="number"
                  label="Total Descuento"

                />
              </div>
              <div class="col-12">
                <q-input
                  dense
                  v-model="sueldo.total_liquido"
                  outlined
                  type="number"
                  label="total liquido"
                  readonly
                />
              </div>
              <div class="col-6">
                <q-input
                  dense
                  v-model="sueldo.descuento_rc_iva"
                  outlined
                  type="number"
                  label="Descuento rc_iva"
                />
              </div>
              <div class="col-6">
                <q-input
                  dense
                  v-model="sueldo.descuento_anticipo"
                  outlined
                  type="number"
                  label="Descuento anticipo	"

                />
              </div>
              <div class="col-12">
                <q-input
                  dense
                  v-model="sueldo.total_descuentos"
                  outlined
                  type="number"
                  label="Total Descuento	"

                />
              </div>
              <div class="col-12">
                <q-input
                  dense
                  v-model="sueldo.liquido_pagable"
                  outlined
                  type="number"
                  label="Líquido Pagable"

                />
              </div>


                          </div>
            <q-card-actions align="right">
              <q-btn label="Cancelar" flat color="negative" @click="dialog = false" :loading="loading"/>
              <q-btn label="Guardar" flat color="primary" type="submit" :loading="loading"/>
            </q-card-actions>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import moment from 'moment'
import {Loading} from 'quasar';

export default {
  name: 'sueldos',
  data() {
    return {
      sueldos: [],
      sueldo: {},
      ejecutivos: [],
      ejecutivosAll: [],
      dialog: false,
      loading: false,
    };
  },
  mounted() {
    this.getSueldos();
    this.getEjecutivos();
  },
  computed: {
    montoAcumulado() {
      return (
        parseFloat(this.sueldo.haber_basico || 0) +
        parseFloat(this.sueldo.bono_antiguedad || 0)
      );
    },
    descuentoAFP() {
      return (this.montoAcumulado * 0.005).toFixed(2);
    },
    descuentoSeguro() {
      return (this.montoAcumulado * 0.1).toFixed(2);
    },
    descuentoSolidario() {
      return (this.montoAcumulado * 0.0171).toFixed(2);
    },
    descuentoOtros() {
      return (this.montoAcumulado * 0.005).toFixed(2);
    },
    totalDescuentosLab() {
      return (
        parseFloat(this.descuentoAFP) +
        parseFloat(this.descuentoSeguro) +
        parseFloat(this.descuentoSolidario) +
        parseFloat(this.descuentoOtros)
      ).toFixed(2);
    },
    liquido() {
      return (
        parseFloat(this.montoAcumulado || 0) - parseFloat(this.totalDescuentosLab || 0)
      ).toFixed(2);  // Asegúrate de redondear el valor para mostrarlo correctamente
    },
    liquidoPagable() {
      return (
        parseFloat(this.sueldo.total_liquido || 0) -
        parseFloat(this.sueldo.total_descuentos || 0)
      );
    },
  },
  watch: {
    montoAcumulado(newValue) {
      this.sueldo.monto_acumulado = newValue;
    },
    descuentoAFP(newValue) {
      this.sueldo.descuento_afp = newValue;
    },
    descuentoSeguro(newValue) {
      this.sueldo.descuento_seguro = newValue;
    },
    descuentoSolidario(newValue) {
      this.sueldo.descuento_solidario = newValue;
    },
    descuentoOtros(newValue) {
      this.sueldo.descuento_otros = newValue;
    },
    totalDescuentosLab(newValue) {
      this.sueldo.total_descuentos_lab = newValue;
    },
    liquido(newValue) {
      this.sueldo.total_liquido = newValue;
    },
    liquidoPagable(newValue) {
      this.sueldo.liquido_pagable = newValue;
    },
  },
  methods: {
    changeDirecionTelefono(value) {
      const ejecutivoFind = this.ejecutivos.find((item) => item.id === value);
      this.sueldo.ci = ejecutivoFind.ci;
      this.sueldo.cargo = ejecutivoFind.cargo;
    },
    openDialog() {
      this.dialog = true;
      this.sueldo = {
        sueldo_correspondiente: moment().format('YYYY-MM-DD'),
        tipo: '',
        nombre_completo: '',
        ci: '',
        cargo: '',
        fecha_ingreso: moment().format('YYYY-MM-DD'),
        haber_basico: 0,
        bono_antiguedad: 0,
        monto_acumulado: 0,
        descuento_afp: 0,
        descuento_seguro: 0,
        total_descuentos: 0,
        descuento_rc_iva: 0,
        descuento_anticipo: 0,
        liquido_pagable: 0,
      };
    },
    filterEjecutivos(val, update) {
      if (val === '') {
        update(() => {
          this.ejecutivos = this.ejecutivosAll
        })
        return
      }
      const needle = val.toLowerCase()
      update(() => {
        this.ejecutivos = this.ejecutivosAll.filter(v => v.nombre_eje.toLowerCase().indexOf(needle) > -1)
      })
    },
    getEjecutivos() {
      this.$axios.get('ejecutivos').then(response => {
        this.ejecutivos = response.data
        this.ejecutivosAll = response.data
      }).catch(error => {
        console.log(error)
      })
    },
    editSueldo(sueldo) {
      this.sueldo = {...sueldo};
      this.dialog = true;
    },
    saveSueldo() {
      if (this.sueldo.id) {
        this.updateSueldo();
      } else {
        this.addSueldo();
      }
    },
    addSueldo() {
      this.loading = true;
      this.$axios.post('sueldos', this.sueldo).then((response) => {
        this.sueldos.push(response.data);
        this.dialog = false;
      }).catch((error) => {
        this.$alert.error(error.response.data.message);
      }).finally(() => {
        this.loading = false;
      });
    },
    updateSueldo() {
      this.$axios.put(`sueldos/${this.sueldo.id}`, this.sueldo).then((response) => {
        const index = this.sueldos.findIndex((item) => item.id === this.sueldo.id);
        this.sueldos[index] = response.data;
        this.dialog = false;
      });
    },
    deleteSueldo(sueldo) {
      this.$axios.delete(`sueldos/${sueldo.id}`).then(() => {
        this.sueldos = this.sueldos.filter((item) => item.id !== sueldo.id);
      });
    },
    getSueldos() {
      this.$axios.get('sueldos').then((response) => {
        this.sueldos = response.data;
      });
    },
  },
};

</script>


<style scoped>
.styled-table {
  border-collapse: collapse;
  width: 100%;
  border: 1px solid #ddd;
}

.styled-table th,
.styled-table td {
  padding: 8px 12px;
  text-align: left;
}

.styled-table th {
  background-color: #f4f4f9;
  color: #333;
}

.styled-table tbody tr:nth-child(odd) {
  background-color: #f9f9f9;
}
</style>
