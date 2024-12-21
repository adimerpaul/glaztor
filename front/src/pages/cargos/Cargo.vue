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
                :options="['Activo', 'Inactivo']"
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