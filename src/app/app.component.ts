import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  showButton: boolean = true;
  constructor(private router: Router) { }




 
  goToLogin() {
    
    this.showButton = false;
    
    this.router.navigate(['/login']);
  }
}
