import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-u-edit',
  templateUrl: './u-edit.component.html',
  styleUrls: ['./u-edit.component.css']
})
export class UEditComponent {
  
  user: any = {
    _id: '',
    nom: '',
    prenom: '',
    pseudo: '',
    email: '',
    password: '',
    createdAt: '',
    updatedAt : '',
    deletedAt : null
  }

  constructor(
    private activated: ActivatedRoute,
    private userService:UserService
    ){}

  ngOnInit(): void{

    let id = this.activated.snapshot.paramMap.get('id');

    this.userService.getUserById(id).subscribe(
      (user:any)=> {
        console.log(user);
        this.user = user.data;
      },
      err=> console.log(err)
    );

  }
}
