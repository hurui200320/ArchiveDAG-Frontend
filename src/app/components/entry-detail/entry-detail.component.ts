import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {TagEntry} from "../../models/TagEntry";
import {TagEntryService} from "../../services/tag-entry.service";
import {SimpleMessageService} from "../../services/simple-message.service";
import {ObjectType, StatusEntry} from "../../models/Response";
import {HttpService} from "../../services/http.service";

@Component({
  selector: 'app-entry-detail',
  templateUrl: './entry-detail.component.html',
  styleUrls: ['./entry-detail.component.css']
})
export class EntryDetailComponent implements OnInit {

  loading: boolean = true;
  currentEntry: TagEntry | null = null;
  entryType: ObjectType | null = null;
  status: StatusEntry | null = null;

  constructor(
    private activeRoute: ActivatedRoute,
    private tagService: TagEntryService,
    private messageService: SimpleMessageService,
    private httpService: HttpService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.activeRoute.params.subscribe((params) => {
      this.currentEntry = this.tagService.getEntry(params["uuid"])
      if (this.currentEntry != null) {
        this.entryType = this.tagService.getType(this.currentEntry);
        this.httpService.queryLinkStatus([this.currentEntry.multihash])
          .subscribe((resp) => {
            if (resp != null) {
              let status: StatusEntry = resp[this.currentEntry!.multihash]
              this.status = status;
              this.entryType = status.type;
            } else {
              this.messageService.addErrorMessage(
                "Failed to query link status",
                this.currentEntry?.multihash
              )
            }
          });
      }
      this.loading = false;
    });
  }

  flatten() {

  }

  remove() {
    this.tagService.deleteEntry(this.currentEntry!.uuid);
    this.messageService.addInfoMessage(`${this.currentEntry!.uuid} deleted.`)
    this.router.navigate(['/home']).then(r => {
      if (!r) this.messageService.addErrorMessage("Failed to navigate to home page after delete")
    })
  }
}
