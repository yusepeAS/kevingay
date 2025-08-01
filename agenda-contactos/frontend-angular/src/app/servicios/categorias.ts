import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Categoria {
  id: string;
  nombre: string;
}

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {
  private apiUrl = 'http://localhost:3001/categorias';

  constructor(private http: HttpClient) {}

  getCategorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.apiUrl);
  }

  agregarCategoria(nombre: string): Observable<Categoria> {
    return this.http.post<Categoria>(this.apiUrl, { nombre });
  }

  editarCategoria(categoria: Categoria): Observable<Categoria> {
    return this.http.put<Categoria>(`${this.apiUrl}/${categoria.id}`, categoria);
  }

  eliminarCategoria(id: string): Observable<Categoria> {
    return this.http.delete<Categoria>(`${this.apiUrl}/${id}`);
  }
}
