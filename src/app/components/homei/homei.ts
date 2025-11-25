import { Component, Renderer2, OnInit } from '@angular/core';
import { NoticiaService } from '../../services/noticia.service';
import { Noticia } from '../../models/noticia.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-homei',
  imports: [CommonModule],
  templateUrl: './homei.html',
  styleUrl: './homei.css'
})
export class Homei implements OnInit {
  noticias: Noticia[] = [];
  cargando: boolean = true;
  error: string = '';

  constructor(
    private renderer: Renderer2,
    private noticiaService: NoticiaService
  ) { }

  ngOnInit() {
    this.renderer.addClass(document.body, 'bg-gradient-primary');
    this.cargarNoticias();
  }

  cargarNoticias() {
    this.cargando = true;
    this.noticiaService.obtenerNoticias().subscribe({
      next: (data: Noticia[]) => {
        this.noticias = data;
        this.cargando = false;
        console.log('Noticias cargadas:', data);
      },
      error: (error: any) => {
        this.error = 'Error al cargar noticias';
        this.cargando = false;
        console.error('Error:', error);
      }
    });
  }

  cortarTexto(texto: string, longitud: number): string {
    return texto.length > longitud ? texto.substring(0, longitud) + '...' : texto;
  }

  formatearFecha(fecha: Date | null): string {
    if (!fecha) return 'Fecha no disponible';
    return new Date(fecha).toLocaleDateString();
  }
}