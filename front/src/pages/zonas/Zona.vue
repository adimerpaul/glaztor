<template>
    <q-page class="bg-grey-3 q-pa-xs">
        <q-card>
            <q-card-section class="q-pa-xs">
                <table border="1" style="width:100%" class="styled-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre Zona</th>
                            <th>Descripción</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(zona, index) in zonas" :key="zona.id">
                            <td>{{ zona.id }}</td>
                            <td>{{ zona.nombre_zona }}</td>
                            <td>{{ zona.descripcion_zona }}</td>
                            <td>{{ zona.estado }}</td>
                            <td>
                                <q-btn @click="eliminar(zona.id)" color="negative" size="xs" icon="delete" />
                                <q-btn @click="modificar(zona)" class="glossy" rounded color="deep-orange" label="Modificar" />
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
                <div class="text-h6">{{ zona.id ? 'Editar' : 'Nuevo' }} Zona</div>
            </q-card-section>
            <q-card-section>
                <q-form @submit.prevent="confirmarGuardar">
                    <div class="row">
                        <div class="col-12">
                            <q-input
                                dense
                                v-model="zona.nombre_zona"
                                outlined
                                label="Nombre Zona"
                                :rules="[val => !!val || 'Este campo es requerido']"
                                @input="zona.nombre_zona = zona.nombre_zona.toUpperCase()"
                                style="text-transform: uppercase;" />
                        </div>
                        <div class="col-12">
                            <q-input
                                dense
                                v-model="zona.descripcion_zona"
                                outlined
                                label="Descripción Zona"
                                @input="zona.descripcion_zona = zona.descripcion_zona.toUpperCase()"
                                style="text-transform: uppercase;" />
                        </div>
                        <div class="col-12">
                            <q-select
                                dense
                                v-model="zona.estado"
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
    name: 'zonas',

    data() {
        return {
            zonas: [],
            zona: {},
            dialog: false,
            loading: false,
        };
    },
    mounted() {
        this.getZonas();
    },
    methods: {
        modificar(zona) {
            this.zona = { ...zona }; // Clonamos el objeto zona
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

            const apiCall = this.zona.id
                ? this.$axios.put(`zonas/${this.zona.id}`, this.zona)
                : this.$axios.post('zonas', this.zona);

            apiCall
                .then(response => {
                    if (response.status === 200 || response.status === 201) {
                        if (this.zona.id) {
                            const index = this.zonas.findIndex(z => z.id === this.zona.id);
                            if (index !== -1) {
                                this.$set(this.zonas, index, response.data);
                            }
                        } else {
                            this.zonas.push(response.data);
                        }

                        this.dialog = false;

                        this.$q.notify({
                            color: 'positive',
                            message: 'Zona guardada exitosamente.',
                            icon: 'check_circle'
                        });
                    }
                })
                .catch(error => {
                    console.error("Error al guardar la zona:", error);
                    this.$q.notify({
                            color: 'positive',
                            message: 'Zona guardada exitosamente.',
                            icon: 'check_circle'
                        });
                })
                .finally(() => {
                    this.loading = false;
                    this.dialog = false;
                    this.getZonas(); // Actualizamos el listado
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
                            message: 'Error al eliminar la zona. Intenta nuevamente.',
                            icon: 'report_problem'
                        });
                    })
                    .finally(() => {
                        this.loading = false; // Aseguramos que loading se pone en false
                    });
            });
        },
        dialogClick() {
            this.dialog = true;
            this.zona = { // Inicializar una nueva zona
                nombre_zona: '',
                descripcion_zona: '',
                estado: 'ACTIVO',
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
                        message: 'Error al obtener las zonas. Intenta nuevamente.',
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