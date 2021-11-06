import {Component, Input, OnInit} from '@angular/core';
import {CommitObjectModel, SimpleLink} from "../../models/Response";
import {Router} from "@angular/router";

@Component({
  selector: 'app-commit-info',
  templateUrl: './commit-info.component.html',
  styleUrls: ['./commit-info.component.css']
})
export class CommitInfoComponent implements OnInit {

  @Input() value: CommitObjectModel | null = null;

  constructor(
    public router: Router
  ) { }

  ngOnInit(): void {
  }

}
