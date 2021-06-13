import { ElementRef, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent {

  // ViewChild: busca en el html una referencia a txtBuscar y la asigna a txtBuscar
  // Not Null Asersion Operator: ! operador para asegurarse de que el objeto no es nulo, ya que
  // esta declarado en el html como local
  // ElementRef sacado del f12 del evento
  // HTMLInputElement: para el tipado, tipo del input y habilitar el autocompletado, 
@ViewChild('txtBuscar') txtBuscar!: ElementRef<HTMLInputElement>;

constructor(private gifsService: GifsService) {}

//buscar(event: KeyboardEvent ) {
//buscar(termino: string ) {
buscar() {
  //console.log('termino: ', termino);
  console.log(`txtBuscar`, this.txtBuscar);  // para sacar el ElementRef

  //document.querySelector('input').value = '';

  const valor = this.txtBuscar.nativeElement.value;
    //console.log(`valor`, valor);

  if ( valor.trim().length === 0) {
    return;
  }


  this.gifsService.buscarGifs(valor);
  this.txtBuscar.nativeElement.value = '';
}

}
