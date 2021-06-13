import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Gif, SearchGifsResponse } from '../interfaces/gifs.interfaces';

@Injectable({
  // providedIn: 'root' le dice que el servicio va a estar global y unico en el root 
  // evita que yo lo especifique en los providers del gifs.module.ts
  providedIn: 'root'
})
export class GifsService {

  // https://developers.giphy.com/
  private apiKey     : string = 'IVebrd9mEpvGktrrY7hoH53axVMe4Lk0';
  private servicioUrl: string = 'https://api.giphy.com/v1/gifs';
  private _historial : string[] = [];

  public resultados: Gif[] = [];

  get historial(): string[] {
    // spread operator se retorna una copia para evitar que se pueda editar el _historial original
    // al hacer get (obtener)
    //this._historial = this._historial.splice(0, 10);
    return [...this._historial];
  }

  constructor(private http: HttpClient) {
    // ! igual que el if siguente comentariado, pero si no hay localstorage devuelve || []
    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
    this.resultados = JSON.parse(localStorage.getItem('resultados')!) || [];

    // if (localStorage.getItem('historial')) {
    // // ! Argument of type 'string | null' is not assignable to parameter of type 'string'.
    // // podria asignar null, pero como ya se validó !
    //   this._historial = JSON.parse(localStorage.getItem('historial')!);
    // }
  }

  // string = '' obliga a que siempre va a tener un valor
  // async buscarGifs(query: string = '') {
  buscarGifs(query: string = '') {

    query = query.trim().toLocaleLowerCase();

    if (!this._historial.includes(query)) {
      // unshift inserta al principio del array
      this._historial.unshift(query);
      this._historial = this._historial.splice(0, 10);

      localStorage.setItem('historial', JSON.stringify(this._historial));
    }

    //console.log(`_historial`, this._historial);

    // const resp = await fetch('https://api.giphy.com/v1/gifs/search?api_key=IVebrd9mEpvGktrrY7hoH53axVMe4Lk0&q=Dragon ball z&limit=10')
    //   // .then(resp => {
    //   //   resp.json().then(data => {
    //   //     console.log(`data`, data);
    //   //   })
    //   // })
    //   const data = await resp.json();
    //   console.log(`data`, data);

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '10')
      .set('q', query);

    console.log(`params.toString()`, params.toString());

    this.http.get<SearchGifsResponse>(`${this.servicioUrl}/search`, { params })
      .subscribe(resp => {
        this.resultados = resp.data;
        console.log(`this.resultados`, this.resultados);
        // del tipado autocompleta por la interface
        console.log(`resp`, resp.data[0].images.fixed_height);
        localStorage.setItem('resultados', JSON.stringify(this.resultados));
      });


  }
}
