import { Component, OnInit, Inject } from '@angular/core';
import { AuthSerService } from '../../services/auth-ser.service';
import { User } from '../../Modelos/Usuario';
import { SESSION_STORAGE, StorageService } from 'ngx-webstorage-service';
import { RealtimeDBSerService } from '../../services/realtime-dbser.service';
import { Router } from '@angular/router';
import { Usuario } from '../../Modelos/UsuarioDB';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(@Inject(SESSION_STORAGE) private storage: StorageService,
    private authSer: AuthSerService, private dbSer: RealtimeDBSerService
    , public router: Router) { }

  async ngOnInit() {
    const usr =await this.authSer.getCurrentUser();
    console.log('u',usr);
    if(usr==null){
      this.mostarLogin(true);
      console.log('login');
    }else{
      this.mostarGraper(true);
      console.log('true');
    }
  }

  async clkLogin() {
    var Usuario = (<HTMLInputElement>document.getElementById('txtEmailLog')).value;
    var Pass1 = (<HTMLInputElement>document.getElementById('txtPassLog')).value;

    try {
      const user = await this.authSer.login(Usuario, Pass1);
      console.log(user);
      if (user) {
        this.checkUserIsVerified(user);
      } else {
        alert('usuario u contraseña invalidos');
      }
    } catch (error) {
      console.log(error);
    }

  }
  async checkUserIsVerified(user: User) {
    if (user && user.emailVerified) {
      this.mostarGraper(true);
      this.mostarLogin(false);
      this.mostarRegister(false);
      //let it= this.dbSer.getUsrUID(user.uid);
      this.storage.set('uid', user.uid);

      this.router.navigate(['/home']);
      console.log('1');
      location.reload();
    } else if (user) {
      this.storage.set('uid', user.uid);
      
      let us: Promise<Usuario> = this.dbSer.getUsrUID(user.uid);
      if ((await us).Rol != 'ADMINISTRADOR') {
        let u = confirm('Primero confirma tu email para ingresar\n Aceptar para renviar el correo');
        if (u) {
          this.authSer.sendVerificationEmail();
        }
        this.authSer.logout();

      } else {
        this.mostarGraper(true);
        this.mostarLogin(false);
        this.mostarRegister(false);
        console.log('2');
        this.router.navigate(['/home']);
        location.reload();
      }

    } else {
      this.mostarGraper(false);
      this.mostarLogin(false);
      this.mostarRegister(true);
      location.reload();
    }
    (<HTMLInputElement>document.getElementById('txtEmailLog')).value = '';
    (<HTMLInputElement>document.getElementById('txtPassLog')).value = '';
  }
  mostarLogin(b: boolean) {
    if (b) {
      (<HTMLDivElement>document.getElementById('wrapper')).style.display = 'none';
      (<HTMLDivElement>document.getElementById('login')).style.display = 'block';
      (<HTMLDivElement>document.getElementById('register')).style.display = 'none';
    } else {
      // (<HTMLDivElement>document.getElementById('wrapper')).style.display='none';
      (<HTMLDivElement>document.getElementById('login')).style.display = 'none';
      // (<HTMLDivElement>document.getElementById('register')).style.display='none';
    }
  }
  mostarGraper(b: boolean) {
    if (b) {
      (<HTMLDivElement>document.getElementById('wrapper')).style.display = 'block';
      (<HTMLDivElement>document.getElementById('login')).style.display = 'none';
      (<HTMLDivElement>document.getElementById('register')).style.display = 'none';
    } else {
      (<HTMLDivElement>document.getElementById('wrapper')).style.display = 'none';
      //(<HTMLDivElement>document.getElementById('login')).style.display='none';
      // (<HTMLDivElement>document.getElementById('register')).style.display='none';
    }
  }
  mostarRegister(b: boolean) {
    if (b) {
      (<HTMLDivElement>document.getElementById('wrapper')).style.display = 'none';
      (<HTMLDivElement>document.getElementById('login')).style.display = 'none';
      (<HTMLDivElement>document.getElementById('register')).style.display = 'block';
    } else {
      //(<HTMLDivElement>document.getElementById('wrapper')).style.display='none';
      //(<HTMLDivElement>document.getElementById('login')).style.display='none';
      (<HTMLDivElement>document.getElementById('register')).style.display = 'none';
    }
  }
}
