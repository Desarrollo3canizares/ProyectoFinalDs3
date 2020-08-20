import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RealtimeDBSerService } from 'src/app/services/realtime-dbser.service';
import { Pedido } from '../../Modelos/Pedido';
import { AngularFireDatabase, AngularFireList, AngularFireAction } from '@angular/fire/database';
import { Observable, BehaviorSubject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Usuario } from 'src/app/Modelos/UsuarioDB';
import { StorageService, SESSION_STORAGE } from 'ngx-webstorage-service';

@Component({
  selector: 'app-asignar-pedidos-admin',
  templateUrl: './asignar-pedidos-admin.component.html',
  styleUrls: ['./asignar-pedidos-admin.component.css']
})
export class AsignarPedidosAdminComponent implements OnInit {
  items$: Observable<AngularFireAction<firebase.database.DataSnapshot>[]>;
  size$: BehaviorSubject<string | null>;
  constructor(public db: AngularFireDatabase,
    private rutaActiva: ActivatedRoute, public dbSer: RealtimeDBSerService,
    public router: Router,
    @Inject(SESSION_STORAGE) private storage: StorageService) {

    this.size$ = new BehaviorSubject(null);
    this.items$ = this.size$.pipe(
      switchMap(size =>
        db.list('Usuarios', ref =>
          size ? ref.orderByChild('Rol').equalTo(size) : ref

        ).snapshotChanges()
      )
    );

  }
  id = '';
  uuid='';
  fecha = '';
  total = 0;
  listaDetalle: any = [];
  cliente;
  listFiltrada = [];
  NombreRepartidor='';
  CedulaRepartidor='';
  KeyRepartidor='';
  uidCU;
  async ngOnInit() {
    this.id = this.rutaActiva.snapshot.params.id;
    console.log('id', this.id);
    let us: Promise<Pedido> = this.dbSer.getPedidoID(this.id);
    this.fecha = (await us).Fecha;
    
    this.total = Number.parseFloat((await us).Total);
    this.listaDetalle = (await us).Productos;
    this.cliente = this.dbSer.getUsrUID((await us).Uid);
    this.uuid=(await us).Uid;
    let repartidor: Promise<Usuario> = this.dbSer.getUsrUID((await us).Repartidor);
    
    
    try {
      this.NombreRepartidor=(await repartidor).Nombres;
    this.CedulaRepartidor=(await repartidor).Cedula;
    this.KeyRepartidor=(await repartidor).UID;
    } catch (error) {
      
    }
    this.uidCU = this.storage.get('uid');
    let Cus: Promise<Usuario> = this.dbSer.getUsrUID(this.uidCU);
    if ((await Cus).Rol != 'ADMINISTRADOR') {
      this.router.navigate(['/home']);
    }
    let ent=(await us).Estado;
    if(ent=='ENTREGADO'){
      (<HTMLButtonElement>document.getElementById('btnEntregar')).disabled=true;
    }
    ///
    this.filtrar('');

  }

  filtrar(est: string) {
    this.items$.subscribe(queriedItems => {
      console.log(queriedItems);
      this.listFiltrada = [];
      for (let index = 0; index < queriedItems.length; index++) {
        
       

          
          if (queriedItems[index].payload.val().Rol == 'REPARTIDOR') {

            this.listFiltrada.push(queriedItems[index]);
          }
        
        // this.listFiltrada.push(a);


      }
      console.log(this.listFiltrada);
    });

  }
  asignar(nom:string,cedu:string,ke:string){
    this.NombreRepartidor=nom;
    this.CedulaRepartidor=cedu;
    this.KeyRepartidor=ke;
  }

  guardar(){
    if(this.KeyRepartidor.length>0){
     

      this.db.list('Pedidos').update(this.id,{ Repartidor: this.KeyRepartidor,Estado:'ASIGNADO'});
      this.router.navigate(['/ListaPedAdmin']);
    }else{
      alert('Seleccione un repartidor');
    }
    
  }



}
