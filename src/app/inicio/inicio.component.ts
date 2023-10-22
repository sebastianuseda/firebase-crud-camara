import { Component, OnInit } from '@angular/core';
import { ItemService } from '../item.service';
import { Router } from '@angular/router';
import { Itarea } from '../tarea';
import { DataFirebaseService } from '../service/data-firebase.service';
import { ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})

export class InicioComponent {
 
  tarea:Itarea={
   
    nombre:'',
    estatus:'',
    date:new Date()


  }

  @ViewChild('videoElement') videoElement!: ElementRef;

  tareaEnEdicion: Itarea | null = null; // Tarea que se está editando
  editando: boolean = false; 

  editarTarea(tarea: Itarea): void {
    // Llena el formulario con los datos de la tarea a editar
    this.tarea = { ...tarea };
    this.tareaEnEdicion = tarea;
    this.editando = true;
  }

  tareas: Itarea[]=[];

 
  constructor(private itemService: ItemService, private router: Router, private service:DataFirebaseService) {
    
  }

  ngOnInit() {
    // Cuando el componente se inicializa, obtener las tareas desde Firebase
    this.service.obtenerTareas().subscribe((data) => {
      if (data) {
        // Convierte los datos en un arreglo de tareas
        this.tareas = Object.values(data);
      }
    });

    this.videoElement = new ElementRef(document.querySelector('video'));
  }

  addTarea(): void {
    if (this.editando) {
      // Estás editando una tarea, así que actualízala
      this.actualizarTarea(this.tarea);
    } else {
      // Estás agregando una nueva tarea
      this.service.savetarea(this.tarea);
      this.tareas.push(this.tarea); // Agrega la tarea a la lista
    }
  
    // Restablece el formulario y el estado de edición
    this.tarea = { nombre: '', estatus: '', date: new Date() };
    this.tareaEnEdicion = null;
    this.editando = false;
  }
  
  actualizarTarea(tarea: Itarea): void {
    // Aquí debes enviar una solicitud para actualizar la tarea en Firebase
    // Asegúrate de implementar este método en tu servicio DataFirebaseService
    this.service.actualizarTarea(tarea);
  
    // Actualiza la tarea en la lista local (opcional)
    if (this.tareaEnEdicion) {
      const index = this.tareas.findIndex(t => t === this.tareaEnEdicion);
      if (index !== -1) {
        this.tareas[index] = tarea;
      }
    }
  
    // Restablece el formulario y el estado de edición
    this.tarea = { nombre: '', estatus: '', date: new Date() };
    this.tareaEnEdicion = null;
    this.editando = false;
  }

  borrarTarea(tarea: Itarea): void {
    // Utiliza algún criterio distintivo, como el nombre de la tarea, para eliminarla
    const nombreTarea = tarea.nombre;

    // Realiza una solicitud al servicio para eliminar la tarea
    this.service.borrarTarea(nombreTarea).subscribe({
      next: () => {
        console.log('Tarea eliminada con éxito');
        // Actualiza la lista de tareas localmente (opcional)
        this.tareas = this.tareas.filter(t => t.nombre !== nombreTarea);
      },
      error: (e) => console.log('Error al eliminar la tarea', e.message)
    });
  }
  
  // Este es solo un ejemplo básico. Debes ajustar según tu aplicación.
  async iniciarCamara() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      this.videoElement.nativeElement.srcObject = stream;
    } catch (error) {
      console.error('Error al acceder a la cámara: ', error);
    }
  }




  
  
 
  

  
  logout() {
   
    this.router.navigate(['/login']);
  }
}
