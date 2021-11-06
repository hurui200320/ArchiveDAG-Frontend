import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {zip} from "rxjs";
import {HttpService} from "../../services/http.service";
import {SimpleMessageService} from "../../services/simple-message.service";
import {CommitObjectModel, SimpleLink, StatusEntry} from "../../models/Response";
import {TagEntryService} from "../../services/tag-entry.service";

@Component({
  selector: 'app-proto-detail',
  templateUrl: './proto-detail.component.html',
  styleUrls: ['./proto-detail.component.css']
})
export class ProtoDetailComponent implements OnInit {

  constructor(
    private activeRoute: ActivatedRoute,
    private httpService: HttpService,
    private messageService: SimpleMessageService,
    private tagService: TagEntryService,
    public router: Router
  ) {
  }

  multihash: string | null = null;
  name: string | null = null;
  status: StatusEntry | null = null;
  subLinks: SimpleLink[] | null = null;
  commitInfo: CommitObjectModel | null = null;

  ngOnInit(): void {
    this.multihash = null;
    this.name = null;
    this.status = null;
    this.subLinks = null;
    zip(this.activeRoute.params, this.activeRoute.queryParams).subscribe((paramList) => {
      this.multihash = paramList[0]["multihash"];
      this.name = paramList[1]["name"];
      // query link type
      this.httpService.queryLinkStatus([this.multihash!]).subscribe((resp) => {
        if (resp == null) {
          this.messageService.addErrorMessage("Failed to query link status", this.multihash!);
        } else {
          this.status = resp[this.multihash!] as StatusEntry;
          // further query based on type
          let type = this.status.type;
          if (type == "TREE" || type == "LIST") {
            // is tree, get tree link
            this.httpService.getSubLinks(this.multihash!)
              .subscribe((resp) => {
                if (resp != null) {
                  this.subLinks = resp;
                } else {
                  this.messageService.addErrorMessage(
                    "Failed to query sub links",
                    this.multihash!
                  )
                }
              });
          } else if (type == "COMMIT") {
            // is commit, get commit info
            this.httpService.getCommit(this.multihash!)
              .subscribe((resp) => {
                if (resp != null) {
                  this.commitInfo = resp;
                } else {
                  this.messageService.addErrorMessage(
                    "Failed to query commit info",
                    this.multihash!
                  )
                }
              });
          }
        }
      });
    });
  }

  asLink(link: any): SimpleLink {
    return link as SimpleLink
  }

  addToRepo() {
    let resp = this.tagService.insertEntry(this.name!, this.multihash!, this.status!.type);
    if (resp != null) {
      this.messageService.addSuccessMessage(`Add entry ${this.name!}`, `uuid: ${resp.uuid}`);
    } else {
      this.messageService.addErrorMessage(`Cannot add entry ${this.name!}`, "Get null response");
    }
  }

  download() {
    this.httpService.downloadChunk(this.name!, this.multihash!);
  }
}
