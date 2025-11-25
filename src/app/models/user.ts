export interface User { 
  _id?: string; 
  nombre: string; 
  correo: string; 
  contraseña: string; 
  rol: "admin" | "editor" | "lector"; 
  fechaRegistro: Date; 
} 
