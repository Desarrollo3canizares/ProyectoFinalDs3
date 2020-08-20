import { Component, OnInit, Inject } from '@angular/core';
import { AuthSerService } from '../../services/auth-ser.service';
import { User } from '../../Modelos/Usuario';
import { RealtimeDBSerService } from '../../services/realtime-dbser.service';
import { SESSION_STORAGE, StorageService } from 'ngx-webstorage-service';
import { of } from 'rxjs';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(@Inject(SESSION_STORAGE) private storage: StorageService,
    private authSer: AuthSerService, private dbSer: RealtimeDBSerService) { }

  ngOnInit(): void {
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
  async clicRegistrar() {
    var Usuario = (<HTMLInputElement>document.getElementById('txtEmailReg')).value;
    var Pass1 = (<HTMLInputElement>document.getElementById('txtPass1Reg')).value;
    var Pass2 = (<HTMLInputElement>document.getElementById('txtPass2Reg')).value;
    var Ced = (<HTMLInputElement>document.getElementById('txtECedulaReg')).value;
    var Nom = (<HTMLInputElement>document.getElementById('txtENombreReg')).value;
    var Empr = (<HTMLInputElement>document.getElementById('txtEEstablecimientoReg')).value;
    var Direc = (<HTMLInputElement>document.getElementById('txtEDireccionReg')).value;
    let ofter = {
      Cedula: Ced,
      Nombres: Nom,
      Establecimiento: Empr,
      Direccion: Direc
    }

    if (Pass1 != Pass2) {
      alert('Las contraseñas no coinciden');
    } else {
      if (this.controlar(ofter)) {
        try {
          const user = await this.authSer.register(Usuario, Pass1);

          if (user) {
            this.checkUserIsVerified(user, ofter);
          } else {
            alert('Error al intentar registrar');
          }
        } catch (error) {
          console.log(error);
        }
      }

    }
  }
  controlar(data) {
    if (data.Cedula.length == 0) {
      alert('Ingrese Cedula');
      return false;
    }
    if (data.Nombres.length == 0) {
      alert('Ingrese Nombre');
      return false;
    }
    if (data.Establecimiento.length == 0) {
      alert('Ingrese nombre del establecimiento');
      return false;
    }
    if (data.Direccion.length == 0) {
      alert('Ingrese direcion');
      return false;
    }
    return true;
  }
  private checkUserIsVerified(user: User, ofter) {
    if (user && user.emailVerified) {
      this.mostarGraper(false);
      this.mostarLogin(true);
      this.mostarRegister(false);
      let it = this.dbSer.createNewUser(user, ofter);
      this.storage.set('Usuario', it);
    } else if (user) {
      this.mostarGraper(false);
      this.mostarLogin(true);
      this.mostarRegister(false);
      let it = this.dbSer.createNewUser(user, ofter);

      this.storage.set('Usuario', it);
      this.authSer.sendVerificationEmail();
      this.authSer.logout();
      alert('Registro exitoso');
    } else {
      this.mostarGraper(false);
      this.mostarLogin(false);
      this.mostarRegister(true);
    }
    (<HTMLInputElement>document.getElementById('txtEmailReg')).value = '';
    (<HTMLInputElement>document.getElementById('txtPass1Reg')).value = '';
    (<HTMLInputElement>document.getElementById('txtPass2Reg')).value = '';
  }
}
