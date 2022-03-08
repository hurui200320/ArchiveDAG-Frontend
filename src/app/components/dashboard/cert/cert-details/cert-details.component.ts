import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {CertDetails, CertStatus} from "../../../../models/http-models";
import {HttpErrorResponse} from "@angular/common/http";
import {HttpService} from "../../../../services/http.service";
import {NbToastrService} from "@nebular/theme";

@Component({
  selector: 'app-cert-details',
  templateUrl: './cert-details.component.html',
  styleUrls: ['./cert-details.component.scss']
})
export class CertDetailsComponent implements OnInit {

  certNumber: string = "";
  newStatus: CertStatus = "ENABLED";
  statusList: CertStatus[] = ["ENABLED", "DISABLED", "REVOKED", "LOCKED"];
  certDetails: CertDetails | null = null;

  constructor(
    private route: ActivatedRoute,
    private httpService: HttpService,
    private toastrService: NbToastrService
  ) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap => {
      this.certNumber = paramMap.get("number") ?? "";
      this.refreshCertDetails();
    });
  }

  refreshCertDetails() {
    this.httpService.queryCert(this.certNumber)
      .subscribe(resp => {
        if ("err" in resp) {
          let err = resp.err as HttpErrorResponse;
          this.toastrService.show(err.message, "Failed to query cert " + this.certNumber, {status: 'danger'});
        } else {
          this.certDetails = resp;
          this.newStatus = resp.status;
        }
      });
  }

  changeStatus() {
    if (this.newStatus === this.certDetails?.status) {
      this.toastrService.show("Status not changed", "Apply changes", {status: "info"});
      return;
    }
    this.httpService.changeCertStatus(this.certNumber, this.newStatus)
      .subscribe(resp => {
        if (resp != null && "err" in resp) {
          let err = resp.err as HttpErrorResponse;
          switch (err.status) {
            case 403:
              this.toastrService.show("Permission denied", "Failed to change status for " + this.certNumber, {status: 'danger'});
              break;
            case 404:
              this.toastrService.show("Cert not found", "Failed to change status for " + this.certNumber, {status: 'danger'});
              break;
            default:
              this.toastrService.show(err.message, "Failed to change status for " + this.certNumber, {status: 'danger'});
              break;
          }
        } else {
          this.toastrService.show("Success", "Status updated", {status: 'success'});
          this.refreshCertDetails();
        }
      });
  }

  applyChanges() {
    this.changeStatus();
  }

  deleteCert() {
    this.httpService.deleteCert(this.certNumber)
      .subscribe(resp => {
        if (resp != null && "err" in resp) {
          let err = resp.err as HttpErrorResponse;
          switch (err.status) {
            case 403:
              this.toastrService.show("Permission denied", "Failed to delete cert " + this.certNumber, {status: 'danger'});
              break;
            case 404:
              this.toastrService.show("Cert not found", "Failed to delete cert " + this.certNumber, {status: 'danger'});
              break;
            default:
              this.toastrService.show(err.message, "Failed to delete cert " + this.certNumber, {status: 'danger'});
              break;
          }
        } else {
          this.toastrService.show("Success", "Cert deleted", {status: 'success', duration: 60000});
        }
      });
  }
}
