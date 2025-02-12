const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue'), meta: { requiresAuth: true } },
      { path: 'reportes', component: () => import('src/pages/reportes/Reporte.vue'), name:'reportes', meta: { requiresAuth: true } },
      { path: 'pedidos', component: () => import('pages/pedidos/Pedidos.vue'), name:'pedidos', meta: { requiresAuth: true } },
      { path: 'pagos', component: () => import('src/pages/pagos/Pagos.vue'), name:'pagos', meta: { requiresAuth: true } },
      { path: 'pedidosPage', component: () => import('pages/pedidos/PedidosPage.vue'), name:'pedidosPage', meta: { requiresAuth: true } },
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
      { path: 'newservicios', component: () => import('pages/administrativos/Newservicio.vue'), meta: { requiresAuth: true } },

      { path: 'cajachicas', component: () => import('pages/administrativos/Cajachica.vue'), meta: { requiresAuth: true }  },
      { path: 'sueldos', component: () => import('pages/administrativos/Sueldo.vue'), meta: { requiresAuth: true }  },
      { path: 'resumen', component: () => import('pages/resumen/Resumen.vue'), meta: { requiresAuth: true }  },
      { path: 'metas', component: () => import('pages/metas/Metas.vue'), meta: { requiresAuth: true }  },
    //   productorCemento
      { path: 'productorCemento', component: () => import('pages/productosCemento/ProductosCemento.vue'), meta: { requiresAuth: true }  },
      { path: 'preventacementos', component: () => import('pages/preventas/Preventacemento.vue'), meta: { requiresAuth: true } },
      { path: 'cotizacioncementos', component: () => import('pages/cotizacions/Cotizacioncemento.vue'), meta: { requiresAuth: true } },


      //   productorlADRILLO
      { path: 'preventaladrillos', component: () => import('pages/preventas/Preventaladrillo.vue'), meta: { requiresAuth: true } },
      { path: 'cotizacionladrillos', component: () => import('pages/cotizacions/Cotizacionladrillo.vue'), meta: { requiresAuth: true } },
      { path: 'productoladrillos', component: () => import('pages/productos/Productoladrillo.vue'), meta: { requiresAuth: true } },

      //  pedidoLadrillo
      { path: 'pedidoLadrillo', component: () => import('pages/pedidosLadrillo/PedidosLadrillos.vue'), meta: { requiresAuth: true } },
      { path: 'pedidosLadrilloPage', component: () => import('pages/pedidosLadrillo/PedidosLadrilloPage.vue'), meta: { requiresAuth: true } },

      // pedidoCemento
      { path: 'pedidoCemento', component: () => import('pages/pedidosCemento/PedidosCementos.vue'), meta: { requiresAuth: true } },
      { path: 'pedidosCementoPage', component: () => import('pages/pedidosCemento/PedidosCementoPage.vue'), meta: { requiresAuth: true } },
    //   pagoscemento
      { path: 'pagoscemento', component: () => import('pages/pedidosCemento/PagosCemento.vue'), meta: { requiresAuth: true } },
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
