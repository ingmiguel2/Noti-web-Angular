export interface Noticia { 
  _id?: string; 
  titulo: string; 
  contenido: string; 
  autor: string; 
  categoria: "Arte" | "Moda" | "Cultura"; 
  fuente: string; 
  revisado: boolean; 
  fechaPublicacion: Date | null; 
  fechaRegistroBD: Date; 
} 
