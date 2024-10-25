<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
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
          Glaztor
        </q-toolbar-title>
        <q-btn color="red" dense label="Salir" no-caps size="10px" icon="logout" aria-label="Logout" @click="logout" />
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      :width="200"
      :breakpoint="500"
      bordered
    >
      <q-list>
        <q-item-label header>
          Essential Links
        </q-item-label>

        <EssentialLink
          v-for="link in linksList"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import EssentialLink from 'components/EssentialLink.vue'

defineOptions({
  name: 'MainLayout'
})

const linksList = [
  {
    title: 'Principal',
    icon: 'home', // Ícono adecuado para página principal
    link: '/'
  },
  {
    title: 'Prospección',
    icon: 'local_offer', // Cambié a 'local_offer' para representar ventas/prospección
    link: '/preventas'
  },
  {
    title: 'Pedidos',
    icon: 'shopping_cart', // Mantengo el ícono para pedidos
    link: '/pedidos'
  },
  {
    title: 'Pedidos de Trailers',
    icon: 'local_shipping', // Ícono más adecuado para trailers
    link: '/pedidotrailers'
  },
  {
    title: 'Clientes',
    icon: 'groups', // Mejor para representar clientes
    link: '/clientes'
  },
  {
    title: 'Personal',
    icon: 'supervisor_account', // Representa ejecutivos o personal
    link: '/ejecutivos'
  },
  {
    title: 'Productos',
    icon: 'inventory', // Ícono adecuado para inventario/productos
    link: '/productos'
  },
  {
    title: 'Cargos',
    icon: 'work', // Ícono relacionado con roles o cargos
    link: '/cargos'
  },
  {
    title: 'Zonas',
    icon: 'place', // Ícono que simboliza áreas o zonas
    link: '/zonas'
  },
]

const leftDrawerOpen = ref(false)

function toggleLeftDrawer () {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

function logout() {
  localStorage.removeItem('token')
  router.push('/login')
}
</script>
