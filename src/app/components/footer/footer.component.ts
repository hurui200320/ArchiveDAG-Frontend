import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";
import {Location} from "@angular/common";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  constructor() {
  }

  ngOnInit(): void {
  }

}
