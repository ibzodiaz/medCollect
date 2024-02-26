import { Component } from '@angular/core';
import { TokenService } from 'src/app/_services/token.service';
import * as $ from 'jquery';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-alayout',
  templateUrl: './alayout.component.html',
  styleUrls: ['./alayout.component.css']
})

export class AlayoutComponent {

    constructor(
        private tokenService: TokenService,
        private userService:UserService
        ) {}

    user:any;

    ngOnInit(): void {
        this.initJQuery();
        this.userService.getUserById(this.tokenService.getUserIdFromToken()).subscribe(
            (user:any)=>{
                if(user){
                    this.user = user.data;
                    //alert(JSON.stringify(this.user))
                }
            },
            (err:any)=> console.log(err.message)
        );
    }

    logout(): void {
        this.tokenService.clearToken();
    }

    initJQuery(): void {
        const mobileScreen = window.matchMedia("(max-width: 990px )");
        $(document).ready(function () {
            $(".dashboard-nav-dropdown-toggle").click(function () {
                $(this).closest(".dashboard-nav-dropdown")
                    .toggleClass("show")
                    .find(".dashboard-nav-dropdown")
                    .removeClass("show");
                $(this).parent()
                    .siblings()
                    .removeClass("show");
            });
            $(".menu-toggle").click(function () {
                if (mobileScreen.matches) {
                    $(".dashboard-nav").toggleClass("mobile-show");
                } else {
                    $(".dashboard").toggleClass("dashboard-compact");
                }
            });
        });
    }
}
