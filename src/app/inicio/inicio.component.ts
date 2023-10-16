import { Component } from '@angular/core';
import { ItemService } from '../item.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent {
  items: any[] = [];
  newItemName: string = '';
  editingItem: any = null; 
  editedItemName: string = ''; 

  constructor(private itemService: ItemService, private router: Router) {
    this.items = itemService.getItems();
  }

  addItem(name: string) {
    if (name) {
      this.itemService.addItem({ name });
      this.newItemName = '';
    }
  }

  editItem(item: any) {
    this.editingItem = item;
    this.editedItemName = item.name; 
  }


 saveEditedItem(item: any) {
  if (item) {
    item.name = this.editedItemName;
    
    this.editingItem = null; 
  }
}


  cancelEdit() {
    this.editingItem = null;
  }

  deleteItem(item: any) {
    this.itemService.deleteItem(item);
  }

  logout() {
   
    this.router.navigate(['/login']);
  }
}
