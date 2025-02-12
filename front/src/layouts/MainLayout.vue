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
<!--            <q-btn-->
<!--              no-caps-->
<!--              icon="o_notifications"-->
<!--              aria-label="Notificaciones"-->
<!--              @click="openNotifications"-->
<!--              class="icon-hover"-->
<!--            />-->
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
        <q-item
          v-for="link in filteredLinks"
          :key="link.title"
          clickable
          :to="link.link"
          exact
          class="text-grey"
          active-class="menu"
          dense
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
          <q-menu v-if="link.subMenu" fit anchor="top end">
            <q-list class="bg-primary text-white">
              <q-item
                v-for="subLink in link.subMenu"
                :key="subLink.title"
                clickable
                :to="subLink.link"
                exact
                class="text-grey"
                active-class="menu"
                dense
              >
                <q-item-section avatar>
                  <q-icon
                    :name="$route.path === subLink.link ? 'o_' + subLink.icon : subLink.icon"
                    :class="$route.path === subLink.link ? 'text-white' : 'text-grey'"
                    class="icon-hover"
                  />
                </q-item-section>
                <q-item-section>
                  <q-item-label :class="$route.path === subLink.link ? 'text-white text-bold' : ''">
                    {{ subLink.title }}
                  </q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-menu>
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
import { QSpinnerHourglass } from 'quasar';

export default {
  name: 'MainLayout',
  data () {
    return {
      leftDrawerOpen: false,
      linksList: [
        {title: 'Fierro', icon: 'fa-solid fa-atom', can: ['Admin','Administrador', 'Director', 'Ventas','Cobranza','Supervisor'],
          subMenu: [
            {title: 'Reportes', icon: 'bar_chart', link: '/reportes', can: ['Admin','Administrador', 'Director', 'Ventas','Cobranza','Supervisor']},
            {title: 'Prospección', icon: 'local_offer', link: '/preventas', can: ['Admin','Administrador', 'Director', 'Ventas','Cobranza','Supervisor']},
            {title: 'Cotizacion', icon: 'insert_drive_file', link: '/cotizacions', can: ['Admin','Administrador', 'Director', 'Ventas','Cobranza','Supervisor']},
            {title: 'Pedidos', icon: 'shopping_cart', link: '/pedidos', can: ['Admin','Administrador', 'Director', 'Ventas','Cobranza','Supervisor']},
            {title: 'Pagos', icon: 'attach_money', link: '/pagos', can: ['Admin','Administrador', 'Director', 'Ventas','Cobranza','Supervisor']},
            {title: 'Metas', icon: 'trending_up', link: '/metas', can: ['Admin','Administrador', 'Director','Supervisor','Ventas','Cobranza']},
            {title: 'Productos', icon: 'category', link: '/productos', can: ['Admin','Administrador', 'Director']},
          ]
        },

        {title: 'Cemento', icon: 'fa-brands fa-elementor', can: ['Admin','Administrador', 'Director', 'Ventas','Cobranza','Supervisor'],
          subMenu: [
            {title: 'Reportes', icon: 'bar_chart', link: '/reportes', can: ['Admin','Administrador', 'Director', 'Ventas','Cobranza','Supervisor']},
            {title: 'Prospección', icon: 'local_offer', link: '/preventacementos', can: ['Admin','Administrador', 'Director', 'Ventas','Cobranza','Supervisor']},
            {title: 'Cotizacion', icon: 'insert_drive_file', link: '/cotizacioncementos', can: ['Admin','Administrador', 'Director', 'Ventas','Cobranza','Supervisor']},
            // {title: 'Pedidos', icon: 'shopping_cart', link: '/pedidos', can: ['Admin','Administrador', 'Director', 'Ventas','Cobranza','Supervisor']},
            {title: 'Pedidos', icon: 'shopping_cart', link: '/pedidoCemento', can: ['Admin','Administrador', 'Director', 'Ventas','Cobranza','Supervisor']},
            {title: 'Pagos', icon: 'attach_money', link: '/pagoscemento', can: ['Admin','Administrador', 'Director', 'Ventas','Cobranza','Supervisor']},
            {title: 'Metas', icon: 'trending_up', link: '/metas', can: ['Admin','Administrador', 'Director','Supervisor','Ventas','Cobranza']},
            {title: 'Productos', icon: 'category', link: '/productorCemento', can: ['Admin','Administrador', 'Director']},
          ]
        },
        {title: 'Ladrillo', icon: 'fa-solid fa-cubes', can: ['Admin','Administrador', 'Director', 'Ventas','Cobranza','Supervisor'],
          subMenu: [
            {title: 'Reportes', icon: 'bar_chart', link: '/reportes', can: ['Admin','Administrador', 'Director', 'Ventas','Cobranza','Supervisor']},
            {title: 'Prospección', icon: 'local_offer', link: '/preventaladrillos', can: ['Admin','Administrador', 'Director', 'Ventas','Cobranza','Supervisor']},
            {title: 'Cotizacion', icon: 'insert_drive_file', link: '/cotizacionladrillos', can: ['Admin','Administrador', 'Director', 'Ventas','Cobranza','Supervisor']},
            {title: 'Pedidos', icon: 'shopping_cart', link: '/pedidoLadrillo', can: ['Admin','Administrador', 'Director', 'Ventas','Cobranza','Supervisor']},
            {title: 'Pagos', icon: 'attach_money', link: '/pagos', can: ['Admin','Administrador', 'Director', 'Ventas','Cobranza','Supervisor']},
            {title: 'Metas', icon: 'trending_up', link: '/metas', can: ['Admin','Administrador', 'Director','Supervisor','Ventas','Cobranza']},
            {title: 'Productos', icon: 'category', link: '/productoladrillos', can: ['Admin','Administrador', 'Director']},
          ]
        },
        {title: 'Clientes', icon: 'groups', link: '/clientes', can: ['Admin','Administrador', 'Director', 'Ventas','Cobranza','Supervisor']},
        {title: 'Administración', icon: 'settings', can: ['Admin','Administrador', 'Director'],
          subMenu: [
            {title: 'Personal', icon: 'people_alt', link: '/ejecutivos', can: ['Admin', 'Director']},
            {title: 'Cargos', icon: 'badge', link: '/cargos', can: ['Admin', 'Director']},
            {title: 'Zonas', icon: 'place', link: '/zonas', can: ['Admin','Administrador', 'Director']},
            {title: 'Region', icon: 'public', link: '/regions', can: ['Admin','Administrador', 'Director']},
            {title: 'Nuevo Servicio', icon: 'edit', link: '/newservicios', can: ['Admin', 'Director', 'Cobranza', 'Supervisor']},
            {title: 'Usuarios', icon: 'people', link: '/users', can: ['Admin','Administrador', 'Director']},
          ]
        },
        {title: 'Servicios', icon: 'build', link: '/servicios', can: ['Admin', 'Director', 'Cobranza', 'Supervisor']},
        {title: 'sueldos', icon: 'payments', link: '/sueldos', can: ['Admin', 'Director','Cobranza','Supervisor']},
        {title: 'Resumen Fierro', icon: 'description', link: '/resumen', can: ['Admin', 'Director']},
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
