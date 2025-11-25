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
 
  obtenerNoticias(): Observable<Noticia[]> { 
    return this.http.get<Noticia[]>(`${this.apiUrl}/noticia/all`);
  } 
} 
