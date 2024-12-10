<template>
    <q-page class="bg-grey-2 q-pa-lg">
      <q-card>
        <q-card-section class="q-pa-sm">
          <table class="styled-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre Cargo</th>
                <th>Descripción</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(cargo, index) in cargos" :key="cargo.id">
                <td>{{ cargo.id }}</td>
                <td>{{ cargo.nombre_cargo }}</td>
                <td>{{ cargo.descripcion_cargo }}</td>
                <td>
                  <q-chip
                    :color="cargo.estado === 'ACTIVO' ? 'green' : 'red'"
                    text-color="white"
                    dense
                  >
                    {{ cargo.estado }}
                  </q-chip>
                </td>
                <td>
                  <q-btn
                    flat
                    dense
                    icon="edit"
                    color="blue"
                    label="Editar"
                    @click="modificar(cargo)"
                  />
                  <q-btn
                    flat
                    dense
                    icon="delete"
                    color="negative"
                    label="Eliminar"
                    @click="eliminar(cargo.id)"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </q-card-section>
      </q-card>
  
      <q-page-sticky position="bottom-right" :offset="[18, 18]">
        <q-btn fab color="primary" icon="add" @click="dialogClick" />
      </q-page-sticky>
  
      <q-dialog v-model="dialog" :maximized="esMovil">
        <q-card style="width: 450px; max-width: 100vw;">
          <q-card-section class="bg-primary text-white">
            <div class="row items-center">
              <q-btn flat round dense icon="arrow_back" v-close-popup />
              <q-space />
              <div class="text-h6">{{ cargo.id ? "Editar" : "Nuevo" }} Cargo</div>
            </div>
          </q-card-section>
  
          <q-card-section>
            <q-form @submit.prevent="confirmarGuardar">
              <q-input
                dense
                v-model="cargo.nombre_cargo"
                outlined
                label="Nombre del Cargo"
                style="text-transform: uppercase;"
                @input="cargo.nombre_cargo = cargo.nombre_cargo.toUpperCase()"
                :rules="[val => !!val || 'Campo requerido']"
              />
              <q-input
                dense
                v-model="cargo.descripcion_cargo"
                outlined
                label="Descripción"
                style="text-transform: uppercase;"
                @input="cargo.descripcion_cargo = cargo.descripcion_cargo.toUpperCase()"
              />
              <q-select
                dense
                v-model="cargo.estado"
                :options="['ACTIVO', 'INACTIVO']"
                outlined
                label="Estado"
                :rules="[val => !!val || 'Campo requerido']"
              />
              <q-card-actions align="right">
                <q-btn flat label="Cancelar" color="negative" @click="dialog = false" />
                <q-btn label="Guardar" color="primary" type="submit" />
              </q-card-actions>
            </q-form>
          </q-card-section>
        </q-card>
      </q-dialog>
    </q-page>
  </template>
  
  <script>
  export default {
    name: "cargos",
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
        this.cargo = { ...cargo };
        this.dialog = true;
      },
      confirmarGuardar() {
        this.$q
          .dialog({
            title: "Confirmar Guardado",
            message: "¿Estás seguro de que quieres guardar los cambios?",
            ok: { label: "Sí", color: "primary" },
            cancel: { label: "No", color: "negative" },
          })
          .onOk(() => {
            this.submit();
          });
      },
      submit() {
        this.loading = true;
        const apiCall = this.cargo.id
          ? this.$axios.put(`cargos/${this.cargo.id}`, this.cargo)
          : this.$axios.post("cargos", this.cargo);
  
        apiCall
          .then((response) => {
            if (this.cargo.id) {
              const index = this.cargos.findIndex((c) => c.id === this.cargo.id);
              this.$set(this.cargos, index, response.data);
            } else {
              this.cargos.push(response.data);
            }
            this.dialog = false;
            this.$q.notify({ color: "positive", message: "Guardado con éxito." });
          })
          .catch(() => {
            this.$q.notify({ color: "negative", message: "Error al guardar." });
          })
          .finally(() => {
            this.loading = false;
          });
      },
      eliminar(id) {
        this.$q
          .dialog({
            title: "Eliminar Cargo",
            message: "¿Estás seguro de eliminar este cargo?",
            ok: { label: "Eliminar", color: "negative" },
            cancel: true,
          })
          .onOk(() => {
            this.$axios.delete(`cargos/${id}`).then(() => {
              this.cargos = this.cargos.filter((c) => c.id !== id);
              this.$q.notify({ color: "positive", message: "Eliminado con éxito." });
            });
          });
      },
      dialogClick() {
        this.dialog = true;
        this.cargo = { nombre_cargo: "", descripcion_cargo: "", estado: "ACTIVO" };
      },
      getCargos() {
        this.$axios.get("cargos").then((response) => {
          this.cargos = response.data;
        });
      },
    },
    computed: {
      esMovil() {
        return this.$q.screen.lt.md;
      },
    },
  };
  </script>
  
  <style scoped>
  .styled-table {
    width: 100%;
    border-collapse: collapse;
    background-color: white;
  }
  
  .styled-table th {
    background-color: #0078d7;
    color: white;
    text-align: left;
    padding: 12px;
  }
  
  .styled-table td {
    padding: 12px;
  }
  
  .styled-table tbody tr:hover {
    background-color: #f5f5f5;
  }
  
  .q-btn {
    margin: 0 4px;
  }
  </style>
  