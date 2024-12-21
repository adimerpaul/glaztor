<template>
    <q-page class="q-pa-md">
      <q-table
        :rows="regions"
        :columns="columns"
        :filter="filter"
        dense
        wrap-cells
        flat
        bordered
        :rows-per-page-options="[0]"
        title="Regiones"
      >
        <template v-slot:top-right>
          <q-btn
            color="primary"
            label="Nuevo"
            @click="dialogClick"
            outline
            no-caps
            icon="add_circle_outline"
            :loading="loading"
          />
          <q-input
            v-model="filter"
            label="Buscar"
            dense
            outlined
          >
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </template>
  
        <template v-slot:body-cell-actions="props">
          <q-td :props="props">
            <q-btn-dropdown label="Opciones" no-caps size="10px" dense color="primary">
              <q-list>
                <q-item clickable @click="modificar(props.row)" v-close-popup>
                  <q-item-section avatar>
                    <q-icon name="edit" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>Editar</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item clickable @click="eliminar(props.row.id)" v-close-popup>
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
  
        <template v-slot:body-cell-estado="props">
          <q-td :props="props">
            <q-chip
              :label="props.row.estado"
              :color="props.row.estado === 'Activo' ? 'green' : 'red'"
              text-color="white"
              dense
              size="14px"
            />
          </q-td>
        </template>
      </q-table>
  
      <q-dialog v-model="dialog" persistent>
        <q-card>
          <q-card-section class="q-pb-none row items-center">
            <div>{{ region.id ? 'Editar' : 'Nuevo' }} Región</div>
            <q-space />
            <q-btn icon="close" flat round dense @click="dialog = false" />
          </q-card-section>
  
          <q-card-section>
            <q-form @submit="confirmarGuardar">
              <q-input
                v-model="region.nombre_region"
                label="Nombre Región"
                dense
                outlined
                :rules="[val => !!val || 'Este campo es requerido']"
                style="text-transform: uppercase;"
              />
              <q-input
                v-model="region.descripcion_region"
                label="Descripción Región"
                dense
                outlined
                style="text-transform: uppercase;"
              />
              <q-select
                v-model="region.estado"
                :options="['Activo', 'Inactivo']"
                outlined
                dense
                :rules="[val => !!val || 'Este campo es requerido']"
                label="Estado"
              />
  
              <div class="text-right">
                <q-btn
                  color="negative"
                  label="Cancelar"
                  @click="dialog = false"
                  no-caps
                  :loading="loading"
                />
                <q-btn
                  color="primary"
                  label="Guardar"
                  type="submit"
                  no-caps
                  :loading="loading"
                  class="q-ml-sm"
                />
              </div>
            </q-form>
          </q-card-section>
        </q-card>
      </q-dialog>
    </q-page>
  </template>
  
  <script>
  export default {
    name: 'regions',
    data() {
      return {
        regions: [],
        region: {},
        dialog: false,
        loading: false,
        filter: '',
        columns: [
          { name: 'name', label: 'Nombre Región', align: 'left', field: 'nombre_region' },
          { name: 'description', label: 'Descripción', align: 'left', field: 'descripcion_region' },
          { name: 'estado', label: 'Estado', align: 'center', field: 'estado' },
          { name: 'actions', label: 'Acciones', align: 'center' },
        ],
      };
    },
    mounted() {
      this.getRegions();
    },
    methods: {
      modificar(region) {
        this.region = { ...region };
        this.dialog = true;
      },
      confirmarGuardar() {
        this.$q.dialog({
          title: 'Confirmar Guardado',
          message: '¿Estás seguro de que quieres guardar los cambios?',
          ok: { label: 'Sí', color: 'primary' },
          cancel: { label: 'No', color: 'negative' }
        }).onOk(() => {
          this.submit();
        });
      },
      submit() {
        this.loading = true;
        const apiCall = this.region.id
          ? this.$axios.put(`regions/${this.region.id}`, this.region)
          : this.$axios.post('regions', this.region);
  
        apiCall
          .then(response => {
            if (response.status === 200 || response.status === 201) {
              if (this.region.id) {
                const index = this.regions.findIndex(r => r.id === this.region.id);
                if (index !== -1) {
                  this.$set(this.regions, index, response.data);
                }
              } else {
                this.regions.push(response.data);
              }
  
              this.dialog = false;
              this.$q.notify({
                color: 'positive',
                message: 'Región guardada exitosamente.',
                icon: 'check_circle'
              });
            }
          })
          .catch(error => {
            console.error("Error al guardar la región:", error);
            this.$q.notify({
              color: 'negative',
              message: 'Error al guardar la región.',
              icon: 'error'
            });
          })
          .finally(() => {
            this.loading = false;
            this.getRegions(); // Actualizamos el listado
          });
      },
      eliminar(id) {
        this.$q.dialog({
          title: 'Eliminar Región',
          message: '¿Estás seguro de que quieres eliminar esta región?',
          ok: { label: 'Eliminar', color: 'negative' },
          cancel: true
        }).onOk(() => {
          this.loading = true;
          this.$axios.delete(`regions/${id}`)
            .then(response => {
              this.regions = this.regions.filter(region => region.id !== id);
              this.$q.notify({
                color: 'positive',
                message: 'Región eliminada exitosamente.',
                icon: 'check_circle'
              });
            })
            .catch(error => {
              console.error("Error al eliminar la región:", error);
              this.$q.notify({
                color: 'negative',
                message: 'Error al eliminar la región.',
                icon: 'error'
              });
            })
            .finally(() => {
              this.loading = false;
            });
        });
      },
      dialogClick() {
        this.dialog = true;
        this.region = { nombre_region: '', descripcion_region: '', estado: 'Activo' };
      },
      getRegions() {
        this.$axios.get('regions')
          .then(response => {
            this.regions = response.data;
          })
          .catch(error => {
            console.error("Error al obtener las regiones:", error);
            this.$q.notify({
              color: 'negative',
              message: 'Error al obtener las regiones.',
              icon: 'error'
            });
          });
      }
    },
  };
  </script>
  
  <style scoped>
  .styled-table {
    width: 100%;
    border-collapse: collapse;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  .styled-table th,
  .styled-table td {
    padding: 12px;
    text-align: left;
  }
  
  .styled-table thead {
    background-color: #3442a8;
    color: white;
  }
  
  .styled-table tbody tr {
    transition: background-color 0.3s;
  }
  
  .styled-table tbody tr:nth-child(even) {
    background-color: #f9f9f9;
  }
  
  .styled-table tbody tr:hover {
    background-color: #e3e3e3;
  }
  </style>
  