const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: 'pedidos', component: () => import('src/pages/pedidos/Pedidos.vue') },
      { path: 'pedidotrailers', component: () => import('src/pages/pedidotrailers/Pedidotrailer.vue') },
      { path: 'preventas', component: () => import('pages/preventas/Preventa.vue') },
      { path: 'clientes', component: () => import('pages/clientes/Cliente.vue') },
      { path: 'ejecutivos', component: () => import('pages/ejecutivos/Ejecutivo.vue') },
      { path: 'productos', component: () => import('pages/productos/Producto.vue') },
      { path: 'cargos', component: () => import('pages/cargos/Cargo.vue') },
      { path: 'zonas', component: () => import('pages/zonas/Zona.vue') },
      { path: 'regions', component: () => import('pages/regions/Region.vue') },
    ]
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes