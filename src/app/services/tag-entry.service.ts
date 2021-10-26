import {Injectable} from '@angular/core';
import {TagEntry} from "../models/TagEntry";
import {DomSanitizer} from "@angular/platform-browser";

@Injectable({
  providedIn: 'root'
})
export class TagEntryService {

  private list: TagEntry[] | null = null;

  constructor(
    private sanitizer: DomSanitizer
  ) {
  }

  public hasLoaded(): boolean {
    return this.list != null;
  }

  public load(l: TagEntry[]) {
    this.list = l.map((it) => it);
  }

  public export() {
    let data = JSON.stringify(this.list);
    this.dynamicDownloadByHtmlTag("repo.json", data);
  }

  private setting = {
    element: {
      dynamicDownload: null as (HTMLElement | null)
    }
  }

  private dynamicDownloadByHtmlTag(
    fileName: string,
    text: string
  ) {
    if (!this.setting.element.dynamicDownload) {
      this.setting.element.dynamicDownload = document.createElement('a');
    }
    const element = this.setting.element.dynamicDownload;
    const fileType = fileName.indexOf('.json') > -1 ? 'text/json' : 'text/plain';
    element.setAttribute('href', `data:${fileType};charset=utf-8,${encodeURIComponent(text)}`);
    element.setAttribute('download', fileName);

    let event = new MouseEvent("click");
    element.dispatchEvent(event);
  }

  public getEntryList(): ReadonlyArray<TagEntry> {
    return this.list ?? [];
  }
}
