const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: 'pedidos', component: () => import('src/pages/pedidos/Pedidos.vue') },
      { path: 'preventas', component: () => import('pages/preventas/Preventa.vue') },
      { path: 'clientes', component: () => import('pages/clientes/Clientes.vue') },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
