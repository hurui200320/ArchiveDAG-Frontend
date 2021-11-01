import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {catchError, map, tap} from "rxjs/operators";
import {Observable, of, OperatorFunction} from "rxjs";
import {SimpleLink} from "../models/Response";

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private host: string = "";

  public getHost(): string {
    return this.host + "";
  }

  public setHost(newHost: string): Observable<string | null> {
    return this.testBackend(newHost)
      .pipe(map((resp) => {
        if (resp == null) {
          return null;
        } else {
          this.host = newHost;
          console.log("Set new backend", newHost);
          return newHost;
        }
      }));
  }

  private defaultErrorPipe<T>(): OperatorFunction<T, T | null> {
    return catchError<T, Observable<null>>((err) => {
      console.error("Http request failed:", err);
      return of(null);
    });
  }

  private testBackend(host: string): Observable<string | null> {
    let url = host + "/ping";
    console.log("Using url:", url);
    return this.httpClient.get(url, {
      responseType: 'text'
    })
      .pipe(this.defaultErrorPipe<string>())
      .pipe(tap((value) => {
        console.log("Get ping result:", value)
      }));
  }

  constructor(
    private httpClient: HttpClient
  ) {
  }

  public queryLinkStatus(links: string[]): Observable<any | null> {
    let url = this.host + "/proto/status";
    let param = new HttpParams().set("links", links.join(","));
    return this.httpClient.get<any>(url, {
      params: param
    })
      .pipe(this.defaultErrorPipe<any>());
  }

  public createTree(name: string, links: SimpleLink[]): Observable<SimpleLink | null> {
    let url = this.host + "/proto/tree";
    return this.httpClient.post<SimpleLink>(url, {
      name: name,
      links: links
    })
      .pipe(this.defaultErrorPipe<SimpleLink>());
  }
}
