import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { TokenService } from 'src/app/_services/token.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-u-index',
  templateUrl: './u-index.component.html',
  styleUrls: ['./u-index.component.css']
})
export class UIndexComponent {

  constructor(
              private userService: UserService,
              private tokenService: TokenService
              ){}

  usersList: any=[];
  isLoading: boolean = true;

  user:any;

  ngOnInit():void{

    const userId = this.tokenService.getUserIdFromToken();
    const hospitalId = this.tokenService.getHospitalIdFromToken()?.toString();

    this.userService.getUserByHospital(hospitalId).subscribe(
      (users: any) => {
        this.usersList = users.data.filter((user:any)=>user.status == 'A');
        console.log(this.usersList)
        this.isLoading = false;
      },
      err => console.error(err)
    );

    this.userService.getUserById(userId).subscribe(
      (user:any)=>{
        this.user = user.data;
        console.log(user);
      },
      (err:any)=>console.log(err.message())
    );
  }


}
