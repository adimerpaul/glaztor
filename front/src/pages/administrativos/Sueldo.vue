<template>
    <q-page class="q-pa-md">
      <q-table :rows="sueldos" :columns="columns" dense wrap-cells flat bordered :rows-per-page-options="[0]"
               title="Sueldos" :filter="filter">
        <template v-slot:top-right>
          <q-btn color="primary" label="Nuevo Sueldo" @click="sueldoNew" outline no-caps icon="add_circle_outline" :loading="loading" />
          <q-input v-model="filter" label="Buscar" dense outlined>
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </template>
  
        <template v-slot:body-cell-actions="props">
          <q-td :props="props">
            <q-btn-dropdown label="Opciones" no-caps size="10px" dense color="primary">
              <q-list>
                <q-item clickable @click="sueldoEdit(props.row)" v-close-popup>
                  <q-item-section avatar>
                    <q-icon name="edit" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>Editar</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item clickable @click="sueldoDelete(props.row.id)" v-close-popup>
                  <q-item-section avatar>
                    <q-icon name="delete" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>Eliminar</q-item-label>
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
  
      <q-dialog v-model="sueldoDialog" persistent>
        <q-card>
          <q-card-section class="q-pb-none row items-center">
            <div>{{ actionPeriodo }} Sueldo</div>
            <q-space />
            <q-btn icon="close" flat round dense @click="sueldoDialog = false" />
          </q-card-section>
  
          <q-card-section class="q-pt-none">
            <q-form @submit="sueldo.id ? sueldoPut() : sueldoPost()">
              <q-input v-model="sueldo.monto" label="Monto" dense outlined :rules="[val => !!val || 'Campo requerido']" />
              <q-select v-model="sueldo.ejecutivo_id" label="Ejecutivo" dense outlined :options="ejecutivos" :rules="[val => !!val || 'Campo requerido']" emit-value map-options :option-label="ejecutivo => ejecutivo.nombre" :option-value="ejecutivo => ejecutivo.id" />
              <q-select v-model="sueldo.periodo" label="Periodo" dense outlined :options="periodos" :rules="[val => !!val || 'Campo requerido']" />
              <div class="text-right">
                <q-btn color="negative" label="Cancelar" @click="sueldoDialog = false" no-caps :loading="loading" />
                <q-btn color="primary" label="Guardar" type="submit" no-caps :loading="loading" class="q-ml-sm" />
              </div>
            </q-form>
          </q-card-section>
        </q-card>
      </q-dialog>
    </q-page>
  </template>
  
  <script>
  export default {
    name: 'SueldoPage',
    data() {
      return {
        sueldos: [],
        sueldo: {},
        sueldoDialog: false,
        loading: false,
        actionPeriodo: '',
        ejecutivos: [],
        periodos: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        filter: '',
        columns: [
          { name: 'actions', label: 'Acciones', align: 'center' },
          { name: 'monto', label: 'Monto', align: 'left', field: 'monto' },
          { name: 'ejecutivo', label: 'Ejecutivo', align: 'left', field: row => row.ejecutivo?.nombre },
          { name: 'periodo', label: 'Periodo', align: 'left', field: 'periodo' },
        ],
      };
    },
    mounted() {
      this.sueldoGet();
      this.ejecutivosGet();
    },
    methods: {
      sueldoGet() {
        this.loading = true;
        this.$axios.get('sueldos').then(res => {
          this.sueldos = res.data;
        }).catch(error => {
          this.$alert.error(error.response.data.message);
        }).finally(() => {
          this.loading = false;
        });
      },
      ejecutivosGet() {
        this.loading = true;
        this.$axios.get('ejecutivos').then(res => {
          this.ejecutivos = res.data;
        }).catch(error => {
          this.$alert.error(error.response.data.message);
        }).finally(() => {
          this.loading = false;
        });
      },
      sueldoNew() {
        this.sueldo = {
          monto: '',
          ejecutivo_id: null,
          periodo: '',
        };
        this.actionPeriodo = 'Nuevo';
        this.sueldoDialog = true;
      },
      sueldoPost() {
        this.loading = true;
        this.$axios.post('sueldos', this.sueldo).then(res => {
          this.sueldoGet();
          this.sueldoDialog = false;
          this.$alert.success('Sueldo creado');
        }).catch(error => {
          this.$alert.error(error.response.data.message);
        }).finally(() => {
          this.loading = false;
        });
      },
      sueldoPut() {
        this.loading = true;
        this.$axios.put('sueldos/' + this.sueldo.id, this.sueldo).then(res => {
          this.sueldoGet();
          this.sueldoDialog = false;
          this.$alert.success('Sueldo actualizado');
        }).catch(error => {
          this.$alert.error(error.response.data.message);
        }).finally(() => {
          this.loading = false;
        });
      },
      sueldoEdit(sueldo) {
        this.sueldo = { ...sueldo };
        this.actionPeriodo = 'Editar';
        this.sueldoDialog = true;
      },
      sueldoDelete(id) {
        this.$alert.dialog('¿Desea eliminar este sueldo?')
          .onOk(() => {
            this.loading = true;
            this.$axios.delete('sueldos/' + id).then(res => {
              this.sueldoGet();
              this.$alert.success('Sueldo eliminado');
            }).catch(error => {
              this.$alert.error(error.response.data.message);
            }).finally(() => {
              this.loading = false;
            });
          });
      },
    },
  };
  </script>
  