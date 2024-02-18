import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

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

  constructor(private activated: ActivatedRoute, private http: HttpClient){}

  ngOnInit(): void{

    let id = this.activated.snapshot.paramMap.get('id');

    this.http.get("http://localhost:3000/api/users/"+id).subscribe(
      (user:any)=> {
        console.log(user);
        this.user = user.data;
      },
      err=> console.log(err)
    );

  }
}
