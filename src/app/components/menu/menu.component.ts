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
        label: 'Upload',
        icon: 'pi pi-fw pi-arrow-circle-up',
        items: [
          {label: 'File', icon: 'pi pi-file', routerLink: '/upload/file'},
          {label: 'Folder', icon: 'pi pi-folder', routerLink: '/upload/folder'},
        ]
      },
      {
        label: 'Export',
        icon: 'pi pi-bookmark',
        command: _ => this.tagService.export()
      }
    ];
  }

}
