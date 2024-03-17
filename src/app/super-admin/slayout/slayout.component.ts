import { Component } from '@angular/core';
import { TokenService } from 'src/app/_services/token.service';

@Component({
  selector: 'app-slayout',
  templateUrl: './slayout.component.html',
  styleUrls: ['./slayout.component.css']
})
export class SlayoutComponent {

  constructor(
    private tokenService:TokenService
  ){}
  
  logout(): void {
    this.tokenService.clearTokenSuperUser();
  }
}
