import {Component, OnInit} from '@angular/core';
import {HttpService} from "../../../../services/http.service";
import {NbToastrService} from "@nebular/theme";

@Component({
  selector: 'app-list-config',
  templateUrl: './list-config.component.html',
  styleUrls: ['./list-config.component.scss']
})
export class ListConfigComponent implements OnInit {

  prefix: string = "";
  page: number = 1;
  size: number = 10;
  submitting: boolean = false;

  newConfigKey: string = "";
  newConfigValue: string = "";

  configMap: Map<string, string | null> = new Map<string, string | null>();

  changedConfigMap: Map<string, string | null> = new Map<string, string | null>();

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
    this.configMap.clear();
    this.httpService.listConfig(this.prefix, this.page - 1, this.size)
      .subscribe(resp => {
        if ("err" in resp) {
          console.log(resp.err);
          this.toastrService.show(resp.err.message, "Failed to list config", {status: 'danger'});
        } else {
          let respMap = new Map<string, any>(Object.entries(resp));
          respMap.forEach((v,k)=> {
            this.configMap.set(k, v as (string | null));
          });
        }
      });
  }

  updateConfig(key: string, newValue: string) {
    this.changedConfigMap.set(key, newValue);
  }

  deleteConfig(key: string) {
    this.changedConfigMap.set(key, null);
  }

  applyChanges() {
    this.submitting = true;
    this.httpService.updateConfig(this.changedConfigMap)
      .subscribe(resp => {
        if (resp != null) {
          console.log(resp.err);
          this.toastrService.show(resp.err.message, "Failed to update config", {status: 'danger'});
        } else {
          this.changedConfigMap.clear();
          this.page = 1;
          this.refresh();
          this.toastrService.show("Success", "Config updated", {status: 'success'});
        }
        this.submitting = false;
      });
  }

}
