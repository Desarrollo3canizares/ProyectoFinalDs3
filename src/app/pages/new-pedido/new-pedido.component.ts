import { Component, OnInit, Inject } from '@angular/core';
import { AngularFireDatabase, AngularFireList ,AngularFireAction,AngularFireObject} from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SESSION_STORAGE, StorageService } from 'ngx-webstorage-service';
import { Router } from '@angular/router';
import {Usuario} from '../../Modelos/UsuarioDB';
import {RealtimeDBSerService} from '../../services/realtime-dbser.service';
@Component({
  selector: 'app-new-pedido',
  templateUrl: './new-pedido.component.html',
  styleUrls: ['./new-pedido.component.css']
})
export class NewPedidoComponent implements OnInit {
  fecha='';
  total=0;
  itemsRef: AngularFireList<any>;
  items: Observable<any[]>;
  ListaProductosPedido:any=[];
  uid='';
  constructor(@Inject(SESSION_STORAGE) private storage: StorageService,
  public db: AngularFireDatabase,
  public dbSer:RealtimeDBSerService,
  public router: Router) { 
    this.itemsRef = db.list('Productos');
    // Use snapshotChanges().map() to store the key
    this.items = this.itemsRef.snapshotChanges().pipe(
      map(changes => 
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );
  }

  async ngOnInit(){
    var date = new Date();
    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();
    var minutes = date.getMinutes();
    var hours = date.getHours();
    var seconds = date.getSeconds();
    this.fecha = year + "-" + (monthIndex + 1) + "-" + day;
    this.uid= this.storage.get('uid');
    let us: Promise<Usuario> = this.dbSer.getUsrUID(this.uid);
    if ((await us).Rol != 'CLIENTE') {
      this.router.navigate(['/home']);
    }
    
    
  }
  AnadirProductoPedido(nombre:string,precio:number,id:string){
    let cant=Number.parseFloat((<HTMLInputElement>document.getElementById('txtCantidadModal')).value.toString());
    let p={Nombre:nombre,Precio:precio,Id:id,subTotal:precio*cant,Cantidad:cant}
    this.total+=precio*cant;
    
    for (let index = 0; index < this.ListaProductosPedido.length; index++) {
      if(this.ListaProductosPedido[index].Id==p.Id){
        this.ListaProductosPedido[index].Cantidad+=p.Cantidad;
        this.ListaProductosPedido[index].subTotal+=p.subTotal;
        return ;
      }
      
    }
    this.ListaProductosPedido.push(p);
    (<HTMLInputElement>document.getElementById('txtCantidadModal')).value='1';
    
  }
  eliminar(id:string){
    for (let index = 0; index < this.ListaProductosPedido.length; index++) {
      if(this.ListaProductosPedido[index].Id==id){
        this.total=this.total -this.ListaProductosPedido[index].subTotal;
        this.ListaProductosPedido.splice(index, 1);
        return ;
      }
      
    }
    
  }
  guardar(){
    let ptotal=this.ListaProductosPedido.length;
    if(ptotal>0){
      let d={
        Estado: 
        "ENVIADO",
        Fecha: this.fecha,
        Productos:this.ListaProductosPedido,
        Repartidor:
        1,
        Total: 
        this.total,
        Uid: this.uid}
      this.db.list('Pedidos').push(d);

        this.limpiar();
        this.router.navigate(['/LisPedidos']);
    }else{
      alert('Añada productos');
    }
  }
  limpiar(){
    this.ListaProductosPedido=[];
    this.total=0;
  }

}
