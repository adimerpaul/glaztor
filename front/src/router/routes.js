const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue'), meta: { requiresAuth: true } },
      { path: 'pedidos', component: () => import('src/pages/pedidos/Pedidos.vue'), meta: { requiresAuth: true } },
      { path: 'pedidotrailers', component: () => import('src/pages/pedidotrailers/Pedidotrailer.vue'), meta: { requiresAuth: true } },
      { path: 'preventas', component: () => import('pages/preventas/Preventa.vue'), meta: { requiresAuth: true } },
      { path: 'clientes', component: () => import('pages/clientes/Cliente.vue'), meta: { requiresAuth: true } },
      { path: 'ejecutivos', component: () => import('pages/ejecutivos/Ejecutivo.vue'), meta: { requiresAuth: true } },
      { path: 'productos', component: () => import('pages/productos/Producto.vue'), meta: { requiresAuth: true } },
      { path: 'cargos', component: () => import('pages/cargos/Cargo.vue'), meta: { requiresAuth: true } },
      { path: 'zonas', component: () => import('pages/zonas/Zona.vue'), meta: { requiresAuth: true } },
      { path: 'regions', component: () => import('pages/regions/Region.vue'), meta: { requiresAuth: true } },
      { path: 'users', component: () => import('pages/usuarios/Usuarios.vue'), meta: { requiresAuth: true } },
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
