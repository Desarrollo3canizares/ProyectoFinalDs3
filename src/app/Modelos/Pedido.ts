import {DetalleProducto} from './DetProductos'
export interface Pedido {
    Estado: string,
        Fecha: string,
        Productos:[DetalleProducto],
        Repartidor:string,
        Total:string,
        Uid: string
    
  }