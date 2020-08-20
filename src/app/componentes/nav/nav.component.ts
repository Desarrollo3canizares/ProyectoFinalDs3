import { Component, OnInit, Inject } from '@angular/core';
import {AuthSerService} from '../../services/auth-ser.service';
import { Usuario } from 'src/app/Modelos/UsuarioDB';
import { RealtimeDBSerService } from 'src/app/services/realtime-dbser.service';
import { SESSION_STORAGE, StorageService } from 'ngx-webstorage-service';
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  Cliente=false;
  Administrador=false;
  Repartidor=false;
  Rol='';
  constructor(@Inject(SESSION_STORAGE) private storage: StorageService,
  public dbSer:RealtimeDBSerService,private authSer:AuthSerService) { }
  nombre='Usuario';
  async ngOnInit() {
    const usr =await this.authSer.getCurrentUser();
    if(usr){
      this.mostarGraper(true);
      let us:Promise<Usuario>= this.dbSer.getUsrUID(usr.uid);
      this.storage.set('uid',usr.uid)
      console.log('uid',usr.uid);
      //this.storage.set('Usuario',it);
      console.log('usuario error',(await us).Rol,us);
      try {
        this.Rol=(await us).Rol;
      this.nombre=(await us).Email;
      } catch (error) {
        console.log(error);
      }
      this.Rol=(await us).Rol;
      this.nombre=(await us).Email;
      if(this.Rol=='CLIENTE'){
        this.Cliente=true;
        this.Administrador=false;
        this.Repartidor=false;
      }
      if(this.Rol=='ADMINISTRADOR'){
        this.Cliente=false;
        this.Administrador=true;
        this.Repartidor=false;
        
      }
      if(this.Rol=='REPARTIDOR'){
        this.Cliente=false;
        this.Administrador=false;
        this.Repartidor=true;
      }
      
    }else{
      this.mostarLogin(true);
    }
   



  }
  clkSalir(){
    console.log('clk salir');
    this.authSer.logout();
    this.mostarLogin(true);
    this.mostarGraper(false)
  }
  mostarLogin(b:boolean){
    if(b){
      (<HTMLDivElement>document.getElementById('wrapper')).style.display='none';
      (<HTMLDivElement>document.getElementById('login')).style.display='block';
      (<HTMLDivElement>document.getElementById('register')).style.display='none';
    }else{
     // (<HTMLDivElement>document.getElementById('wrapper')).style.display='none';
      (<HTMLDivElement>document.getElementById('login')).style.display='none';
     // (<HTMLDivElement>document.getElementById('register')).style.display='none';
    }
  }
  mostarGraper(b:boolean){
    if(b){
      (<HTMLDivElement>document.getElementById('wrapper')).style.display='block';
      (<HTMLDivElement>document.getElementById('login')).style.display='none';
      (<HTMLDivElement>document.getElementById('register')).style.display='none';
    }else{
      (<HTMLDivElement>document.getElementById('wrapper')).style.display='none';
      //(<HTMLDivElement>document.getElementById('login')).style.display='none';
     // (<HTMLDivElement>document.getElementById('register')).style.display='none';
    }
  }
  mostarRegister(b:boolean){
    if(b){
      (<HTMLDivElement>document.getElementById('wrapper')).style.display='none';
      (<HTMLDivElement>document.getElementById('login')).style.display='none';
      (<HTMLDivElement>document.getElementById('register')).style.display='block';
    }else{
      //(<HTMLDivElement>document.getElementById('wrapper')).style.display='none';
      //(<HTMLDivElement>document.getElementById('login')).style.display='none';
      (<HTMLDivElement>document.getElementById('register')).style.display='none';
    }
  }
}
