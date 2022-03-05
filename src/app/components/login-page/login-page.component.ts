import {ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core';
import {NB_AUTH_OPTIONS, NbAuthService, NbLoginComponent} from "@nebular/auth";
import {Router} from "@angular/router";
import {MemStorageService} from "../../services/mem-storage.service";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent extends NbLoginComponent implements OnInit {

  constructor(
    private memStorage: MemStorageService,
    service: NbAuthService,
    @Inject(NB_AUTH_OPTIONS) options: {},
    cd: ChangeDetectorRef,
    router: Router
  ) {
    super(service, options, cd, router)
  }

  ngOnInit(): void {
  }

  override login() {
    super.login();
    this.memStorage.authState.set({
      strategy: this.strategy,
      user: this.user
    })
  }

}
