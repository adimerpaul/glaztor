<template>
  <q-layout view="hHh Lpr lFf">
    <q-header class="bg-white text-primary" bordered>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Abrir menú"
          @click="toggleLeftDrawer"
        />
        <q-toolbar-title>
          <!-- {{ rutaActual }} -->
        </q-toolbar-title>
        <div>
          <q-btn-group flat>
            <q-btn
              no-caps
              icon="o_notifications"
              aria-label="Notificaciones"
              @click="openNotifications"
              class="icon-hover"
            />
            <q-btn no-caps icon="o_account_circle" aria-label="Perfil">
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
            <q-item-label>
              {{ $store.user.name }}
              <span class="text-bold">{{ $store.user.role }}</span>
            </q-item-label>
          </q-item-section>
        </q-item>
        <q-separator class="bg-white" inset />
        <q-item-label header class="text-white">Opciones</q-item-label>

        <q-item
          v-for="link in filteredLinks"
          :key="link.title"
          clickable
          :to="link.link"
          exact
          class="text-grey"
          active-class="menu"
        >
          <q-item-section avatar>
            <q-icon
              :name="$route.path === link.link ? 'o_' + link.icon : link.icon"
              :class="$route.path === link.link ? 'text-white' : 'text-grey'"
              class="icon-hover"
            />
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
export default {
  name: 'MainLayout',
  data () {
    return {
      leftDrawerOpen: false,
      linksList: [
        {title: 'Principal', icon: 'home', link: '/', can: ['Administrador', 'Gerente', 'Ventas']},
        {title: 'Prospección', icon: 'local_offer', link: '/preventas', can: ['Administrador', 'Gerente', 'Ventas']},
        {title: 'Pedidos', icon: 'shopping_cart', link: '/pedidos', can: ['Administrador', 'Gerente', 'Ventas']},
        {title: 'Pagos', icon: 'payment', link: '/pagos', can: ['Administrador', 'Gerente', 'Ventas']},
        {title: 'Clientes', icon: 'groups', link: '/clientes', can: ['Administrador', 'Gerente', 'Ventas']},
        {title: 'Personal', icon: 'supervisor_account', link: '/ejecutivos', can: ['Administrador', 'Gerente']},
        {title: 'Productos', icon: 'inventory', link: '/productos', can: ['Administrador', 'Gerente']},
        {title: 'Cargos', icon: 'work', link: '/cargos', can: ['Administrador', 'Gerente']},
        {title: 'Zonas', icon: 'place', link: '/zonas', can: ['Administrador', 'Gerente']},
        {title: 'Region', icon: 'place', link: '/regions', can: ['Administrador', 'Gerente']},
        {title: 'Servicios', icon: 'miscellaneous_services', link: '/servicios', can: ['Administrador', 'Gerente']},
       // {title: 'Caja Chica', icon: 'account_balance_wallet', link: '/Cajachicas', can: ['Administrador', 'Gerente']},
        {title: 'Usuarios', icon: 'people', link: '/users', can: ['Administrador']},
      ]
    }
  },
  methods: {
    logout () {
      this.$alert.dialog('¿Desea salir del sistema?')
        .onOk(() => {
          this.$store.isLogged = false
          this.$store.user = {}
          localStorage.removeItem('tokenGlaztor')
          this.$router.push('/login')
        })
    },
    toggleLeftDrawer () {
      this.leftDrawerOpen = !this.leftDrawerOpen
    },
    openNotifications() {
      // Implementar acción para abrir las notificaciones
    }
  },
  computed: {
    rutaActual () {
      return this.$route.path
    },
    filteredLinks() {
      const userRole = this.$store.user?.role;
      if (!userRole) {
        return [];
      }
      return this.linksList.filter(link => link.can.includes(userRole));
    }
  }
}
</script>

<style scoped>
.menu {
  background-color: #1976D2;
  border-radius: 10px;
  margin: 5px;
  padding: 5px;
}
.icon-hover:hover {
  color: #1976D2;
  transition: 0.3s ease;
}
</style>
