<template>
  <q-page class="q-pa-md">
    <q-table
      :rows="cajachicas"
      :columns="columns"
      dense
      wrap-cells
      flat
      bordered
      :rows-per-page-options="[0]"
      title="Movimientos de Caja Chica"
      :filter="filter"
    >
      <template v-slot:top-right>
        <q-btn
          color="primary"
          label="Nuevo"
          @click="cajachicaNew"
          outline
          no-caps
          icon="add_circle_outline"
          :loading="loading"
        />
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
              <q-item clickable @click="cajachicaEdit(props.row)" v-close-popup>
                <q-item-section avatar>
                  <q-icon name="edit" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>Editar</q-item-label>
                </q-item-section>
              </q-item>
              <q-item clickable @click="cajachicaDelete(props.row.id)" v-close-popup>
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
    </q-table>

    <q-dialog v-model="cajachicaDialog" persistent>
      <q-card>
        <q-card-section class="q-pb-none row items-center">
          <div>
            {{ actionCajachica }} movimiento
          </div>
          <q-space />
          <q-btn icon="close" flat round dense @click="cajachicaDialog = false" />
        </q-card-section>
        <q-card-section class="q-pt-none">

          <q-form @submit="cajachica.id ? cajachicaPut() : cajachicaPost()">
            <q-input
              v-model="cajachica.recibo"
              label="Recibo"
              dense
              outlined
              :rules="[val => !!val || 'Campo requerido']"
            />


            <q-input
              v-model="cajachica.concepto"
              label="Concepto"
              dense
              outlined
              :rules="[val => !!val || 'Campo requerido']"
            />
            <q-input
              v-model.number="cajachica.monto"
              label="Monto"
              dense
              outlined
              type="number"
              :rules="[val => !!val || 'Campo requerido']"
            />
            <q-input
              v-model="cajachica.fecha"
              label="Fecha"
              dense
              outlined
              type="date"
              :rules="[val => !!val || 'Campo requerido']"
            />
            <q-select
              v-model="cajachica.tipo_movimiento"
              label="Tipo de Movimiento"
              dense
              outlined
              :options="['Ingreso', 'Egreso']"
              :rules="[val => !!val || 'Campo requerido']"
            />
            <q-input
              v-model="cajachica.descripcion"
              label="Descripción"
              type="textarea"
              dense
              outlined
            />
            <div class="text-right">
              <q-btn color="negative" label="Cancelar" @click="cajachicaDialog = false" no-caps :loading="loading" />
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
  name: 'CajachicaPage',
  data() {
    return {
      cajachicas: [],
      cajachica: {},
      cajachicaDialog: false,
      loading: false,
      actionCajachica: '',
      filter: '',
      columns: [
                { name: 'actions', label: 'Acciones', align: 'center' },
                { name: 'recibo', label: 'Recibo', align: 'left', field: 'recibo' },
                { name: 'concepto', label: 'Concepto', align: 'left', field: 'concepto' },
                { 
                  name: 'monto', 
                  label: 'Monto', 
                  align: 'right', 
                  field: 'monto', 
                },
                { name: 'fecha', label: 'Fecha', align: 'left', field: 'fecha' },
                { name: 'tipo_movimiento', label: 'Tipo', align: 'left', field: 'tipo_movimiento' },
              ],
    };
  },
  mounted() {
    this.cajachicasGet();
  },
  methods: {
    cajachicaNew() {
      this.cajachica = {
        concepto: '',
        monto: 0,
        fecha: '',
        tipo_movimiento: '',
        descripcion: '',
      };
      this.actionCajachica = 'Nuevo';
      this.cajachicaDialog = true;
    },
    cajachicasGet() {
      this.loading = true;
      this.$axios
        .get('cajachicas')
        .then(res => {
          this.cajachicas = res.data;
        })
        .catch(error => {
          this.$alert.error(error.response.data.message);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    cajachicaPost() {
      this.loading = true;
      this.$axios
        .post('cajachicas', this.cajachica)
        .then(() => {
          this.cajachicasGet();
          this.cajachicaDialog = false;
          this.$alert.success('Movimiento creado');
        })
        .catch(error => {
          this.$alert.error(error.response.data.message);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    cajachicaPut() {
      this.loading = true;
      this.$axios
        .put(`cajachicas/${this.cajachica.id}`, this.cajachica)
        .then(() => {
          this.cajachicasGet();
          this.cajachicaDialog = false;
          this.$alert.success('Movimiento actualizado');
        })
        .catch(error => {
          this.$alert.error(error.response.data.message);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    cajachicaEdit(cajachica) {
      this.cajachica = { ...cajachica };
      this.actionCajachica = 'Editar';
      this.cajachicaDialog = true;
    },
    cajachicaDelete(id) {
      this.$alert
        .dialog('¿Desea eliminar este movimiento?')
        .onOk(() => {
          this.loading = true;
          this.$axios
            .delete(`cajachicas/${id}`)
            .then(() => {
              this.cajachicasGet();
              this.$alert.success('Movimiento eliminado');
            })
            .catch(error => {
              this.$alert.error(error.response.data.message);
            })
            .finally(() => {
              this.loading = false;
            });
        });
    },
  },
};
</script>
