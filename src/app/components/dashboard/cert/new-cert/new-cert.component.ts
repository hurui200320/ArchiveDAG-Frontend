import {Component, OnInit} from '@angular/core';
import {HttpService} from "../../../../services/http.service";
import {NbToastrService} from "@nebular/theme";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-new-cert',
  templateUrl: './new-cert.component.html',
  styleUrls: ['./new-cert.component.scss']
})
export class NewCertComponent implements OnInit {

  requesting: boolean = false;
  serialNumber: string | null = null;
  cert: string = "";
  privateKey: string = "";

  constructor(
    private httpService: HttpService,
    private toastrService: NbToastrService
  ) {
  }

  ngOnInit(): void {
  }

  requestNew() {
    this.requesting = true;
    this.httpService.signNewCert()
      .subscribe(resp => {
        this.requesting = false;
        if ("err" in resp) {
          let err = resp.err as HttpErrorResponse;
          this.toastrService.show(err.message, "Failed to requires new cert", {status: "danger"});
        } else {
          this.cert = resp.cert;
          this.privateKey = resp.private_key;
          this.serialNumber = resp.serial_number;
        }
      });
  }

  downloadCert() {
    this.httpService.dynamicDownloadByHtmlTag(
      "cert.pem", this.cert
    )
  }

  downloadPrivateKey() {
    this.httpService.dynamicDownloadByHtmlTag(
      "private_key.pem", this.privateKey
    )
  }
}
