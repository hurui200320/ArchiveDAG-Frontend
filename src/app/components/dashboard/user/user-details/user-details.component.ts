import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HttpService} from "../../../../services/http.service";
import {NbToastrService} from "@nebular/theme";
import {UserDetails, UserStatus} from "../../../../models/http-models";
import {HttpErrorResponse} from "@angular/common/http";
import {MemStorageService} from "../../../../services/mem-storage.service";

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {

  username: string = "";
  currentUsername: string = "";

  newPassword: string = "";
  newStatus: UserStatus = "ENABLED";
  newRole: string = "";
  statusList: UserStatus[] = ["ENABLED", "DISABLED"];

  userDetails: UserDetails | null = null;
  roles: string[] = [];
  roleList: string[] = ["ROLE_USER", "ROLE_UPLOADER", "ROLE_VIEWER", "ROLE_ADMIN"];

  constructor(
    private route: ActivatedRoute,
    private httpService: HttpService,
    private toastrService: NbToastrService,
    private memStorage: MemStorageService
  ) {
  }

  refreshUserDetails() {
    this.httpService.queryUser(this.username)
      .subscribe(resp => {
        if ("err" in resp) {
          let err = resp.err as HttpErrorResponse;
          this.toastrService.show(err.message, "Failed to query user " + this.username, {status: 'danger'});
        } else {
          this.userDetails = resp;
          this.newStatus = resp.status;
        }
      });
  }

  refreshUserRoles() {
    this.roles = [];
    this.httpService.listUserRole(this.username)
      .subscribe(resp => {
        if ("err" in resp) {
          let err = resp.err as HttpErrorResponse;
          this.toastrService.show(err.message, "Failed to list roles for " + this.username, {status: 'danger'});
        } else {
          this.roles = resp;
        }
      });
  }

  changePassword() {
    if (this.newPassword === "") {
      this.toastrService.show("Password not changed", "Apply changes", {status: "info"});
      return;
    }
    this.httpService.changeUserPassword(this.username, this.newPassword)
      .subscribe(resp => {
        if (resp != null && "err" in resp) {
          let err = resp.err as HttpErrorResponse;
          switch (err.status) {
            case 403:
              this.toastrService.show("Permission denied", "Failed to change password for " + this.username, {status: 'danger'});
              break;
            case 404:
              this.toastrService.show("User not found", "Failed to change password for " + this.username, {status: 'danger'});
              break;
            default:
              this.toastrService.show(err.message, "Failed to change password for " + this.username, {status: 'danger'});
              break;
          }
        } else {
          this.toastrService.show("Success", "Password updated", {status: 'success'});
          this.newPassword = "";
        }
      });
  }

  changeStatus() {
    if (this.newStatus === this.userDetails?.status) {
      this.toastrService.show("Status not changed", "Apply changes", {status: "info"});
      return;
    }
    this.httpService.changeUserStatus(this.username, this.newStatus)
      .subscribe(resp => {
        if (resp != null && "err" in resp) {
          let err = resp.err as HttpErrorResponse;
          switch (err.status) {
            case 403:
              this.toastrService.show("Permission denied", "Failed to change status for " + this.username, {status: 'danger'});
              break;
            case 404:
              this.toastrService.show("User not found", "Failed to change status for " + this.username, {status: 'danger'});
              break;
            default:
              this.toastrService.show(err.message, "Failed to change status for " + this.username, {status: 'danger'});
              break;
          }
        } else {
          this.toastrService.show("Success", "Status updated", {status: 'success'});
          this.refreshUserDetails();
        }
      });
  }

  addUserRole() {
    this.httpService.addUserRole(this.username, this.newRole)
      .subscribe(resp => {
        if (resp != null && "err" in resp) {
          let err = resp.err as HttpErrorResponse;
          switch (err.status) {
            case 400:
              this.toastrService.show("Bad role", "Failed to add role for " + this.username, {status: 'danger'});
              break;
            case 403:
              this.toastrService.show("Permission denied", "Failed to add role for " + this.username, {status: 'danger'});
              break;
            case 404:
              this.toastrService.show("User not found", "Failed to add role for " + this.username, {status: 'danger'});
              break;
            case 409:
              this.toastrService.show("Duplicated role", "Failed to add role for " + this.username, {status: 'danger'});
              break;
            default:
              this.toastrService.show(err.message, "Failed to add role for " + this.username, {status: 'danger'});
              break;
          }
        } else {
          this.toastrService.show("Success", "Role added", {status: 'success'});
          this.newRole = "";
          this.refreshUserRoles();
        }
      });
  }

  removeUserRole(role: string) {
    this.httpService.removeUserRole(this.username, role)
      .subscribe(resp => {
        if (resp != null && "err" in resp) {
          let err = resp.err as HttpErrorResponse;
          switch (err.status) {
            case 403:
              this.toastrService.show("Permission denied", "Failed to remove role for " + this.username, {status: 'danger'});
              break;
            case 404:
              this.toastrService.show("Role not found", "Failed to remove role for " + this.username, {status: 'danger'});
              break;
            default:
              this.toastrService.show(err.message, "Failed to remove role for " + this.username, {status: 'danger'});
              break;
          }
        } else {
          this.toastrService.show("Success", "Role removed", {status: 'success'});
          this.refreshUserRoles();
        }
      });
  }

  deleteUser() {
    this.httpService.deleteUser(this.username)
      .subscribe(resp => {
        if (resp != null && "err" in resp) {
          let err = resp.err as HttpErrorResponse;
          switch (err.status) {
            case 403:
              this.toastrService.show("Permission denied", "Failed to delete user " + this.username, {status: 'danger'});
              break;
            case 404:
              this.toastrService.show("User not found", "Failed to delete user " + this.username, {status: 'danger'});
              break;
            default:
              this.toastrService.show(err.message, "Failed to delete user " + this.username, {status: 'danger'});
              break;
          }
        } else {
          this.toastrService.show("Success", "User deleted", {status: 'success', duration: 60000});
        }
      });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap => {
      this.username = paramMap.get("username") ?? "";
      this.newPassword = "";
      this.refreshUserDetails();
      this.refreshUserRoles();
      this.currentUsername = this.memStorage.currentUser.get().username;
    });
  }

  applyChanges() {
    this.changePassword();
    this.changeStatus();
  }
}
