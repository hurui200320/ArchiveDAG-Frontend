import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {TagEntry} from "../../models/TagEntry";
import {TagEntryService} from "../../services/tag-entry.service";
import {SimpleMessageService} from "../../services/simple-message.service";
import {CommitObjectModel, ObjectType, SimpleLink, StatusEntry} from "../../models/Response";
import {HttpService} from "../../services/http.service";
import {FormControl, Validators} from "@angular/forms";
import {Location} from "@angular/common";

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
  subLinks: SimpleLink[] | null = null;
  showRenameDialog: boolean = false;
  newNameForm: FormControl = new FormControl('', Validators.required);
  commitInfo: CommitObjectModel | null = null;

  constructor(
    private activeRoute: ActivatedRoute,
    private tagService: TagEntryService,
    private messageService: SimpleMessageService,
    private httpService: HttpService,
    public router: Router,
    private location: Location
  ) {
  }

  ngOnInit(): void {
    this.activeRoute.params.subscribe((params) => {
      this.currentEntry = this.tagService.getEntry(params["uuid"])
      if (this.currentEntry != null) {
        this.httpService.queryLinkStatus([this.currentEntry.multihash])
          .subscribe((resp) => {
            if (resp != null) {
              let status: StatusEntry = resp[this.currentEntry!.multihash]
              this.status = status;
              this.entryType = status.type;
              if (this.entryType == "TREE" || this.entryType == "LIST") {
                // is tree, get tree link
                this.httpService.getSubLinks(this.currentEntry!.multihash)
                  .subscribe((resp) => {
                    if (resp != null) {
                      this.subLinks = resp;
                    } else {
                      this.messageService.addErrorMessage(
                        "Failed to query sub links",
                        this.currentEntry?.multihash
                      )
                    }
                  });
              } else if (this.entryType == "COMMIT") {
                this.httpService.getCommit(this.currentEntry!.multihash)
                  .subscribe((resp) => {
                    if (resp != null) {
                      this.commitInfo = resp
                    } else {
                      this.messageService.addErrorMessage(
                        "Failed to query commit info",
                        this.currentEntry?.multihash
                      )
                    }
                  });
              }
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
    this.subLinks!.forEach((link) => {
      this.tagService.insertEntry(link.name, link.link, link.type);
    })
    this.messageService.addSuccessMessage(
      `Flattened ${this.subLinks!.length} entries.`
    );
    this.tagService.deleteEntry(this.currentEntry!.uuid);
    this.router.navigate(['/chunks']).catch((err) => console.error(err));
  }

  remove() {
    this.tagService.deleteEntry(this.currentEntry!.uuid);
    this.messageService.addInfoMessage(`${this.currentEntry!.uuid} deleted.`)
    this.location.back();
  }

  showVersionDialog: boolean = false;
  needParentLink: boolean = true;

  createVersion() {
    this.needParentLink = false;
    this.showVersionDialog = true;
    this.httpService.createCommit(
      `commit-${new Date().getTime()}`,
      Math.floor(new Date().getTime() / 1000),
      "commit message", // TODO
      null,
      {
        name: this.currentEntry!.name,
        link: this.currentEntry!.multihash,
        type: this.entryType!
      },
      { // TODO empty here
        name: "",
        link: "",// TODO
        type: 'BLOB'
      }
    ).subscribe((resp) => {
      // TODO
    });
  }

  updateVersion() {
    this.needParentLink = true;
    this.showVersionDialog = true;

  }

  download() {
    this.httpService.downloadChunk(this.currentEntry!.name, this.currentEntry!.multihash);
  }

  rename() {
    let newName: string = this.newNameForm.value as string;
    let returned = this.tagService.renameEntry(this.currentEntry!.uuid, newName);
    if (returned == null) {
      this.messageService.addErrorMessage("Rename failed: Current entry not found");
    } else {
      this.currentEntry!.name = newName;
    }
    this.showRenameDialog = false;
  }
}
