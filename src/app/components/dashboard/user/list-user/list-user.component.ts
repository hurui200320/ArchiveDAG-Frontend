import { Component, OnInit } from '@angular/core';
import {HttpService} from "../../../../services/http.service";
import {UserDetails} from "../../../../models/user-models";
import {NbToastrService} from "@nebular/theme";

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss']
})
export class ListUserComponent implements OnInit {

  keyword: string = "";
  page: number = 1;
  size: number = 10;

  userList: UserDetails[] = [];

  constructor(
    private httpService: HttpService,
    private toastrService: NbToastrService
  ) { }

  refresh() {
    if (this.page < 1)
      this.page = 1;
    this.userList = [];
    this.httpService.listUsername(this.keyword, this.page - 1, this.size)
      .subscribe(resp => {
        if ("err" in resp) {
          console.log(resp.err);
          this.toastrService.show(resp.err.message, "Failed to list username", {status: 'danger'});
        } else {
          this.userList = resp.map((it, i) => {
            let result: UserDetails = {
              username: it,
              status: "DISABLED",
              roles: []
            };

            this.httpService.queryUser(it)
              .subscribe(user => {
                if ("err" in user) {
                  console.log(user.err);
                  this.toastrService.show(user.err.message, "Failed to query user: " + it, {status: 'danger'});
                } else {
                  result.status = user.status;
                  result.roles = user.roles;
                }
              });

            return result;
          });
        }
      });
  }

  ngOnInit(): void {
    this.refresh();
  }

}
