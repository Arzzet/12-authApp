import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import  Swal  from 'sweetalert2';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent{

  miFormulario: FormGroup = this.fb.group({
    email     :['tu@email.com', [ Validators.required, Validators.email]],
    password  :['tuContraseña', [ Validators.required, Validators.minLength(6)]]
  });

  constructor(private fb: FormBuilder,
              private router: Router,
              private authService: AuthService) { }

  login(){
    console.log(this.miFormulario.value);
    const { email, password } = this.miFormulario.value;

    this.authService.login(email, password)
    .subscribe(ok => {
      console.log(ok);
      
      if (ok===true){
        this.router.navigateByUrl('/dashboard');
      } else {
        Swal.fire('Error', ok, 'error');
      };
    });
  }
    

}
