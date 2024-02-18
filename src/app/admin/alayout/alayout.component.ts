import { Component } from '@angular/core';
import { TokenService } from 'src/app/_services/token.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-alayout',
  templateUrl: './alayout.component.html',
  styleUrls: ['./alayout.component.css']
})

export class AlayoutComponent {

    constructor(private tokenService: TokenService) {}

    ngOnInit(): void {
        this.initJQuery();
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
