import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TagEntry} from "../../models/TagEntry";
import {ObjectType, SimpleLink} from "../../models/Response";
import {Router} from "@angular/router";

@Component({
  selector: 'app-link-list',
  templateUrl: './link-list.component.html',
  styleUrls: ['./link-list.component.css']
})
export class LinkListComponent implements OnInit {

  @Input() value: SimpleLink[] = [];
  objectTypes: ObjectType[] = ["BLOB", "LIST", "TREE", "COMMIT"];

  constructor(
    public router: Router
  ) { }

  ngOnInit(): void {
  }

  asLink(link: any): SimpleLink {
    return link as SimpleLink
  }
}
