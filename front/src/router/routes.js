const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: 'pedidos', component: () => import('src/pages/pedidos/Pedidos.vue') },
      { path: 'preventas', component: () => import('pages/preventas/Preventa.vue') },
      { path: 'clientes', component: () => import('pages/clientes/Cliente.vue') },
      { path: 'productos', component: () => import('pages/productos/Producto.vue') },
    ]
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
