import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';




import {environment} from '../environments/environment';
import { NavComponent } from './componentes/nav/nav.component';

import { LoginComponent} from './pages/login/login.component';
import { RegisterComponent} from './pages/register/register.component';



import {AngularFireModule} from '@angular/fire';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import { ListPedidosComponent } from './pages/list-pedidos/list-pedidos.component';
import { NewPedidoComponent } from './pages/new-pedido/new-pedido.component';
import { PetPedidoComponent } from './pages/pet-pedido/pet-pedido.component';
import { ListaRepartidorComponent } from './pages/lista-repartidor/lista-repartidor.component';
import { DetalleEntRepartidorComponent } from './pages/detalle-ent-repartidor/detalle-ent-repartidor.component';
import { ListPedidosAdminComponent } from './pages/list-pedidos-admin/list-pedidos-admin.component';
import { AsignarPedidosAdminComponent } from './pages/asignar-pedidos-admin/asignar-pedidos-admin.component';
import { ListProductosAdminComponent } from './pages/list-productos-admin/list-productos-admin.component';
import { ProductosComponent } from './pages/productos/productos.component';
import { RepartidoresComponent } from './pages/repartidores/repartidores.component';
import { ResumenComponent } from './pages/resumen/resumen.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
   
    LoginComponent,
    RegisterComponent,
    ListPedidosComponent,
    NewPedidoComponent,
    PetPedidoComponent,
    ListaRepartidorComponent,
    DetalleEntRepartidorComponent,
    ListPedidosAdminComponent,
    AsignarPedidosAdminComponent,
    ListProductosAdminComponent,
    ProductosComponent,
    RepartidoresComponent,
    ResumenComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
   AngularFireAuthModule,
   AngularFireDatabaseModule
  ],
  providers: [
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
