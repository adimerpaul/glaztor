const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue'), meta: { requiresAuth: true } },
      { path: 'reportes', component: () => import('src/pages/reportes/Reporte.vue'), name:'reportes', meta: { requiresAuth: true } },
      { path: 'pedidos', component: () => import('src/pages/pedidos/Pedidos.vue'), name:'pedidos', meta: { requiresAuth: true } },
      { path: 'pagos', component: () => import('src/pages/pagos/Pagos.vue'), name:'pagos', meta: { requiresAuth: true } },
      { path: 'pedidosPage', component: () => import('src/pages/pedidos/PedidosPage.vue'), name:'pedidosPage', meta: { requiresAuth: true } },
      { path: 'pedidotrailers', component: () => import('src/pages/pedidotrailers/Pedidotrailer.vue'), meta: { requiresAuth: true } },
      { path: 'preventas', component: () => import('pages/preventas/Preventa.vue'), meta: { requiresAuth: true } },
      { path: 'cotizacions', component: () => import('pages/cotizacions/Cotizacion.vue'), meta: { requiresAuth: true } },

      { path: 'clientes', component: () => import('pages/clientes/Cliente.vue'), meta: { requiresAuth: true } },
      { path: 'ejecutivos', component: () => import('pages/ejecutivos/Ejecutivo.vue'), meta: { requiresAuth: true } },
      { path: 'productos', component: () => import('pages/productos/Producto.vue'), meta: { requiresAuth: true } },
      { path: 'cargos', component: () => import('pages/cargos/Cargo.vue'), meta: { requiresAuth: true } },
      { path: 'zonas', component: () => import('pages/zonas/Zona.vue'), meta: { requiresAuth: true } },
      { path: 'regions', component: () => import('pages/regions/Region.vue'), meta: { requiresAuth: true } },
      { path: 'users', component: () => import('pages/usuarios/Usuarios.vue'), meta: { requiresAuth: true } },
      { path: 'servicios', component: () => import('pages/administrativos/Servicio.vue'), meta: { requiresAuth: true }  },
      { path: 'cajachicas', component: () => import('pages/administrativos/Cajachica.vue'), meta: { requiresAuth: true }  },
      { path: 'sueldos', component: () => import('pages/administrativos/Sueldo.vue'), meta: { requiresAuth: true }  },
      { path: 'resumen', component: () => import('pages/resumen/Resumen.vue'), meta: { requiresAuth: true }  },
    ]
  },
  {
    path: '/login',
    component: () => import('pages/login/Login.vue'),
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
