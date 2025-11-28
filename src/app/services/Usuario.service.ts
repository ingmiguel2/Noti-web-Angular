import { Injectable } from '@angular/core'; 
import { HttpClient } from '@angular/common/http'; 
import { Observable } from 'rxjs'; 
import { Noticia } from '../models/noticia.interface'; 
import { User } from '../models/user';
 
@Injectable({ 
  providedIn: 'root' 
}) 
export class UserService { 
  private apiUrl = '/api';
 
 
  constructor(private http: HttpClient) { } 
 
  

    obtenerUsuario(): Observable<User[]> { 
    return this.http.get<User[]>(this.apiUrl + '/usuarios');
    } 

    actualizarUsuario(token: any, id: any, data: any): Observable<any> {
    console.log(data)
    return this.http.put<any>(
      this.apiUrl + '/usuarios/' + id,
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

    eliminarUsuario(token: any, id: any) {
    return this.http.delete<any>(
      this.apiUrl + "/usuarios/" + id,
      {
        headers: {
          'Content-Type': 'application/json',
          accessToken: `${token}`
        }
      });
  }
} 
