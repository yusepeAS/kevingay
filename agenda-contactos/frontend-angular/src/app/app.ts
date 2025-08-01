import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'; // 👈 IMPORTANTE

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule], // 👈 Aquí lo agregas
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent {
  title = 'Mi Aplicación';
}
