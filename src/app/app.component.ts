import { Component,OnInit, Inject } from '@angular/core';
//import { SESSION_STORAGE, StorageService } from 'ngx-webstorage-service';
import { Router } from '@angular/router';
import {AuthSerService} from './services/auth-ser.service';
import {RealtimeDBSerService} from './services/realtime-dbser.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {
  title = 'ProyDesarrollo3';
  //@Inject(SESSION_STORAGE) private storage: StorageService
  constructor(
  public router: Router,
  public authSer:AuthSerService,
  public dbSer:RealtimeDBSerService){}
  async ngOnInit() {
    const usr =await this.authSer.getCurrentUser();
    //let it= this.dbSer.getUsrUID(usr.uid);
    //this.storage.set('Usuario',it);
    //console.log('usr',it);
    if(usr){
      this.mostarGraper(true);
    }else{
      this.mostarLogin(true);
    }

    
    



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

