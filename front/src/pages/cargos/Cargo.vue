<template>
    <q-page class="bg-grey-3 q-pa-xs">
        <q-card>
            <q-card-section class="q-pa-xs">
                <table border="1" style="width:100%">
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>nombre cargo</th>
                            <th>Descripcion</th>
                            <th>estado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(cargo, index) in cargos" :key="cargo.id">
                            <td>{{ cargo.id }}</td>
                            <td>{{ cargo.nombre_cargo }}</td>
                            <td>{{ cargo.descripcion_cargo }}</td>
                            <td>{{ cargo.estado }}</td>
                            <td>
                                <q-btn @click="eliminar(cargo.id)" color="negative" size="xs" icon="delete" />
                                <q-btn @click="modificar(cargo)" class="glossy" rounded color="deep-orange" label="Modificar" />
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
                <div class="text-h6">{{ cargo.id ? 'Editar' : 'Nuevo' }} cargo</div>
            </q-card-section>
            <q-card-section>
                <q-form @submit.prevent="confirmarGuardar">
                    <div class="row">
                        <div class="col-12">
                            <q-input
                                dense
                                v-model="cargo.nombre_cargo"
                                outlined
                                label="Nombre cargo"
                                :rules="[val => !!val || 'Este campo es requerido']"
                                @input="cargo.nombre_cargo = cargo.nombre_cargo.toUpperCase()"
                                style="text-transform: uppercase;" />
                        </div>
                        <div class="col-12">
                            <q-input
                                dense
                                v-model="cargo.descripcion_cargo"
                                outlined
                                label="Descripcion cargo"
                                @input="cargo.descripcion_cargo = cargo.descripcion_cargo.toUpperCase()"
                                style="text-transform: uppercase;" />
                        </div>
                        <div class="col-12">
                            <q-select
                                dense
                                v-model="cargo.estado"
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
    name: 'cargos',

    data() {
        return {
            cargos: [],
            cargo: {},
            dialog: false,
            loading: false,
        };
    },
    mounted() {
        this.getCargos();
    },
    methods: {
    modificar(cargo) {
        this.cargo = { ...cargo }; // Clonamos el objeto cargo
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

    const apiCall = this.cargo.id
        ? this.$axios.put(`cargos/${this.cargo.id}`, this.cargo)
        : this.$axios.post('cargos', this.cargo);

    apiCall
        .then(response => {
            // Verifica si la respuesta indica éxito
            if (response.status === 200 || response.status === 201) {
                // Si es una actualización, reemplazamos el cargo existente
                if (this.cargo.id) {
                    const index = this.cargos.findIndex(c => c.id === this.cargo.id);
                    if (index !== -1) {
                        // Actualiza el cargo existente
                        this.$set(this.cargos, index, response.data);
                    }
                } else {
                    // Si es un nuevo cargo, lo agregamos a la lista
                    this.cargos.push(response.data);
                }

                // Cerramos el diálogo
                this.dialog = false;

                // Notificación de éxito
                this.$q.notify({
                    color: 'positive',
                    message: 'Cargo guardado exitosamente.',
                    icon: 'check_circle'
                });
            } 
        })
        .catch(error => {
            console.error("Error al guardar el cargo:", error);
            this.$q.notify({
                    color: 'positive',
                    message: 'Cargo guardado exitosamente.',
                    icon: 'check_circle'
                });
        })
        .finally(() => {
            this.loading = false;
            this.dialog = false; 
            this.getCargos();
        });
},


    eliminar(id) {
        this.$q.dialog({
            title: 'Eliminar Cargo',
            message: '¿Estás seguro de que quieres eliminar este cargo?',
            ok: { label: 'Eliminar', color: 'negative' },
            cancel: true
        }).onOk(() => {
            this.loading = true;
            this.$axios.delete(`cargos/${id}`)
                .then(response => {
                    this.cargos = this.cargos.filter(cargo => cargo.id !== id);
                    // Notificación de éxito
                    this.$q.notify({
                        color: 'positive',
                        message: 'Cargo eliminado exitosamente.',
                        icon: 'check_circle'
                    });
                })
                .catch(error => {
                    console.error("Error al eliminar el cargo:", error);
                    this.$q.notify({
                        color: 'negative',
                        message: 'Error al eliminar el cargo. Intenta nuevamente.',
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
        this.cargo = { // Inicializar un nuevo cargo
            nombre_cargo: '',
            descripcion_cargo: '',
            estado: '',
        };
    },
    getCargos() {
        this.$axios.get('cargos')
            .then(response => {
                this.cargos = response.data;
            })
            .catch(error => {
                console.error("Error al obtener los cargos:", error);
                this.$q.notify({
                    color: 'negative',
                    message: 'Error al obtener los cargos. Intenta nuevamente.',
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
