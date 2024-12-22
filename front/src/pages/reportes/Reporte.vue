<template>
  <q-page class="bg-grey-3 q-pa-xs">
    <q-card class="q-pa-md" flat bordered>
      <q-card-section class="q-pa-xs">
        <div class="row">
          <div class="col-12 col-md-6">
            <div class="row">
              <div class="col-12">
                <div class="text-bold text-center">
                  Ventas
                </div>
              </div>
              <div class="col-12 col-md-6">
                <q-input v-model="fechaInicioVentas" outlined dense label="Fecha Inicio" type="date" @update:modelValue="fetchReporteVentas" />
              </div>
              <div class="col-12 col-md-6">
                <q-input v-model="fechaFinVentas" outlined dense label="Fecha Fin" type="date" @update:modelValue="fetchReporteVentas" />
              </div>
              <div class="col-12">
                <VueApexCharts
                  :key="chartKeyVentas"
                  type="bar"
                  :options="chartOptionsVentas"
                  :series="seriesVentas"
                ></VueApexCharts>
              </div>
            </div>
          </div>
          <div class="col-12 col-md-6">
            <div class="row">
              <div class="col-12">
                <div class="text-bold text-center">
                  Deudas
                </div>
              </div>
              <div class="col-12 col-md-6">
                <q-input v-model="fechaInicioDeudas" outlined dense label="Fecha Inicio" type="date" @update:modelValue="fetchReporteDeudas" />
              </div>
              <div class="col-12 col-md-6">
                <q-input v-model="fechaFinDeudas" outlined dense label="Fecha Fin" type="date" @update:modelValue="fetchReporteDeudas" />
              </div>
              <div class="col-12">
                <VueApexCharts
                  :key="chartKeyDeudas"
                  type="bar"
                  :options="chartOptionsDeudas"
                  :series="seriesDeudas"
                ></VueApexCharts>
              </div>
            </div>
          </div>

        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import moment from "moment";
import VueApexCharts from 'vue3-apexcharts'

export default {
  name: 'Reporte',
  components: {
    VueApexCharts
  },
  data () {
    return {
      fechaInicioVentas: moment().startOf('month').format('YYYY-MM-DD'),
      fechaFinVentas: moment().endOf('month').format('YYYY-MM-DD'),
      fechaInicioDeudas: moment().startOf('month').format('YYYY-MM-DD'),
      fechaFinDeudas: moment().endOf('month').format('YYYY-MM-DD'),
      chartOptionsVentas: {
        chart: {
          id: 'chart-ventas'
        },
        xaxis: {
          categories: []
        },
        title: {
          text: 'Reporte de Ventas',
          align: 'center'
        }
      },
      chartOptionsDeudas: {
        chart: {
          id: 'chart-deudas'
        },
        xaxis: {
          categories: []
        },
        title: {
          text: 'Reporte de Deudas',
          align: 'center'
        }
      },
      seriesVentas: [{
        name: 'Total',
        data: []
      }],
      seriesDeudas: [{
        name: 'Total',
        data: []
      }],
      chartKeyVentas: 0,
      chartKeyDeudas: 0,
    }
  },
  mounted() {
    this.fetchReporteVentas();
    this.fetchReporteDeudas();
  },
  methods: {
    async fetchReporteDeudas() {
      try {
        const response = await this.$axios.post('/reporteDeudas', {
          fechaInicioDeudas: this.fechaInicioDeudas,
          fechaFinDeudas: this.fechaFinDeudas
        });

        const deudas = response.data;

        this.chartOptionsDeudas.xaxis.categories = deudas.map(deuda => deuda.cliente.nombre);
        this.seriesDeudas[0].data = deudas.map(deuda => deuda.total_deuda);
        this.chartOptionsDeudas.title.text = `Deudas del ${moment(this.fechaInicioDeudas).format('DD/MM/YYYY')} al ${moment(this.fechaFinDeudas).format('DD/MM/YYYY')}`;

        this.chartKeyDeudas++;
      } catch (error) {
        console.error('Error al obtener el reporte de deudas:', error);
      }
    },
    async fetchReporteVentas() {
      try {
        const response = await this.$axios.post('/reporteVentas', {
          fechaInicioVentas: this.fechaInicioVentas,
          fechaFinVentas: this.fechaFinVentas
        });

        const ventas = response.data;

        this.chartOptionsVentas.xaxis.categories = ventas.map(venta => venta.user.name);
        this.seriesVentas[0].data = ventas.map(venta => venta.total_ventas);
        this.chartOptionsVentas.title.text = `Ventas del ${moment(this.fechaInicioVentas).format('DD/MM/YYYY')} al ${moment(this.fechaFinVentas).format('DD/MM/YYYY')}`;

        this.chartKeyVentas++;
      } catch (error) {
        console.error('Error al obtener el reporte de ventas:', error);
      }
    }
  }
}
</script>
