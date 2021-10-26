import {Component, OnInit} from '@angular/core';
import {PrimeNGConfig} from "primeng/api";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(
    private primeNgConfig: PrimeNGConfig,
    private router: Router
  ) {
  }

  title = 'ArchiveDAG';

  shouldShowMenuBar(): boolean {
    return [
      '/'
    ].filter((it) => it == this.router.url).length == 0;
  }

  ngOnInit(): void {
    this.primeNgConfig.ripple = true;
  }
}
