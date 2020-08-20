import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ListPedidosComponent} from './pages/list-pedidos/list-pedidos.component';
import {NewPedidoComponent} from './pages/new-pedido/new-pedido.component';
import {PetPedidoComponent} from './pages/pet-pedido/pet-pedido.component';
import {ListPedidosAdminComponent} from './pages/list-pedidos-admin/list-pedidos-admin.component';
import {AsignarPedidosAdminComponent} from './pages/asignar-pedidos-admin/asignar-pedidos-admin.component';
import {ListaRepartidorComponent} from './pages/lista-repartidor/lista-repartidor.component';
import {DetalleEntRepartidorComponent} from './pages/detalle-ent-repartidor/detalle-ent-repartidor.component';
import {ProductosComponent} from './pages/productos/productos.component';
import {RepartidoresComponent} from './pages/repartidores/repartidores.component';
import {ResumenComponent} from './pages/resumen/resumen.component';
const routes: Routes = [
  
  { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  {path:'LisPedidos',component:ListPedidosComponent},
  {path:'NewPedido',component:NewPedidoComponent},
  {path:'DetPedido/:id',component:PetPedidoComponent},
  {path:'ListaPedAdmin',component:ListPedidosAdminComponent},
  {path:'AsignarPedido/:id',component:AsignarPedidosAdminComponent},
  {path:'ListaRepartidor',component:ListaRepartidorComponent},
  {path:'DetalleEntrega/:id',component:DetalleEntRepartidorComponent},
  {path:'Productos',component:ProductosComponent},
  {path:'Repartidores',component:RepartidoresComponent},
  {path:'Resumen',component:ResumenComponent},
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
//{ path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule) }, 
//{ path: 'register', loadChildren: () => import('./pages/register/register.module').then(m => m.RegisterModule) }
//
/**7
 * 
 * {
    path:'',
    redirectTo:'/home',
    pathMatch:'full'
  },
 * 
 * 
 */