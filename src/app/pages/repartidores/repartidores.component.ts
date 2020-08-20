import { Component, OnInit, Inject } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Usuario} from '../../Modelos/UsuarioDB';
import { AuthSerService } from 'src/app/services/auth-ser.service';
declare let $: any;
import { StorageService, SESSION_STORAGE } from 'ngx-webstorage-service';
import { RealtimeDBSerService } from 'src/app/services/realtime-dbser.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-repartidores',
  templateUrl: './repartidores.component.html',
  styleUrls: ['./repartidores.component.css']
})

export class RepartidoresComponent implements OnInit {

 
  itemsRef: AngularFireList<any>;
  items: Observable<any[]>;
  itemEdit;
  constructor(public db: AngularFireDatabase,
    private authSer:AuthSerService,
    @Inject(SESSION_STORAGE) private storage: StorageService,
  public dbSer: RealtimeDBSerService,public router: Router) {
    this.itemsRef = db.list('Usuarios');
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
  async GuardarNewProducto() {
    let cedula = (<HTMLInputElement>document.getElementById('txtCedulaNew')).value;
    let nombres = (<HTMLInputElement>document.getElementById('txtNombresNew')).value;
    let email = (<HTMLInputElement>document.getElementById('txtEmailNew')).value;
    let pass = (<HTMLInputElement>document.getElementById('txtPass')).value;
    let passC = (<HTMLInputElement>document.getElementById('txtPassConfir')).value;
    let usr:Usuario={
      Cedula:cedula,
      Direccion:'',
      Email:email,
      Establecimiento:'',
      Nombres:nombres,
      Rol:'REPARTIDOR',
      UID:''
    }
    if (this.validar(usr)){
      if(pass==passC){
        try {
          const user = await this.authSer.register(usr.Email,pass);
          
          if (user) {
            usr.UID=user.uid;
            let  itemRefU= this.db.object('Usuarios/'+usr.UID);
            itemRefU.set(usr);
            $('#myModal').modal('hide');
            this.authSer.sendVerificationEmail();
            this.limpiar();
          }
        } catch (error) {
          console.log(error);
          alert('Error al registrar usuario');
        }
      }else{
        alert('Las contraseñas no coinciden');
      }
     
      
    } 
  }
  validar(usr:Usuario){
    if(usr.Cedula.length==0){
      alert('Ingrese una cedula');
      return false;
    }
    if(usr.Nombres.length==0){
      alert('Ingrese Nombre');
      return false;
    }
    if(usr.Email.length==0){
      alert('Ingrese Email');
      return false;
    }

    return true;
  }
  
  selectEdit(item) {
    (<HTMLInputElement>document.getElementById('txtCedulaEdit')).value=item.Cedula;
    (<HTMLInputElement>document.getElementById('txtNombresEdit')).value=item.Nombres;
    (<HTMLInputElement>document.getElementById('txtEmailedit')).value=item.Email;
    this.itemEdit=item;
  }
  EditarProductoProducto(){
    let nombre = (<HTMLInputElement>document.getElementById('txtNombresEdit')).value;
    let cedula = (<HTMLInputElement>document.getElementById('txtCedulaEdit')).value;
    if (nombre.length > 0 && cedula.length > 0 ) {
      
     // this.itemsRef.push(pro);
      this.itemsRef.update(this.itemEdit.key,{Nombres:nombre,Cedula:cedula});
      $('#myModalEdit').modal('hide');
      this.limpiar();
    } else {
      alert('Ingrese toda la informacion');
    }
  }
  limpiar(){
    /*
    (<HTMLInputElement>document.getElementById('txtNombreEdit')).value='';
    (<HTMLInputElement>document.getElementById('txtPrecioEdit')).value='';
    (<HTMLInputElement>document.getElementById('txtNombreNew')).value='';
    (<HTMLInputElement>document.getElementById('txtPrecioNew')).value='';*/
    
    
  }
  async sendMail(){
   try {
    await this.authSer.resetPassword(this.itemEdit.Email);
    (<HTMLButtonElement>document.getElementById('btnCambio')).disabled=true;
   } catch (error) {
     alert('Error al enviar Email');
   }
    
  }
  deleteItem(key: string) {
    var r = confirm("Seguro que deseas eliminar este producto");
    if (r == true) {
      this.itemsRef.remove(key);
    }

  }

}
