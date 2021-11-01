import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TagEntry} from "../../models/TagEntry";
import {SortMeta} from "primeng/api";

@Component({
  selector: 'app-entry-list',
  templateUrl: './entry-list.component.html',
  styleUrls: ['./entry-list.component.css']
})
export class EntryListComponent implements OnInit {

  @Input() value: TagEntry[] = [];
  @Input() allowSelection: boolean = false;
  @Input() selection: TagEntry[] = [];
  @Output() selectionChange = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  asTag(value: any): TagEntry {
    return value as TagEntry;
  }
}
