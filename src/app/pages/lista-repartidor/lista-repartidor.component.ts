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
  selector: 'app-lista-repartidor',
  templateUrl: './lista-repartidor.component.html',
  styleUrls: ['./lista-repartidor.component.css']
})
export class ListaRepartidorComponent implements OnInit {

  
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
    if ((await us).Rol != 'REPARTIDOR') {
      this.router.navigate(['/home']);
    }
    this.filtrar('');

  }
  filtrar(est: string) {
    this.items$.subscribe(queriedItems => {
      console.log(queriedItems);
      this.listFiltrada = [];
      for (let index = 0; index < queriedItems.length; index++) {
        let a = {
          User: this.dbSer.getUsrUID(queriedItems[index].payload.val().Uid),
          data: queriedItems[index]
        }
        if (est.length != 0) {


          if (queriedItems[index].payload.val().Estado == est &&queriedItems[index].payload.val().Repartidor==this.uid) {

            this.listFiltrada.push(a);
          }
        } else {
          if(queriedItems[index].payload.val().Repartidor==this.uid){
            this.listFiltrada.push(a);
          }
          
        }
        // this.listFiltrada.push(a);


      }
      console.log(this.listFiltrada);
    });

  }
  filterBy(size: string | null) {
    this.size$.next(size);
  }

}
