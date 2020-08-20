import { Component, OnInit, Inject } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { StorageService, SESSION_STORAGE } from 'ngx-webstorage-service';
import { RealtimeDBSerService } from 'src/app/services/realtime-dbser.service';
declare let $: any;
import {Usuario} from '../../Modelos/UsuarioDB';
import { Router } from '@angular/router';
@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  itemsRef: AngularFireList<any>;
  items: Observable<any[]>;
  itemEdit;
  constructor(db: AngularFireDatabase,@Inject(SESSION_STORAGE) private storage: StorageService,
  public dbSer: RealtimeDBSerService,public router: Router) {
    this.itemsRef = db.list('Productos');
    // Use snapshotChanges().map() to store the key
    this.items = this.itemsRef.snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );
    console.log(this.items);
  }
  uidCU;
  async ngOnInit() {
    this.uidCU = this.storage.get('uid');
    let Cus: Promise<Usuario> = this.dbSer.getUsrUID(this.uidCU);
    if ((await Cus).Rol != 'ADMINISTRADOR') {
      this.router.navigate(['/home']);
    }
  }
  GuardarNewProducto() {
    let nombre = (<HTMLInputElement>document.getElementById('txtNombreNew')).value;
    let precio = (<HTMLInputElement>document.getElementById('txtPrecioNew')).value;
    if (nombre.length > 0 && precio.length > 0 && this.base64textStringG.length > 'data:image/png;base64,'.length) {
      let pro = {
        Nombre: nombre,
        Precio: Number.parseFloat(precio),
        img: this.base64textStringG

      }
      this.itemsRef.push(pro);
      this.limpiar();
      $('#myModal').modal('hide');
    } else {
      alert('Ingrese toda la informacion');
    }
  }
  //imagen
  base64textStringG = '';
  onUploadChange(evt: any) {
    const file = evt.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = this.handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);
    }
  }
  handleReaderLoaded(e) {
    this.base64textStringG = 'data:image/png;base64,' + btoa(e.target.result);
    //console.log(this.base64textStringG);
  }
  selectEdit(item) {
    (<HTMLInputElement>document.getElementById('txtNombreEdit')).value=item.Nombre;
    (<HTMLInputElement>document.getElementById('txtPrecioEdit')).value=item.Precio;
    this.base64textStringG=item.img;
    this.itemEdit=item;
  }
  EditarProductoProducto(){
    let nombre = (<HTMLInputElement>document.getElementById('txtNombreEdit')).value;
    let precio = (<HTMLInputElement>document.getElementById('txtPrecioEdit')).value;
    if (nombre.length > 0 && precio.length > 0 && this.base64textStringG.length > 'data:image/png;base64,'.length) {
      let pro = {
        Nombre: nombre,
        Precio: Number.parseFloat(precio),
        img: this.base64textStringG

      }
     // this.itemsRef.push(pro);
      this.itemsRef.update(this.itemEdit.key, pro);
      this.limpiar();
      $('#myModalEdit').modal('hide');
    } else {
      alert('Ingrese toda la informacion');
    }
  }
  limpiar(){
    (<HTMLInputElement>document.getElementById('txtNombreEdit')).value='';
    (<HTMLInputElement>document.getElementById('txtPrecioEdit')).value='';
    (<HTMLInputElement>document.getElementById('txtNombreNew')).value='';
    (<HTMLInputElement>document.getElementById('txtPrecioNew')).value='';
    this.base64textStringG= 'data:image/png;base64,';

    
  }
  deleteItem(key: string) {
    var r = confirm("Seguro que deseas eliminar este producto");
    if (r == true) {
      this.itemsRef.remove(key);
    }

  }


}
