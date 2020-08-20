import { Component, OnInit,AfterViewInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RealtimeDBSerService } from 'src/app/services/realtime-dbser.service';
import { Pedido } from '../../Modelos/Pedido';
import { AngularFireDatabase, AngularFireList, AngularFireAction } from '@angular/fire/database';
import { Observable, BehaviorSubject } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { Usuario } from 'src/app/Modelos/UsuarioDB';
import { AuthSerService } from 'src/app/services/auth-ser.service';
//import { StorageService } from 'ngx-webstorage-service';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-detalle-ent-repartidor',
  templateUrl: './detalle-ent-repartidor.component.html',
  styleUrls: ['./detalle-ent-repartidor.component.css']
})
export class DetalleEntRepartidorComponent implements OnInit {

  items$: Observable<AngularFireAction<firebase.database.DataSnapshot>[]>;
  size$: BehaviorSubject<string | null>;
  //@Inject(sessionStorage) public storage: StorageService,
  constructor(public authSer:AuthSerService,public db: AngularFireDatabase,
    private rutaActiva: ActivatedRoute, public dbSer: RealtimeDBSerService,
    public router: Router) {

    this.size$ = new BehaviorSubject(null);
    this.items$ = this.size$.pipe(
      switchMap(size =>
        db.list('Usuarios', ref =>
          size ? ref.orderByChild('Rol').equalTo(size) : ref

        ).snapshotChanges()
      )
    );

  }
  
  id = '';
  uuid='';
  fecha = '';
  total = 0;
  listaDetalle: any = [];
  cliente;
  usuario;
  repartidor;
  listFiltrada = [];
  NombreRepartidor='';
  CedulaRepartidor='';
  KeyRepartidor='';
  uidCU;
  async ngOnInit() {
    this.id = this.rutaActiva.snapshot.params.id;
    console.log('id', this.id);
    let us: Promise<Pedido> = this.dbSer.getPedidoID(this.id);
    this.fecha = (await us).Fecha;
    
    this.total = Number.parseFloat((await us).Total);
    this.listaDetalle = (await us).Productos;
    
    this.uuid=(await us).Uid;
    
    
    this.usuario=this.dbSer.getUsrUID((await us).Uid);
    this.cliente = this.dbSer.getUsrUID((await us).Uid);
    this.repartidor = this.dbSer.getUsrUID((await us).Repartidor);
    //this.repartidor=this.dbSer.getUsrUID((await us).Repartidor);
    let ent=(await us).Estado;
    if(ent=='ENTREGADO'){
      (<HTMLButtonElement>document.getElementById('btnEntregar')).disabled=true;
    }
    
    try {
      this.NombreRepartidor=this.repartidor.__zone_symbol__value.Nombres;
      this.CedulaRepartidor=this.repartidor.__zone_symbol__value.Cedula;
      this.KeyRepartidor=this.repartidor.__zone_symbol__value.UID;
    } catch (error) {
      console.log(error);
    }
    console.log(this.repartidor,this.usuario);
    const usr =await this.authSer.getCurrentUser();
    //this.uidCU = this.storage.get('uid');
    let Cus: Promise<Usuario> = this.dbSer.getUsrUID(usr.uid);
    if ((await Cus).Rol != 'REPARTIDOR') {
     this.router.navigate(['/home']);
    }
   
    this.filtrar('');

  }

  filtrar(est: string) {
    this.items$.subscribe(queriedItems => {
      console.log(queriedItems);
      this.listFiltrada = [];
      for (let index = 0; index < queriedItems.length; index++) {
        
       

          
          if (queriedItems[index].payload.val().Rol == 'REPARTIDOR') {

            this.listFiltrada.push(queriedItems[index]);
          }
        
        // this.listFiltrada.push(a);


      }
      console.log(this.listFiltrada);
    });

  }
  asignar(nom:string,cedu:string,ke:string){
    this.NombreRepartidor=nom;
    this.CedulaRepartidor=cedu;
    this.KeyRepartidor=ke;
  }

  guardar(){
    var r = confirm("Desea marcar como entregado?");

    if(r){
      

      this.db.list('Pedidos').update(this.id,{ Estado:'ENTREGADO'});
      this.router.navigate(['/ListaRepartidor']);
    }
    
  }
  Verpdf(){
    let documentDefinition = 
    { content: [
      {
        columns: [
          {
            // % width
            width: 225,
            text: ''
          },
          {
            // auto-sized columns have their widths based on their content
            width: 'auto',
            text: 'FACTURA'
          },
          {
            // % width
            width: 225,
            text: ''
          }
        ],
        // optional space between columns
        columnGap: 10
      },
      'Cliente',
      {
        columns: [
          {
            // % width
            width: 100,
            text: 'CI: '
          },
          {
            // auto-sized columns have their widths based on their content
            width: 100,
            text: this.usuario.__zone_symbol__value.Cedula
          },
          {
            // % width
            width: 100,
            text: 'Fecha:'
          },
          {
            // auto-sized columns have their widths based on their content
            width: 100,
            text: this.fecha
          }
        ],
        // optional space between columns
        columnGap: 10
      },
      {
        columns: [
          {
            // % width
            width: 100,
            text: 'Nombre '
          },
          {
            // auto-sized columns have their widths based on their content
            width: 100,
            text: this.usuario.__zone_symbol__value.Nombres
          },
          {
            // % width
            width: 100,
            text: 'Email '
          },
          {
            // auto-sized columns have their widths based on their content
            width: 100,
            text: this.usuario.__zone_symbol__value.Email
          }
        ],
        // optional space between columns
        columnGap: 10
      },
      {
        columns: [
          {
            // % width
            width: 100,
            text: 'Direccion '
          },
          {
            // auto-sized columns have their widths based on their content
            width: 100,
            text: this.usuario.__zone_symbol__value.Direccion
          }
        ],
        // optional space between columns
        columnGap: 10
      },{text:'Repartidor',
      margin: [ 2, 20, 2, 2 ]},
      
      {
        columns: [
          {
            // % width
            width: 100,
            text: 'CI: '
          },
          {
            // auto-sized columns have their widths based on their content
            width: 100,
            text: this.repartidor.__zone_symbol__value.Cedula
          }
        ],
        // optional space between columns
        columnGap: 10
      },
      {
        columns: [
          {
            // % width
            width: 100,
            text: 'Nombre '
          },
          {
            // auto-sized columns have their widths based on their content
            width: 100,
            text: this.repartidor.__zone_symbol__value.Nombres
          }
        ],
        // optional space between columns
        columnGap: 10
      },
      {
        layout: 'lightHorizontalLines', // optional
        table: {
          // headers are automatically repeated if the table spans over multiple pages
          // you can declare how many rows should be treated as headers
          //[ 'Value 1', 'Value 2', 'Value 3', 'Value 4' ]
          headerRows: 1,
          widths: [ '*', 'auto', 100, '*' ],
  
          body: [
            [ 'Producto', 'Cant.', 'Precio', 'Sub. Total' ],
            ...this.listaDetalle.map(ed => {
              return [ed.Nombre, ed.Cantidad, ed.Precio.toFixed(2), ed.subTotal.toFixed(2)];
            })
           
          ]
        }
      },
      {text:'',
      margin: [ 5, 2, 10, 20 ]},
      {
        columns: [
          {
            // % width
            width: 225,
            text: ''
          },
          {
            // % width
            width: 100,
            text: 'Total '
          },
          {
            // auto-sized columns have their widths based on their content
            width: 100,
            text: this.total.toFixed(2)
          }
        ],
        // optional space between columns
        columnGap: 10
      },

    ]};
     
    
    pdfMake.createPdf(documentDefinition).open();
  }


}
