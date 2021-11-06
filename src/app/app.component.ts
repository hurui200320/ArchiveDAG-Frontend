import {Component, HostListener, OnInit} from '@angular/core';
import {PrimeNGConfig} from "primeng/api";
import {Router} from "@angular/router";
import {TagEntryService} from "./services/tag-entry.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(
    private primeNgConfig: PrimeNGConfig,
    private router: Router,
    private tagService: TagEntryService
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

  @HostListener('window:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if ((event.metaKey || event.ctrlKey) && event.key === 's') {
      if (this.shouldShowMenuBar()) {
        this.tagService.export()
      }
      event.preventDefault();
    }
  }
}
