import {Component, OnInit} from '@angular/core';
import {SimpleMessageService} from "../../services/simple-message.service";
import {TagEntry} from "../../models/TagEntry";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpService} from "../../services/http.service";
import {TagEntryService} from "../../services/tag-entry.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  constructor(
    private messageService: SimpleMessageService,
    private httpService: HttpService,
    private tagService: TagEntryService,
    private router: Router
  ) {
  }

  private backendUrlControl: FormControl = new FormControl('http://localhost:8888', Validators.required)
  form: FormGroup = new FormGroup({
    backendUrl: this.backendUrlControl
  });

  ngOnInit(): void {
  }

  loadedTags: TagEntry[] = [];
  private resolving: boolean = false;
  busying: boolean = false;

  handleSelectFile(event: any) {
    let files: File[] = event.currentFiles;
    if (files.length == 0) {
      this.messageService.addErrorMessage(
        'No file selected',
        'Event triggered, but no file is found.',
      );
      return;
    }

    let file: File = files[0];

    this.messageService.addInfoMessage(
      'Resolving repo content...',
      `File name: ${file.name}`);
    this.resolving = true;
    file.text().then((text) => {
      let content = JSON.parse(text);
      console.log("loaded content", content);
      if (this.resolving) {
        this.loadedTags = content;
        this.messageService.addSuccessMessage(`Loaded ${this.loadedTags.length} tag(s)`);
      } else {
        console.log("Discard resolved result...")
      }
    }).catch((reason) => {
      this.messageService.addErrorMessage(
        'Failed to load tag repo',
        `Cannot load tag repo from '${file.name}'. ` +
        "Please refer to console for more detailed error info.",
      );
      console.error('Cannot load tag repo.', reason);
    }).finally(() => {
      this.resolving = false;
    });
  }

  onSubmit() {
    this.busying = true;
    let host = this.backendUrlControl.value;
    this.httpService.setHost(host)
      .subscribe((value) => {
        if (value == host) {
          console.log("Validate backend!");
          this.tagService.load(this.loadedTags);
          this.router.navigate(["/home"]).then(r => {
            if (!r) this.messageService.addErrorMessage("Cannot navigate to home page");
          });
        } else {
          this.messageService.addErrorMessage("Cannot validate backend");
        }
        this.busying = false;
      })
  }

  handleClearFile(event: any) {
    this.resolving = false;
    this.loadedTags = [];
    this.messageService.addInfoMessage(
      "Cleared loaded repo",
      `Unload file: ${event.file.name}`);
  }
}
