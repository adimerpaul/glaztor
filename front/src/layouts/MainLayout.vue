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
        <q-item-label
          header
        >
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
    // caption: 'github.com/quasarframework',
    icon: 'home',
    link: '/'
  },
  {
    title: 'Preventas',
    // caption: 'github.com/quasarframework',
    icon: 'local_mall',
    link: '/preventas'
  },
  {
    title: 'Pedidos',
    // caption: 'quasar.dev',
    icon: 'shopping_cart',
    link: '/pedidos'
  },
  {
    title: 'Clientes',
    // caption: 'quasar.dev',
    icon: 'person_add',
    link: '/clientes'

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
