<template>
    <q-page class="bg-grey-2 q-pa-lg">
      <q-card>
        <q-card-section class="q-pa-sm">
          <q-markup-table dense wrap-cells>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(newservicio, index) in newservicios" :key="newservicio.id">
                <td>{{ newservicio.id }}</td>
                <td>{{ newservicio.nombre }}</td>
                <td>{{ newservicio.descripcion }}</td>
                <td>
                  <q-chip
                    :color="newservicio.estado === 'Activo' ? 'green' : 'red'"
                    text-color="white"
                    dense
                  >
                    {{ newservicio.estado }}
                  </q-chip>
                </td>
                <td>
                  <q-btn
                    flat
                    dense
                    icon="edit"
                    color="blue"
                    label="Editar"
                    @click="modificar(newservicio)"
                  />
                  <q-btn
                    flat
                    dense
                    icon="delete"
                    color="negative"
                    label="Eliminar"
                    @click="eliminar(newservicio.id)"
                  />
                </td>
              </tr>
            </tbody>
          </q-markup-table>
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
              <div class="text-h6">{{ newservicio.id ? "Editar" : "Nuevo" }} Servicio</div>
            </div>
          </q-card-section>
  
          <q-card-section>
            <q-form @submit.prevent="confirmarGuardar">
              <q-input
                dense
                v-model="newservicio.nombre"
                outlined
                label="Nombre del Servicio"
              
                :rules="[val => !!val || 'Campo requerido']"
              />
              <q-input
                dense
                v-model="newservicio.descripcion"
                outlined
                label="Descripción"
          
              />
              <q-select
                dense
                v-model="newservicio.estado"
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
    name: "newservicios",
    data() {
      return {
        newservicios: [],
        newservicio: {},
        dialog: false,
        loading: false,
      };
    },
    mounted() {
      this.getNewServicios();
    },
    methods: {
      modificar(newservicio) {
        this.newservicio = { ...newservicio };
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
        const apiCall = this.newservicio.id
          ? this.$axios.put(`newservicios/${this.newservicio.id}`, this.newservicio)
          : this.$axios.post("newservicios", this.newservicio);
        apiCall.then((response) => {
            if (this.newservicio.id) {
              const index = this.newservicios.findIndex((c) => c.id === this.newservicio.id);
              this.newservicios.splice(index, 1, response.data);
            } else {
              this.newservicios.push(response.data);
            }
            this.dialog = false;
            this.$alert.success("Guardado con éxito.");
          })
          .catch(() => {
            this.$alert.error("Error al guardar.");
          })
          .finally(() => {
            this.loading = false;
          });
      },

      eliminar(id) {
        this.$q
          .dialog({
            title: "Eliminar servicio",
            message: "¿Estás seguro de eliminar este servicio?",
            ok: { label: "Eliminar", color: "negative" },
            cancel: true,
          })
          .onOk(() => {
            this.$axios.delete(`newservicios/${id}`).then(() => {
              this.newservicios = this.newservicios.filter((c) => c.id !== id);
              this.$q.notify({ color: "positive", message: "Eliminado con éxito" });
            });
          });
      },

      dialogClick() {
        this.dialog = true;
        this.newservicio = { nombre: "", descripcion: "", estado: "Activo" };
      },
      getNewServicios() {
        this.$axios.get("newservicios").then((response) => {
          this.newservicios = response.data;
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
  /* Aquí puedes ajustar estilos según tu necesidad */
  </style>
  