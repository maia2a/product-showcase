import { CommonModule } from '@angular/common'; // For *ngIf, *ngFor, etc.
import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router'; // For routing directives

@Component({
  selector: 'app-root',
  standalone: true, // This makes it a standalone component
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink

  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'store-ui';
  currentYear = new Date().getFullYear();
}
