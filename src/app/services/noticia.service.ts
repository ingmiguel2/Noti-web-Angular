import { Injectable } from '@angular/core'; 
import { HttpClient } from '@angular/common/http'; 
import { Observable } from 'rxjs'; 
import { Noticia } from '../models/noticia.interface'; 
 
@Injectable({ 
  providedIn: 'root' 
}) 
export class NoticiaService { 
  private apiUrl = '/api';
 
 
  constructor(private http: HttpClient) { } 
 
  nuevaNoticia(token: any, data: any): Observable<any> {
    return this.http.post<any>(
      `${this.apiUrl}/noticia/add`,
      data,
      {
        headers: {
          'Content-Type': 'application/json',
          accessToken: `${token}`
        }
      });
  }

    obtenerNoticias(): Observable<Noticia[]> { 
    return this.http.get<Noticia[]>(`${this.apiUrl}/noticia/all`);
    } 

    actualizarNoticia(token: any, id: any, data: any): Observable<any> {
    console.log(data)
    return this.http.put<any>(
      this.apiUrl + '/noticias/' + id,
      data,
      {
        headers: {
          'Content-Type': 'application/json',
          accessToken: `${token}`
        }
      });
  }

    obtenerUnaNoticia(token: any, id: any): Observable<any> {
    return this.http.get<any>(
      this.apiUrl + '/noticia/' + id,
      {
        headers: {
          'Content-Type': 'application/json',
          accessToken: `${token}`
        }
      });
  }

    eliminarNoticia(token: any, id: any) {
    return this.http.delete<any>(
      this.apiUrl + "/noticia/" + id,
      {
        headers: {
          'Content-Type': 'application/json',
          accessToken: `${token}`
        }
      });
  }
} 
