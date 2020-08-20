import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireObject,
  AngularFireList  
} from '@angular/fire/database';

import {User} from '../Modelos/Usuario';
import {Pedido} from '../Modelos/Pedido';
import {Usuario} from '../Modelos/UsuarioDB';
import { Observable } from 'rxjs';
import { map, first } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class RealtimeDBSerService {
  
  itemsRef: AngularFireList<any>;
  public items: Observable<any>;
  constructor(private db: AngularFireDatabase) { 

    
    this.itemsRef = db.list('Usuarios');
    // Use snapshotChanges().map() to store the key
    this.items = this.itemsRef.snapshotChanges().pipe(
      map(changes => 
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );
    console.log(this.itemsRef);
    console.log(this.items);
  }

  //Crea un nuevo gato
  public createNewUser(data: User,ofterData) {
    let item={UID:data.uid,
      Email:data.email,
      Cedula:ofterData.Cedula,
      Nombres:ofterData.Nombres,
      Establecimiento:ofterData.Establecimiento,
      Direccion:ofterData.Direccion,
      Rol:'CLIENTE'
    }
    /*
   const r= this.itemsRef.push(item);
   console.log(r);*/
    let  itemRefU= this.db.object('Usuarios/'+item.UID);
    itemRefU.set(item);
    return item;

   // this.itemRef.set({ name: newName });
  }
  
  public getUsrUID(uid:string){
    let  itemRefU= this.db.object<Usuario>('Usuarios/'+uid);
    return itemRefU.valueChanges().pipe(first()).toPromise();
  }
  public getPedidoID(id:string){
    let  itemRefU= this.db.object<Pedido>('Pedidos/'+id);
    return itemRefU.valueChanges().pipe(first()).toPromise();
  }
  
  public ListaProductos(uid:string) {
    let refL = this.db.list('Pedidos');
    // Use snapshotChanges().map() to store the key
    return refL.valueChanges().pipe(first()).toPromise();
  }


}
