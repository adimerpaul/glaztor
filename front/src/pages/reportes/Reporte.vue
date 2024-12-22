<template>
  <q-page class="bg-grey-3 q-pa-xs">
    <q-card class="q-pa-none" flat bordered>
      <q-card-section class="q-pa-xs">
        <div class="row">
          <div class="col-12 col-md-4">
            <div class="row">
              <div class="col-12">
                <div class="text-bold text-center">
                  Ventas
                </div>
              </div>
              <div class="col-12 col-md-6">
                <q-input v-model="fechaInicioVentas" outlined dense label="Fecha Inicio" type="date" />
              </div>
              <div class="col-12 col-md-6">
                <q-input v-model="fechaFinVentas" outlined dense label="Fecha Fin" type="date" />
              </div>
              <div class="col-12">
                <!-- Añadimos una clave dinámica para forzar la actualización del gráfico -->
                <VueApexCharts
                  :key="chartKey"
                  type="bar"
                  :options="chartOptions"
                  :series="series"
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
      chartOptions: {
        chart: {
          id: 'chart-ventas'
        },
        xaxis: {
          categories: [] // Vacío inicialmente
        }
      },
      series: [{
        name: 'Total',
        data: [] // Vacío inicialmente
      }],
      chartKey: 0 // Clave para forzar la actualización
    }
  },
  mounted() {
    this.fetchReporteVentas();
  },
  methods: {
    async fetchReporteVentas() {
      try {
        const response = await this.$axios.post('/reporteVentas', {
          fechaInicioVentas: this.fechaInicioVentas,
          fechaFinVentas: this.fechaFinVentas
        });

        const ventas = response.data;

        this.chartOptions.xaxis.categories = ventas.map(venta => venta.user.name);
        this.series[0].data = ventas.map(venta => venta.total_ventas);

        this.chartKey++;
      } catch (error) {
        console.error('Error al obtener el reporte de ventas:', error);
      }
    }
  }
}
</script>
