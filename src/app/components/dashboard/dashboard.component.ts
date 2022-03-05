import {Component, OnInit} from '@angular/core';
import {HttpService} from "../../services/http.service";
import {NbAuthService, NbTokenService} from "@nebular/auth";
import {Router} from "@angular/router";
import {MemStorageService} from "../../services/mem-storage.service";
import {NbMenuItem} from "@nebular/theme";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  username: string = "";
  expTime: number = 0;
  token: any = {};

  items: NbMenuItem[] = [];

  constructor(
    private httpService: HttpService,
    private tokenService: NbTokenService,
    private authService: NbAuthService,
    private router: Router,
    private memStorage: MemStorageService
  ) {
  }

  private setMenuItem() {
    this.items = [
      {
        title: "User management",
        children: [
          {
            title: "Profile",
            link: "/dashboard/user/details/" + this.username
          },
          {
            title: "Advance",
            link: "/dashboard/user/list_user"
          },
        ]
      },
      {
        title: "Certificates management",
        children: [
          {
            title: "Request new",
            link: "/dashboard/cert/sign_new"
          },
          {
            title: "Management",
            link: "/dashboard/cert/management"
          }
        ]
      },
      {
        title: "Server maintenance",
        children: [
          {
            title: "Configurations",
            link: "/dashboard/maintenance/configurations"
          }
        ]
      }
    ];
  }

  private navigateToLogin() {
    this.tokenService.clear().subscribe(() => {
      this.router.navigate(["/"]).then(r => {
        if (!r) console.error("Cannot navigate!")
      });
    });
  }

  ngOnInit(): void {
    if (environment.production) {
      let auth = this.memStorage.authState.get();
      if (!auth || !auth.strategy || !auth.user) {
        // if user didn't login, clear old token
        this.navigateToLogin();
        return;
      }
    }

    this.httpService.whoami().subscribe(username => {
        if (username) {
          this.username = username;
          this.memStorage.currentUser.set({username: username});
          this.setMenuItem();
          this.tokenService.tokenChange().subscribe(token => {
            this.token = token.getPayload();
          });
        } else {
          this.navigateToLogin();
          return;
        }
      }
    );

    setInterval(() => {
      this.expTime = ~~(this.token.exp - new Date().getTime() / 1000);
      if (this.expTime <= 0) {
        this.items = [{
          title: "Session expired."
        }, {
          title: "Please save your work."
        }, {
          title: "And refresh the page."
        }];
      }
    }, 1000);
  }

}
