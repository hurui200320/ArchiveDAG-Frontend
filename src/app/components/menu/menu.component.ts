import {Component, OnInit} from '@angular/core';
import {MenuItem} from "primeng/api";
import {TagEntryService} from "../../services/tag-entry.service";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  items: MenuItem[] = [];

  constructor(
    private tagService: TagEntryService,
  ) {
  }

  ngOnInit(): void {
    this.items = [
      {
        label: 'Chunks',
        icon: 'pi pi-images',
        routerLink: '/chunks'
      },
      {
        label: 'Trees',
        icon: 'pi pi-folder',
        routerLink: '/trees'
      },
      {
        label: 'Commits',
        icon: 'pi pi-book',
        routerLink: '/commits'
      },
      {
        label: 'Export',
        icon: 'pi pi-download',
        command: _ => this.tagService.export()
      },
      {
        label: 'Exit',
        icon: 'pi pi-sign-out',
        routerLink: '/'
      }
    ];
  }

}
