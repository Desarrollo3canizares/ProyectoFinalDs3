import { Component, OnInit, Inject } from '@angular/core';
//import { SESSION_STORAGE, StorageService } from 'ngx-webstorage-service';
import {RealtimeDBSerService} from '../services/realtime-dbser.service';
import {AuthSerService} from '../services/auth-ser.service';
import { Observable } from 'rxjs';
import { Usuario } from '../Modelos/UsuarioDB';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
//@Inject(SESSION_STORAGE) private storage: StorageService,
  constructor(
  public dbSer:RealtimeDBSerService,public authSer:AuthSerService) { }
  
  Rol:string;
  
 async ngOnInit() {
    
  }

}
