import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { forkJoin, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class InventarioService {
  constructor(private http: HttpClient) { }

  getInventarioLibros() {
    return this.http.get<InventarioLibros[]>(
      'https://localhost:44365/GetListarLibros'
    );
  }

  addLibro(libro: InventarioLibros): Observable<string> {
    return this.http
      .post('https://localhost:44365/PostCrearLibro', libro, {
        responseType: 'text',
      })
      .pipe(
        catchError((error) => {
          console.error(error);
          return throwError('Error al crear el libro');
        })
      );
  }

  deleteLibro(iIDInventarioLibros: number): Observable<string> {
    const url = 'https://localhost:44365/EliminarLibros';
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: { iIDInventarioLibros: iIDInventarioLibros },
      responseType: 'text' as 'json',
    };
    return this.http.delete<string>(url, options);
  }

  updateLibro(libro: InventarioLibros): Observable<RespuestaEditarLibro> {
    const url = 'https://localhost:44365/PutEditarLibro';
    return this.http.put<RespuestaEditarLibro>(url, libro, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    });
  }

}

export interface InventarioLibros {
  iIDInventarioLibros: number;
  tNombreLibro?: string;
  tGeneroLibro?: string;
  tTipoLibro?: string;
  tAutorLibro?: string;
  dtFechaPublicacion?: Date;
  tEditorial?: string;
  tEstadoLibro?: string;
  tIdioma?: string;
  iNumeroEjemplares?: number;
  iIDUsuarioCalificacion?: number;
  tResenaUsuario?: string;
  tPuntuacionUsuario?: string;
  isSelected: boolean;
  isEdit: boolean;
}
export interface RespuestaEditarLibro {
  message?: string;
  libro?: InventarioLibros
}

export const LibrosColumns = [
  {
    key: 'isSelected',
    type: 'isSelected',
    label: '',
  },
  {
    key: 'tNombreLibro',
    type: 'text',
    label: 'Nombre del Libro',
    required: true,
  },
  {
    key: 'tGeneroLibro',
    type: 'text',
    label: 'Género del Libro',
  },
  {
    key: 'tTipoLibro',
    type: 'text',
    label: 'Tipo de Libro',
  },
  {
    key: 'tAutorLibro',
    type: 'text',
    label: 'Autor del Libro',
  },
  {
    key: 'dtFechaPublicacion',
    type: 'date',
    label: 'Fecha de Publicación',
  },
  {
    key: 'tEditorial',
    type: 'text',
    label: 'Editorial',
  },
  {
    key: 'tEstadoLibro',
    type: 'text',
    label: 'Estado del Libro',
  },
  {
    key: 'tIdioma',
    type: 'text',
    label: 'Idioma',
  },
  {
    key: 'iNumeroEjemplares',
    type: 'number',
    label: 'Número de Ejemplares',
  },
  {
    key: 'iIDUsuarioCalificacion',
    type: 'number',
    label: 'ID del Usuario de Calificación',
  },
  {
    key: 'tResenaUsuario',
    type: 'text',
    label: 'Reseña del Usuario',
  },
  {
    key: 'tPuntuacionUsuario',
    type: 'text',
    label: 'Puntuación del Usuario',
  },
  {
    key: 'isEdit',
    type: 'isEdit',
    label: '',
  },
];
