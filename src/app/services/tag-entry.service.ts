import {Injectable} from '@angular/core';
import {TagEntry} from "../models/TagEntry";
import {v4 as uuidV4} from 'uuid';
import {Observable, of} from "rxjs";
import {HttpService} from "./http.service";
import {map} from "rxjs/operators";
import {ObjectType, StatusEntry} from "../models/Response";

@Injectable({
  providedIn: 'root'
})
export class TagEntryService {

  private list: TagEntry[] | null = null;
  private typeInfo: Map<TagEntry, ObjectType> = new Map<TagEntry, ObjectType>();

  constructor(
    private httpService: HttpService
  ) {
  }

  public hasLoaded(): boolean {
    return this.list != null;
  }

  private updateTypeList(): Observable<boolean> {
    return this.httpService.queryLinkStatus((this.list ?? []).map((it) => it.multihash))
      .pipe(map((resp) => {
        if (resp == null) return false;
        // fetch type info
        this.list!.forEach((it) => {
          let stats = resp[it.multihash] as StatusEntry;
          this.typeInfo.set(it, stats.type);
        });
        return true;
      }));
  }

  public load(l: TagEntry[]): Observable<boolean> {
    this.list = [];

    if (l != null) {
      this.list = l.map((it) => {
        // Load from json will be String, convert to Date obj
        it.lastUpdate = new Date(it.lastUpdate);
        return it;
      });
      return this.updateTypeList();
    }

    return of(true);
  }

  public export() {
    let data = JSON.stringify(this.list ?? []);
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

  public getRepoList(): TagEntry[] {
    return this.list!.filter((it) => this.typeInfo.get(it) != 'COMMIT').map((it) => {
      if (it.lastUpdate.constructor.name !== "Date") {
        console.error("Expect lastUpdate has type: Date, but actual is", it.lastUpdate.constructor.name);
      }
      return it
    });
  }

  public getType(entry: TagEntry): ObjectType | null {
    return this.typeInfo.get(entry) ?? null;
  }

  public getEntry(uuid: string): TagEntry | null {
    let resultList: TagEntry[] = this.list?.filter((it) => it.uuid == uuid) ?? [];
    if (resultList.length == 1)
      return resultList[0]
    if (resultList.length == 0)
      return null;
    // found duplication
    console.error("Duplicated uuid", uuid, resultList.length);
    return resultList[0];
  }

  public deleteEntry(uuid: string): TagEntry[] {
    let entry = this.list!.find((it) => it.uuid == uuid);
    if (entry) {
      let index = this.list!.indexOf(entry)
      if (index != -1)
        return this.list!.splice(index, 1);
    }
    return [];
  }

  public createTreeEntry(
    uuidList: string[],
    name: string
  ): Observable<string | null> {
    let links = uuidList.map((it) => this.list!.find((t) => t.uuid == it)!)
      .map((it) => {
        return {
          name: it.name,
          link: it.multihash,
          type: this.typeInfo.get(it)!
        }
      })
    return this.httpService.createTree(name, links).pipe(map((resp) => {
      if (resp == null)
        return null;
      let entry = this.createRepoEntry(resp.name, resp.link, resp.type);
      return entry.uuid;
    }));
  }

  /**
   * Create a tag and push into list.
   *
   * Return TagEntry.
   * */
  public createRepoEntry(
    name: string,
    multihash: string,
    type: ObjectType
  ): TagEntry {
    let uuid = "";

    do {
      uuid = uuidV4()
    } while (this.list!.filter((it) => it.uuid == uuid).length != 0);

    let entry = {
      uuid: uuid,
      name: name,
      multihash: multihash,
      lastUpdate: new Date()
    };

    this.list!.push(entry);
    this.typeInfo.set(entry, type);

    return entry;
  }

  public renameEntry(
    uuid: string,
    newName: string
  ): string | null {
    let find = this.list!.filter((it) => it.uuid == uuid);
    if (find.length == 0) {
      console.log("uuid not found:", uuid);
      return null;
    }

    let entry = find[0];
    let oldName = entry.name;
    entry.name = newName;
    return oldName;
  }

  /**
   * Update a existing tag.
   *
   * Return old multihash if success, return null if name not found.
   * */
  public updateEntry(
    uuid: string,
    multihash: string,
    type: ObjectType
  ): string | null {
    let find = this.list!.filter((it) => it.uuid == uuid);
    if (find.length == 0) {
      console.log("uuid not found:", uuid);
      return null;
    }

    let tag = find[0];
    let oldMultihash = tag.multihash;
    tag.multihash = multihash;
    tag.lastUpdate = new Date();
    this.typeInfo.set(tag, type);

    return oldMultihash;
  }
}
