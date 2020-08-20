import { Component, OnInit, Inject } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireAction } from '@angular/fire/database';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, first, switchMap } from 'rxjs/operators';
import { AuthSerService } from 'src/app/services/auth-ser.service';
import { RealtimeDBSerService } from 'src/app/services/realtime-dbser.service';
import { SESSION_STORAGE, StorageService } from 'ngx-webstorage-service';
import { Usuario } from '../../Modelos/UsuarioDB';
import { Router } from '@angular/router';

@Component({
  selector: 'app-resumen',
  templateUrl: './resumen.component.html',
  styleUrls: ['./resumen.component.css']
})
export class ResumenComponent implements OnInit {

 
  items$: Observable<AngularFireAction<firebase.database.DataSnapshot>[]>;
  size$: BehaviorSubject<string | null>;
  uid;
  constructor(@Inject(SESSION_STORAGE) private storage: StorageService,
    db: AngularFireDatabase, private authSer: AuthSerService,
    public dbSer: RealtimeDBSerService,
    public router: Router) {

    this.uid = storage.get('uid');
    this.size$ = new BehaviorSubject(null);
    this.items$ = this.size$.pipe(
      switchMap(size =>
        db.list('Pedidos', ref =>
          size ? ref.orderByChild('Estado').equalTo(size) : ref

        ).snapshotChanges()
      )
    );
    console.log(this.items$);
  }
  listFiltrada: any = [];
  async ngOnInit() {
    let us: Promise<Usuario> = this.dbSer.getUsrUID(this.uid);
    if ((await us).Rol != 'ADMINISTRADOR') {
      this.router.navigate(['/home']);
    }
    this.filtrar('');

  }
  filtrar(IdProducto: string) {
    this.items$.subscribe(queriedItems => {
      console.log(queriedItems);
      this.listFiltrada = [];
      for (let index = 0; index < queriedItems.length; index++) {
        //queriedItems[index].payload.val().Estado
        let lProductos=queriedItems[index].payload.val().Productos;
        console.log('productos',lProductos);
          for(let i=0;i<lProductos.length;i++){
            console.log('for lpro',lProductos[i]);
              this.añadir(lProductos[i]);
            
            
          }

        // this.listFiltrada.push(a);


      }
      console.log('filtrada',this.listFiltrada);
    });

  }
  total=0;
  añadir(p){
    console.log('p',p)
    for(let i=0;i<this.listFiltrada.length;i++){
      if(this.listFiltrada[i].Id==p.Id){
        this.listFiltrada[i].Cantidad+=p.Cantidad;
        this.listFiltrada[i].subTotal+=p.subTotal;
        this.total+=p.subTotal;
        return;
      }
    }
    this.listFiltrada.push(p);
    this.total+=p.subTotal;
  }
  filterBy(size: string | null) {
    this.size$.next(size);
  }


}
