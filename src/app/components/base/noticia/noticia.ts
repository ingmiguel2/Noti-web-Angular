import { CommonModule, formatDate } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Menu } from '../../menu/menu';
import { NoticiaService } from '../../../services/noticia.service';
import { Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';

@Component({
  selector: 'app-noticia',
  imports: [CommonModule, ReactiveFormsModule, Menu],
  templateUrl: './noticia.html',
  styleUrl: './noticia.css',
})
export class Noticia {

  constructor(private noticiaService: NoticiaService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService) {

    }

    tittlePage: string = 'Noticias';
    noticiaList: any = [];
    noticiaForm!: FormGroup;
    editableNoticia: boolean = false;
    idNoticia: any;
    user = 'Usuario';

    ngOnInit() {
      const token = localStorage.getItem("accessToken");

      if(token){
        this.noticiaForm =this.formBuilder.group({
          titulo: '',
          contenido: '',
          autor: '',
          categoria: '',
          fuente: '',
          revisado: false,
          fechaPublicacion: Date,
          fechaRegistroBD: Date
        });
        this.obtenerNoticias();
      }else {
        this.router.navigate(['/'])
      }

    }

    obtenerNoticias() {
      this.noticiaService.obtenerNoticias().subscribe(
       (data: {}) => {
        this.noticiaList = data
        console.log(data)
       }
      );
    }

  newNoticeEntry() {
    this.noticiaService.nuevaNoticia(localStorage.getItem('accessToken'), this.noticiaForm.value).subscribe(
      () => {
        //Redirigiendo a la ruta actual /animal y recargando la ventana
        this.router.navigate(['/noticia']).then(() => {
          this.newMessage('Registro exitoso');
        })
      }
    );
  }
  
  newMessage(messageText: string) {
    this.toastr.success('Clic aquí para actualizar la lista', messageText)
      .onTap
      .pipe(take(1))
      .subscribe(() => window.location.reload());
  }
  
  updateNoticeEntry() {
    //Removiendo valores vacios del formulario de actualización
    for(let key in this.noticiaForm.value) {
      if (this.noticiaForm.value[key] === '') {
        this.noticiaForm.removeControl(key);
      }
    }
    this.noticiaService.actualizarNoticia(localStorage.getItem('accessToken'), this.idNoticia, this.noticiaForm.value).subscribe(
     () => {
      //Enviando mensaje de confirmación
      this.newMessage("Noticia editada");
     }
    );
  }

  toggleEditNoticia(id: any) {
    this.idNoticia = id;
    console.log(this.idNoticia)
    this.noticiaService.obtenerUnaNoticia(localStorage.getItem('accessToken'), id).subscribe(
      data => {
        this.noticiaForm.setValue({
          titulo: data.titulo,
          contenido: data.contenido,
          autor: data.autor,
          categoria: data.categoria,
          fuente: data.fuente,
          revisado: data.revisado,
          fechaPublicacion: this.getValidDate(data.fechaPublicacion),
          fechaRegistroBD: this.getValidDate(data.fechaRegistroBD)
        });
      }
    );
    this.editableNoticia = !this.editableNoticia;
  }
  
  getValidDate(fecha: Date) {
    const fechaFinal: Date = new Date(fecha);
    //separado los datos
    var dd = fechaFinal.getDate() + 1;//fue necesario porque siempre daba un día antes
    var mm = fechaFinal.getMonth() + 1; //porque Enero es 0
    var yyyy = fechaFinal.getFullYear();
    var mes = '';
    var dia = '';

    //Como algunos meses tienen 31 días dd puede dar 32
    if (dd == 32) {
      dd = 1;
      mm++;
    }
    //Transformación de fecha cuando el día o mes son menores a 10
    //se le coloca un cero al inicio
    //Día
    if (dd < 10) {
      dia += `0${dd}`;
    } else {
      dia += `${dd}`;
    }
    //Mes
    if (mm < 10) {
      mes += `0${mm}`;
    } else {
      mes += `${mm}`;
    }
    //formatDate para colocar la fecha en un formato aceptado por el calendario
    //GMT-0500 es para Colombia
    var finalDate = formatDate(new Date(yyyy + '-' + mes + '-' + dia + ' GMT-0500'), 'yyyy-MM-dd', "en-US");
    return finalDate;
  }
  
  deleteNoticeEntry(id: any) {
    console.log(id)
    this.noticiaService.eliminarNoticia(localStorage.getItem('accessToken'), id).subscribe(
      () => {
        //Enviando mensaje de confirmación
        this.newMessage("Noticia eliminado");
      }
    );
  }  
}
