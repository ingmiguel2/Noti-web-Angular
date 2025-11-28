// src/app/components/register/register.ts
import { Component, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Authentication } from '../../services/authentication';
import { User } from '../../models/user';

@Component({
  selector: 'app-register',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  registerForm: FormGroup;
  loading = false;
  errorMessage = '';
  successMessage = '';

  constructor(
    private renderer: Renderer2,
    private fb: FormBuilder,
    private authService: Authentication,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', [Validators.required, Validators.minLength(6)]],
      confirmarContrasena: ['', [Validators.required]],
      rol: ['lector', [Validators.required]]  // Valor por defecto
    }, { validator: this.passwordMatchValidator });
  }

  ngOnInit() {
    this.renderer.addClass(document.body, 'bg-gradient-primary');
  }

  passwordMatchValidator(form: FormGroup) {
    const contrasena = form.get('contrasena');
    const confirmarContrasena = form.get('confirmarContrasena');
    
    if (contrasena && confirmarContrasena && contrasena.value !== confirmarContrasena.value) {
      confirmarContrasena.setErrors({ passwordMismatch: true });
    }
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.loading = true;
      this.errorMessage = '';
      this.successMessage = '';

      console.log('🎯 VALOR DE ROL SELECCIONADO:', this.registerForm.get('rol')?.value);
    console.log('📋 FORMULARIO COMPLETO:', this.registerForm.value);

      const userData: User = {
        nombre: this.registerForm.get('nombre')?.value,
        correo: this.registerForm.get('correo')?.value,
        contraseña: this.registerForm.get('contrasena')?.value,
        rol: this.registerForm.get('rol')?.value,
        fechaRegistro: new Date()
      };

      console.log('Enviando datos al registro:', userData);

      this.authService.register(userData).subscribe({
        next: (response) => {
          this.loading = false;
          console.log('Registro exitoso:', response);
          this.successMessage = '¡Usuario registrado correctamente!';
          
          if (response.datosUsuario && response.datosUsuario.accessToken) {
            localStorage.setItem("ACCESS_TOKEN", response.datosUsuario.accessToken);
            localStorage.setItem("EXPIRES_IN", response.datosUsuario.expiresIn);
            setTimeout(() => {
              this.router.navigate(['/']);
            }, 2000);
          } else {
            setTimeout(() => {
              this.router.navigate(['/login']);
            }, 2000);
          }
        },
        error: (error) => {
          this.loading = false;
          console.error('Error en registro:', error);
          
          if (error.error && error.error.message) {
            this.errorMessage = error.error.message;
          } else if (error.status === 0) {
            this.errorMessage = 'No se puede conectar con el servidor. Verifica que la API esté corriendo.';
          } else {
            this.errorMessage = 'Error en el registro. Intenta nuevamente.';
          }
        }
      });
    } else {
      this.markFormGroupTouched(this.registerForm);
    }
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      control?.markAsTouched();
    });
  }

  get nombre() { return this.registerForm.get('nombre'); }
  get correo() { return this.registerForm.get('correo'); }
  get contrasena() { return this.registerForm.get('contrasena'); }
  get confirmarContrasena() { return this.registerForm.get('confirmarContrasena'); }
  get rol() { return this.registerForm.get('rol'); }
}