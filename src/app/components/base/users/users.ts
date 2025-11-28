import { Component } from '@angular/core';
import { UserService } from '../../../services/Usuario.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';
import { CommonModule, formatDate } from '@angular/common';
import { Menu } from '../../menu/menu';

@Component({
  selector: 'app-users',
  imports: [CommonModule, ReactiveFormsModule, Menu, FormsModule],
  templateUrl: './users.html',
  styleUrl: './users.css',
})
export class User {

  constructor(private userservice: UserService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService) {

    }
  
    tittlePage: string = 'usuarios';
    userList: any = [];
    userForm!: FormGroup;
    editableUser: boolean = false;
    idUser: any;
    user = 'Usuario';

    ngOnInit() {
      const token = localStorage.getItem("accessToken");

      if(token){
        this.userForm =this.formBuilder.group({
          nombre: '',
          correo: '',
          contraseña: '',
          rol: '',
          fechaRegistro: Date
        });
        this.obtenerUsuarios();
      }else {
        this.router.navigate(['/'])
      }

    }

    obtenerUsuarios() {
      this.userservice.obtenerUsuario().subscribe(
       (data: {}) => {
        this.userList = data
        console.log(data)
       }
      );
    }

  
  
  newMessage(messageText: string) {
    this.toastr.success('Clic aquí para actualizar la lista', messageText)
      .onTap
      .pipe(take(1))
      .subscribe(() => window.location.reload());
  }
  
  updateUserEntry() {
    //Removiendo valores vacios del formulario de actualización
    for(let key in this.userForm.value) {
      if (this.userForm.value[key] === '') {
        this.userForm.removeControl(key);
      }
    }
    this.userservice.actualizarUsuario(localStorage.getItem('accessToken'), this.idUser, this.userForm.value).subscribe(
     () => {
      //Enviando mensaje de confirmación
      this.newMessage("Usuario editado");
     }
    );
  }

  toggleEditUser(id: any) {
    this.idUser = id;
    console.log(this.idUser)
    this.userservice.obtenerUnaNoticia(localStorage.getItem('accessToken'), id).subscribe(
      data => {
        this.userForm.setValue({
          nombre: data.nombre,
          correo: data.correo,
          contraseña: data.contraseña,
          rol: data.rol,
          fechaRegistro: this.getValidDate(data.fechaRegistro)
        });
      }
    );
    this.editableUser = !this.editableUser;
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
  
  deleteUserEntry(id: any) {
    console.log(id)
    this.userservice.eliminarUsuario(localStorage.getItem('accessToken'), id).subscribe(
      () => {
        //Enviando mensaje de confirmación
        this.newMessage("usuario eliminado");
      }
    );
  }  
}

