import { Component } from '@angular/core';
import { Credentials } from 'src/app/_interfaces/credentials';
import { AuthService } from 'src/app/_services/auth.service';
import { TokenService } from 'src/app/_services/token.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  form: Credentials = {
    email:'',
    password:''
  }

  constructor(private authService:AuthService, private tokenService: TokenService){}

  message:string = '';

  ngOnInit(): void{ this.activeComponent(); }

  activeComponent(){
    const signUpButton: HTMLElement | null = document.getElementById('signUp');
    const signInButton: HTMLElement | null = document.getElementById('signIn');
    const container: HTMLElement | null = document.getElementById('container');

    if (signUpButton && signInButton && container) {
      signUpButton.addEventListener('click', () => {
        container.classList.add("right-panel-active");
      });

      signInButton.addEventListener('click', () => {
        container.classList.remove("right-panel-active");
      });
    }

  }

  showPassword(eye:string,eye_slash:string, password:string){
    const eye_var = document.getElementById(eye) as HTMLElement;
    const eye_slash_var = document.getElementById(eye_slash) as HTMLElement;
    const password_var = document.getElementById(password) as HTMLInputElement;
    if(eye_slash){
      password_var.type = 'text';
      eye_slash_var.style.display = 'block';
      eye_var.style.display = 'none';
    }
  }

  hidePassword(eye:string,eye_slash:string, password:string){
    const eye_var = document.getElementById(eye) as HTMLElement;
    const eye_slash_var = document.getElementById(eye_slash) as HTMLElement;
    const password_var = document.getElementById(password) as HTMLInputElement;
    if(eye_slash){
      password_var.type = 'password';
      eye_slash_var.style.display = 'none';
      eye_var.style.display = 'block';
    }
  }

  onSubmit(){
    this.authService.login(this.form).subscribe(
      data => {
        //console.log(data.access_token);
        this.tokenService.saveToken(data.access_token.toString());
       
      },
      err => {
        this.message = "Identifiants incorrects!";
        //alert(err.message)
      }
    )
  }
}
