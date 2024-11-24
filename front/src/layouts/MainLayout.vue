<template>
  <q-layout view="hHh Lpr lFf">
    <q-header
      class="bg-white text-primary"
      bordered
    >
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
<!--          <q-btn no-caps flat dense round icon="o_search" />-->
          <!--          {{ rutaActual }}-->
        </q-toolbar-title>
        <div>
          <!--          Quasar v{{ $q.version }}-->
          <q-btn-group flat>
            <q-btn no-caps icon="o_notifications" />
            <q-btn no-caps icon="o_account_circle" >
              <q-menu>
                <q-list>
                  <q-item clickable>
                    <q-item-section avatar>
                      <q-icon name="account_circle" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>
                        {{ $store.user.name }}
                      </q-item-label>
                      <q-item-label caption>
                        {{ $store.user.role }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-separator />
                  <q-item clickable @click="logout" v-close-popup>
                    <q-item-section avatar>
                      <q-icon name="exit_to_app" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>Salir</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </q-btn>
          </q-btn-group>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      :width="200"
      :breakpoint="500"
      class="bg-primary text-white"
    >
      <q-list>
        <q-item>
          <q-item-section avatar>
            <q-icon name="account_circle" />
          </q-item-section>
          <q-item-section>
            <!--            <pre>-->
            <!--              {{ $store.user}}-->
            <!--            </pre>-->
            <q-item-label >
              {{ $store.user.name }}
              <!--              <q-chip color="white" text-color="primary" dense>-->
              <span class="text-bold">
                {{ $store.user.role }}
              </span>
              <!--              </q-chip>-->
            </q-item-label>
            <!--            <q-item-label class="text-grey">-->
            <!--              <q-chip color="white" text-color="primary" dense>-->
            <!--                {{ $store.user.role }}-->
            <!--              </q-chip>-->
            <!--            </q-item-label>-->
          </q-item-section>
        </q-item>
        <q-separator  class="bg-white" inset />
        <q-item-label header class="text-white">
          Opciones
        </q-item-label>

        <!--        <EssentialLink-->
        <!--          v-for="link in linksList"-->
        <!--          :key="link.title"-->
        <!--          v-bind="link"-->
        <!--        />-->
        <q-item v-for="link in linksList" :key="link.title" clickable :to="link.link" exact
                class="text-grey"
                active-class="menu"
        >
          <q-item-section avatar>
            <q-icon :name="$route.path === link.link ? 'o_' + link.icon : link.icon"
                    :class="$route.path === link.link ? 'text-white' : ''"/>
          </q-item-section>
          <q-item-section>
            <q-item-label :class="$route.path === link.link ? 'text-white text-bold' : ''">
              {{ link.title }}
            </q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable class="text-red" @click="logout">
          <q-item-section avatar>
            <q-icon name="exit_to_app" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Salir</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container class="bg-grey-3">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
// import { ref } from 'vue'
// import EssentialLink from 'components/EssentialLink.vue'
//
// defineOptions({
//   name: 'MainLayout'
// })
//
// const linksList = [
//   {
//     title: 'Principal',
//     icon: 'home', // Ícono adecuado para página principal
//     link: '/'
//   },
//   {
//     title: 'Prospección',
//     icon: 'local_offer', // Cambié a 'local_offer' para representar ventas/prospección
//     link: '/preventas'
//   },
//   {
//     title: 'Pedidos',
//     icon: 'shopping_cart', // Mantengo el ícono para pedidos
//     link: '/pedidos'
//   },
//   {
//     title: 'Pedidos de Trailers',
//     icon: 'local_shipping', // Ícono más adecuado para trailers
//     link: '/pedidotrailers'
//   },
//   {
//     title: 'Clientes',
//     icon: 'groups', // Mejor para representar clientes
//     link: '/clientes'
//   },
//   {
//     title: 'Personal',
//     icon: 'supervisor_account', // Representa ejecutivos o personal
//     link: '/ejecutivos'
//   },
//   {
//     title: 'Productos',
//     icon: 'inventory', // Ícono adecuado para inventario/productos
//     link: '/productos'
//   },
//   {
//     title: 'Cargos',
//     icon: 'work', // Ícono relacionado con roles o cargos
//     link: '/cargos'
//   },
//   {
//     title: 'Zonas',
//     icon: 'place', // Ícono que simboliza áreas o zonas
//     link: '/zonas'
//   },
//   {
//     title: 'Regions',
//     icon: 'place', // Ícono que simboliza áreas o zonas
//     link: '/regions'
//   },
// ]

// const leftDrawerOpen = ref(false)
//
// function toggleLeftDrawer () {
//   leftDrawerOpen.value = !leftDrawerOpen.value
// }
//
// function logout() {
//   this.$alert.dialog('¿Desea salir del sistema?')
//     .onOk(() => {
//       this.$store.isLogged = false
//       this.$store.user = {}
//       localStorage.removeItem('tokenGlaztor')
//       this.$router.push('/login')
//     })
// }
export default {
  name: 'MainLayout',
  data () {
    return {
      leftDrawerOpen: false,
      linksList: [
        {title: 'Principal', icon: 'home', link: '/'},
        {title: 'Prospección', icon: 'local_offer', link: '/preventas'},
        {title: 'Pedidos', icon: 'shopping_cart', link: '/pedidos'},
        {title: 'Pedidos de Trailers', icon: 'local_shipping', link: '/pedidotrailers'},
        {title: 'Clientes', icon: 'groups', link: '/clientes'},
        {title: 'Personal', icon: 'supervisor_account', link: '/ejecutivos'},
        {title: 'Productos', icon: 'inventory', link: '/productos'},
        {title: 'Cargos', icon: 'work', link: '/cargos'},
        {title: 'Zonas', icon: 'place', link: '/zonas'},
        {title: 'Regions', icon: 'place', link: '/regions'}
      ]
    }
  },
  methods: {
    logout () {
      this.$alert.dialog('¿Desea salir del sistema?')
        .onOk(() => {
          this.$store.isLogged = false
          this.$store.user = {}
          localStorage.removeItem('tokenEducation')
          this.$router.push('/login')
        })
    },
    toggleLeftDrawer () {
      this.leftDrawerOpen = !this.leftDrawerOpen
    }
  },
  computed: {
    rutaActual () {
      return this.$route.path
    }
  }
}
</script>
<style>
.menu{
  background-color: #1976D2;
  border-radius: 10px;
  margin: 5px;
  padding: 5px
}
</style>
