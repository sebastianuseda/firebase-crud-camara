import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private items: any[] = []; 

  
  getItems() {
    return this.items;
  }

  addItem(item: any) {
    this.items.push(item);
  }

  updateItem(item: any, updatedItem: any) {
    const index = this.items.indexOf(item);
    if (index !== -1) {
      this.items[index] = updatedItem;
    }
  }

  deleteItem(item: any) {
    const index = this.items.indexOf(item);
    if (index !== -1) {
      this.items.splice(index, 1);
    }
  }
}
