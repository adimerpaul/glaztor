<template>
    <q-page class="bg-grey-2 q-pa-md">
      <q-card class="rounded-borders shadow-4">
        <q-card-section class="q-pa-none">
          <!-- Tabla de Zonas -->
          <q-table
            :rows="zonas"
            :columns="columns"
            row-key="id"
            class="styled-table"
            :loading="loading"
            no-data-label="No se encontraron zonas"
          >
            <template v-slot:top>
              <div class="q-mb-md">
                <q-btn
                  color="primary"
                  icon="add"
                  label="Agregar Zona"
                  @click="dialogClick"
                  rounded
                  class="full-width"
                />
              </div>
            </template>
            <template v-slot:body-cell-acciones="props">
              <q-td :props="props">
                <q-btn
                  size="sm"
                  color="negative"
                  icon="delete"
                  @click="eliminar(props.row.id)"
                  class="q-mr-sm"
                />
                <q-btn
                  size="sm"
                  color="deep-orange"
                  label="Modificar"
                  @click="modificar(props.row)"
                  rounded
                />
              </q-td>
            </template>
          </q-table>
        </q-card-section>
      </q-card>

      <!-- Modal para agregar/editar Zona -->
      <q-dialog v-model="dialog" :maximized="true" persistent>
        <q-card style="max-width: 500px; width: 100%;">
          <q-card-section class="bg-primary text-white">
            <q-btn flat round dense icon="fa-solid fa-arrow-left" v-close-popup />
            <q-space />
            <div class="text-h6">{{ zona.id ? 'Editar' : 'Nuevo' }} Zona</div>
          </q-card-section>

          <q-card-section>
            <q-form @submit.prevent="confirmarGuardar">
              <q-input
                v-model="zona.nombre_zona"
                outlined
                label="Nombre Zona"
                dense
                autofocus
                :rules="[val => !!val || 'Este campo es requerido']"
                @input="zona.nombre_zona = zona.nombre_zona.toUpperCase()"
                style="text-transform: uppercase"
              />
              <q-input
                v-model="zona.descripcion_zona"
                outlined
                label="Descripción Zona"
                dense
                @input="zona.descripcion_zona = zona.descripcion_zona.toUpperCase()"
                style="text-transform: uppercase"
              />
              <q-select
                v-model="zona.estado"
                :options="['Activo', 'Inactivo']"
                outlined
                label="Estado"
                dense
                :rules="[val => !!val || 'Este campo es requerido']"
              />

              <q-card-actions align="right">
                <q-btn label="Cancelar" color="negative" @click="dialog = false" :loading="loading" />
                <q-btn label="Guardar" color="primary" type="submit" :loading="loading" />
              </q-card-actions>
            </q-form>
          </q-card-section>
        </q-card>
      </q-dialog>
    </q-page>
  </template>

  <script>
  export default {
    name: 'zonas',
    data() {
      return {
        zonas: [],
        zona: {},
        dialog: false,
        loading: false,
        columns: [
          { name: 'id', label: 'ID', align: 'left', field: 'id' },
          { name: 'nombre_zona', label: 'Nombre Zona', align: 'left', field: 'nombre_zona' },
          { name: 'descripcion_zona', label: 'Descripción', align: 'left', field: 'descripcion_zona' },
          { name: 'estado', label: 'Estado', align: 'center', field: 'estado' },
          { name: 'acciones', label: 'Acciones', align: 'center' }
        ]
      };
    },
    mounted() {
      this.getZonas();
    },
    methods: {
      modificar(zona) {
        this.zona = { ...zona };
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
        const apiCall = this.zona.id
          ? this.$axios.put(`zonas/${this.zona.id}`, this.zona)
          : this.$axios.post('zonas', this.zona);

        apiCall
          .then(response => {
            if (response.status === 200 || response.status === 201) {
              if (this.zona.id) {
                const index = this.zonas.findIndex(z => z.id === this.zona.id);
                if (index !== -1) {
                  this.zonas.splice(index, 1, response.data);
                }
              } else {
                this.zonas.push(response.data);
              }
              this.dialog = false;
              this.$alert.success('Guardado con éxito.');
            }
          })
          .catch(error => {
            console.error("Error al guardar la zona:", error);
            this.$alert.error('Error al guardar.');
          })
          .finally(() => {
            this.loading = false;
            this.getZonas();
          });
      },
      eliminar(id) {
        this.$q.dialog({
          title: 'Eliminar Zona',
          message: '¿Estás seguro de que quieres eliminar esta zona?',
          ok: { label: 'Eliminar', color: 'negative' },
          cancel: true
        }).onOk(() => {
          this.loading = true;
          this.$axios.delete(`zonas/${id}`)
            .then(response => {
              this.zonas = this.zonas.filter(zona => zona.id !== id);
              this.$q.notify({
                color: 'positive',
                message: 'Zona eliminada exitosamente.',
                icon: 'check_circle'
              });
            })
            .catch(error => {
              console.error("Error al eliminar la zona:", error);
              this.$q.notify({
                color: 'negative',
                message: 'Error al eliminar la zona.',
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
        this.zona = {
          nombre_zona: '',
          descripcion_zona: '',
          estado: 'Activo'
        };
      },
      getZonas() {
        this.$axios.get('zonas')
          .then(response => {
            this.zonas = response.data;
          })
          .catch(error => {
            console.error("Error al obtener las zonas:", error);
            this.$q.notify({
              color: 'negative',
              message: 'Error al obtener las zonas.',
              icon: 'error'
            });
          });
      }
    }
  };
  </script>

  <style scoped>
  .styled-table {
    width: 100%;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  .styled-table .q-table__header {
    background-color: #3d4f9a;
    color: white;
  }

  .styled-table .q-table__row:nth-child(even) {
    background-color: #f9f9f9;
  }

  .styled-table .q-table__row:hover {
    background-color: #e3e3e3;
  }
  </style>
