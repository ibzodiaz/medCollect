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

  onSubmit(){
    this.authService.login(this.form).subscribe(
      data => {
        console.log(data.access_token);
        this.tokenService.saveToken(data.access_token.toString());
      },
      err => console.log(err)
    )
  }
}
