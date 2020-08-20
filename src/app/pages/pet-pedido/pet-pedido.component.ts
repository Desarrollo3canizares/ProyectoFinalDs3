import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RealtimeDBSerService } from 'src/app/services/realtime-dbser.service';
import {Pedido} from '../../Modelos/Pedido';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { Usuario } from 'src/app/Modelos/UsuarioDB';
import { StorageService, SESSION_STORAGE } from 'ngx-webstorage-service';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
@Component({
  selector: 'app-pet-pedido',
  templateUrl: './pet-pedido.component.html',
  styleUrls: ['./pet-pedido.component.css']
})
export class PetPedidoComponent implements OnInit {

  constructor(@Inject(SESSION_STORAGE) private storage: StorageService,private rutaActiva: ActivatedRoute,public dbSer:RealtimeDBSerService,public router: Router) { }
  id='';
  fecha='';
  total=0;
  listaDetalle:any=[];
  usuario;
  repartidor;
  estado='';
  uidCU;
  listaImp:any={};
  async ngOnInit(){
    this.id=this.rutaActiva.snapshot.params.id;
    console.log('id',this.id);
    let us:Promise<Pedido>= this.dbSer.getPedidoID(this.id);
    this.fecha=(await us).Fecha;
    this.total=Number.parseFloat( (await us).Total);
    this.listaDetalle=(await us).Productos;
    this.estado=(await us).Estado;
    this.usuario=this.dbSer.getUsrUID((await us).Uid);
    this.repartidor=this.dbSer.getUsrUID((await us).Repartidor);
    console.log(this.usuario,this.repartidor);
    console.log((await us).Uid,(await us).Repartidor);
    this.uidCU = this.storage.get('uid');
    let Cus: Promise<Usuario> = this.dbSer.getUsrUID(this.uidCU);
    if ((await Cus).Rol != 'CLIENTE') {
      this.router.navigate(['/home']);
    }
    /*
    for(let i=0;i<this.listaDetalle.length;i++){
      let aux=[this.listaDetalle[i].Nombre,
      this.listaDetalle[i].Cantidad,
      this.listaDetalle[i].Precio.toFixed(2),
      this.listaDetalle[i].subTotal.toFixed(2)];
      this.listaImp.push(aux);
    }
    */
  }
  Verpdf(){
    let  documentDefinition = 
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
            [ 'Producto', 'Cat.', 'Precion', 'Sub. Total' ],
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
            text: this.total
          }
        ],
        // optional space between columns
        columnGap: 10
      },

    ]};
    if(this.estado!='ENVIADO'){
       documentDefinition = 
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
     
    }
    pdfMake.createPdf(documentDefinition).open();
  }

}
