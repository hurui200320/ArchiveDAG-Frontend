import {Component, OnInit} from '@angular/core';
import {HttpService} from "../../../../services/http.service";
import {NbToastrService} from "@nebular/theme";
import {Router} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss']
})
export class NewUserComponent implements OnInit {

  username: string = "";
  password: string = "";
  submitted: boolean = false;

  constructor(
    private httpService: HttpService,
    private toastrService: NbToastrService,
    private route: Router
  ) {
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.submitted = true;
    this.httpService.createUser(this.username, this.password)
      .subscribe(resp => {
        if (resp != null && "err" in resp) {
          this.submitted = false;
          let err = resp.err as HttpErrorResponse;
          switch (err.status) {
            case 400:
              this.toastrService.show("Bad username/password", "Failed to create user", {status: 'danger'});
              break;
            case 409:
              this.toastrService.show("Conflicted username", "Failed to create user", {status: 'danger'});
              break;
            default:
              this.toastrService.show(err.message, "Failed to create user", {status: 'danger'});
              break;
          }
        } else {
          this.submitted = false;
          this.route.navigate(['/dashboard/user/details', this.username])
            .then(it => {
              if (!it) this.toastrService.show("Unknown error", "Failed to navigate", {status: 'danger'});
            });
        }
      });
  }
}
