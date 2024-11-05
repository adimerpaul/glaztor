<template>
    <q-page class="bg-grey-3 q-pa-xs">
        <q-card>
            <q-card-section class="q-pa-xs">
                <table border="1" style="width:100%" class="styled-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre Región</th>
                            <th>Descripción</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(region, index) in regions" :key="region.id">
                            <td>{{ region.id }}</td>
                            <td>{{ region.nombre_region }}</td>
                            <td>{{ region.descripcion_region }}</td>
                            <td>{{ region.estado }}</td>
                            <td>
                                <q-btn @click="eliminar(region.id)" color="negative" size="xs" icon="delete" />
                                <q-btn @click="modificar(region)" class="glossy" rounded color="deep-orange" label="Modificar" />
                            </td>
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
        transition-hide="slide-right">
        <q-card style="width: 450px; max-width: 100vw;">
            <q-card-section class="row items-center q-px-md bg-primary text-white q-px-none">
                <q-btn flat round dense icon="fa-solid fa-arrow-left" v-close-popup />
                <q-space />
                <div class="text-h6">{{ region.id ? 'Editar' : 'Nuevo' }} Región</div>
            </q-card-section>
            <q-card-section>
                <q-form @submit.prevent="confirmarGuardar">
                    <div class="row">
                        <div class="col-12">
                            <q-input
                                dense
                                v-model="region.nombre_region"
                                outlined
                                label="Nombre Región"
                                :rules="[val => !!val || 'Este campo es requerido']"
                                @input="region.nombre_region = region.nombre_region.toUpperCase()"
                                style="text-transform: uppercase;" />
                        </div>
                        <div class="col-12">
                            <q-input
                                dense
                                v-model="region.descripcion_region"
                                outlined
                                label="Descripción Región"
                                @input="region.descripcion_region = region.descripcion_region.toUpperCase()"
                                style="text-transform: uppercase;" />
                        </div>
                        <div class="col-12">
                            <q-select
                                dense
                                v-model="region.estado"
                                :options="['ACTIVO', 'INACTIVO']"
                                outlined
                                :rules="[val => !!val || 'Este campo es requerido']"
                                label="Estado" />
                        </div>
                        <q-card-actions align="right">
                            <q-btn label="Cancelar" color="negative" @click="dialog = false" :loading="loading" />
                            <q-btn label="Guardar" color="primary" type="submit" :loading="loading" />
                        </q-card-actions>
                    </div>
                </q-form>
            </q-card-section>
        </q-card>
    </q-dialog>
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
        };
    },
    mounted() {
        this.getRegions();
    },
    methods: {
        modificar(region) {
            this.region = { ...region }; // Clonamos el objeto region
            this.dialog = true; // Abrimos el diálogo
        },
        confirmarGuardar() {
            this.$q.dialog({
                title: 'Confirmar Guardado',
                message: '¿Estás seguro de que quieres guardar los cambios?',
                ok: { label: 'Sí', color: 'primary' },
                cancel: { label: 'No', color: 'negative' }
            }).onOk(() => {
                this.submit(); // Llamamos al método submit si el usuario confirma
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
                            color: 'positive',
                            message: 'Región guardada exitosamente.',
                            icon: 'check_circle'
                        });
                })
                .finally(() => {
                    this.loading = false;
                    this.dialog = false;
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
                            message: 'Error al eliminar la región. Intenta nuevamente.',
                            icon: 'report_problem'
                        });
                    })
                    .finally(() => {
                        this.loading = false;
                    });
            });
        },
        dialogClick() {
            this.dialog = true;
            this.region = { 
                nombre_region: '',
                descripcion_region: '',
                estado: 'ACTIVO',
            };
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
                        message: 'Error al obtener las regiones. Intenta nuevamente.',
                        icon: 'report_problem'
                    });
                });
        },
    },
    computed: {
        esMovil() {
            return this.$q.screen.lt.md;
        }
    }
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
