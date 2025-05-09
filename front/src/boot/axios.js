import { boot } from 'quasar/wrappers'
import axios from 'axios'
import {useCounterStore} from "stores/example-store";
import {Alert} from "src/addons/Alert";
import VueApexCharts from "vue3-apexcharts";

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
const api = axios.create({ baseURL: 'https://api.example.com' })

export default boot(({ app , router }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api
  app.use(VueApexCharts);
  app.config.globalProperties.$axios = axios.create({ baseURL: import.meta.env.VITE_API_BACK })
  app.config.globalProperties.$alert = Alert
  app.config.globalProperties.$version = import.meta.env.VITE_APP_VERSION
  app.config.globalProperties.$store = useCounterStore()
  app.config.globalProperties.$url = import.meta.env.VITE_API_BACK
  const token = localStorage.getItem('tokenGlaztor')
  if (token) {
    app.config.globalProperties.$axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    app.config.globalProperties.$axios.get('me').then(response => {
      useCounterStore().isLogged = true
      useCounterStore().user = response.data
    }).catch(error => {
      console.log(error)
      localStorage.removeItem('tokenGlaztor')
      localStorage.removeItem('userGlaztor')
      useCounterStore().isLogged = false
      useCounterStore().user = {}
      router.push('/login')
    })
  }
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
})

export { api }
