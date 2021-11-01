import {Component, OnInit} from '@angular/core';
import {HttpService} from "../../services/http.service";
import {SimpleMessageService} from "../../services/simple-message.service";
import {HttpResponse} from "@angular/common/http";
import {TagEntryService} from "../../services/tag-entry.service";
import {TagEntry} from "../../models/TagEntry";
import {ObjectType} from "../../models/Response";

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})
export class UploadFileComponent implements OnInit {

  uploadUrl: string = "";
  uploadedResult: TagEntry[] = [];

  constructor(
    private httpService: HttpService,
    private messageService: SimpleMessageService,
    private tagService: TagEntryService
  ) {
  }

  ngOnInit(): void {
    this.uploadUrl = this.httpService.getHost() + '/proto/chunk';
  }

  beforeUpload(event: any) {
    console.log("before upload", event);
    this.messageService.addInfoMessage(
      "Start uploading...",
      "Upload might take a long time, please wait patiently..."
    );
  }

  afterUpload(event: any) {
    console.log("after upload", event)
    let resp: HttpResponse<{ name: string, link: string, type: ObjectType }[]> = event.originalEvent;
    this.uploadedResult = resp.body?.map((result) => {
      return this.tagService.createRepoEntry(result.name, result.link, result.type);
    }) ?? [];

    if (this.uploadedResult.length == 0) {
      this.messageService.addErrorMessage(
        "Upload failed",
        `The response body is empty.`
      );
    } else {
      this.messageService.addSuccessMessage(
        "Upload successful",
        `Uploaded ${this.uploadedResult.length} file(s).`
      );
    }
  }

  uploadError(event: any) {
    this.messageService.addErrorMessage(
      "Upload failed",
      "Please refer to console for more detailed info."
    );
    console.log("upload error", event)
  }
}
