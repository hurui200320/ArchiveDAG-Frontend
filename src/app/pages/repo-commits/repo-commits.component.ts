import { Component, OnInit } from '@angular/core';
import {TagEntry} from "../../models/TagEntry";
import {TagEntryService} from "../../services/tag-entry.service";
import {SimpleMessageService} from "../../services/simple-message.service";

@Component({
  selector: 'app-repo-commits',
  templateUrl: './repo-commits.component.html',
  styleUrls: ['./repo-commits.component.css']
})
export class RepoCommitsComponent implements OnInit {

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
    this.tags = this.tagService.getCommitList();
  }

  removeSelected() {
    this.selectedTags.forEach((it) => {
      this.tagService.deleteEntry(it.uuid)
    })
    this.messageService.addInfoMessage(`Removed ${this.selectedTags.length} tags.`)
    this.selectedTags = [];
    this.refresh();
  }

}
