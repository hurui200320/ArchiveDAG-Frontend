import {Component, OnInit} from '@angular/core';
import {CertDetails} from "../../../../models/http-models";
import {HttpService} from "../../../../services/http.service";
import {NbToastrService} from "@nebular/theme";

@Component({
  selector: 'app-list-cert',
  templateUrl: './list-cert.component.html',
  styleUrls: ['./list-cert.component.scss']
})
export class ListCertComponent implements OnInit {

  blurredOwner: string = "";
  page: number = 1;
  size: number = 10;

  certList: CertDetails[] = [];

  constructor(
    private httpService: HttpService,
    private toastrService: NbToastrService
  ) {
  }

  ngOnInit(): void {
    this.refresh();
  }

  refresh() {
    if (this.page < 1)
      this.page = 1;
    this.certList = [];
    this.httpService.listCertSerialNumber(this.blurredOwner, this.page - 1, this.size)
      .subscribe(resp => {
        if ("err" in resp) {
          console.log(resp.err);
          this.toastrService.show(resp.err.message, "Failed to list cert", {status: 'danger'});
          if (this.blurredOwner !== "") {
            this.blurredOwner = "";
            this.page = 1;
            this.refresh();
          }
        } else {
          this.certList = resp.map((it, i) => {
            let result: CertDetails = {
              serialNumber: it,
              owner: "",
              issuedTimestamp: 0,
              expiredTimestamp: 0,
              status: "REVOKED"
            };
            this.httpService.queryCert(it)
              .subscribe(cert => {
                if ("err" in cert) {
                  console.log(cert.err);
                  this.toastrService.show(cert.err.message, "Failed to query cert: " + it, {status: 'danger'});
                } else {
                  result.owner = cert.owner;
                  result.issuedTimestamp = cert.issuedTimestamp;
                  result.expiredTimestamp = cert.expiredTimestamp;
                  result.status = cert.status;
                }
              });
            return result;
          });
        }
      });
  }
}
