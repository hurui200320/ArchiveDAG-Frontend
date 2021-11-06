import { Component, OnInit } from '@angular/core';
import {TagEntry} from "../../models/TagEntry";
import {TagEntryService} from "../../services/tag-entry.service";
import {SimpleMessageService} from "../../services/simple-message.service";

@Component({
  selector: 'app-repo-chunks',
  templateUrl: './repo-chunks.component.html',
  styleUrls: ['./repo-chunks.component.css']
})
export class RepoChunksComponent implements OnInit {

  tags: TagEntry[] = [];
  selectedTags: TagEntry[] = [];

  constructor(
    private tagService: TagEntryService,
    private messageService: SimpleMessageService
  ) { }

  ngOnInit(): void {
    this.refresh();
  }

  private refresh() {
    this.tags = this.tagService.getChunkList();
  }

  removeSelected() {
    this.selectedTags.forEach((it) => {
      this.tagService.deleteEntry(it.uuid)
    })
    this.messageService.addInfoMessage(`Removed ${this.selectedTags.length} tags.`)
    this.selectedTags = [];
    this.refresh();
  }

  createTree() {
    this.tagService.createTreeEntry(this.selectedTags.map((it) => it.uuid), `folder-${new Date().getTime()}`)
      .subscribe((resp) => {
        if (resp != null) {
          this.removeSelected()
          this.messageService.addSuccessMessage(`Create tree uuid: ${resp}`, undefined, 5000, true)
        }
      });
  }

}
