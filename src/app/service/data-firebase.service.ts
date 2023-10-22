import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Itarea } from '../tarea';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataFirebaseService {

  URL: string = 'https://uniminuto1-default-rtdb.firebaseio.com/';

  constructor(private client: HttpClient) { }

  obtenerTareas() {
    return this.client.get(`${this.URL}datos.json`);
  }

  savetarea( tarea:Itarea){
    this.client.post(this.URL+"datos.json",tarea).subscribe(
      {
        next: (data)=> {
          console.log(data);
        },
        complete: ()=>{
          console.log("Se completo la peticion");
        },
        error:(e)=>console.log(e.message)
      }
    )
  }

  actualizarTarea(tarea: any): Observable<any> {
    
    const nombreTarea = tarea.nombre;

    
    return this.client.patch(`${this.URL}datos/${nombreTarea}.json`, tarea);
  }

  borrarTarea(tareaId: string): Observable<any> {
    const url = `${this.URL}datos/${tareaId}.json`;
    return this.client.delete(url);
  }
  
  
  

  

  


}
