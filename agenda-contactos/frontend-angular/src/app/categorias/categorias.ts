import { Component } from '@angular/core';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.html',
  styleUrls: ['./categorias.css']
})
export class CategoriasComponent {
  categorias = [
    { nombre: 'Categoría A' },
    { nombre: 'Categoría B' },
    { nombre: 'Categoría C' }
  ];
}