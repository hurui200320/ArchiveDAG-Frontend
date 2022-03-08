import {Injectable} from '@angular/core';
import {catchError, Observable, of, OperatorFunction} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {NbTokenService} from "@nebular/auth";
import {CertDetails, CertStatus, NewCertResponse, UserDetails, UserStatus} from "../models/http-models";

// Use "err" in resp to see if the request is ok.
export interface HttpError {
  err: any
}

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private token: string = "";

  constructor(
    private httpClient: HttpClient,
    private tokenService: NbTokenService,
  ) {
    tokenService.tokenChange().subscribe(token => this.token = token.getValue());
  }

  private defaultErrorPipe<T>(): OperatorFunction<T, T | HttpError> {
    return catchError<T, Observable<HttpError>>((err) => {
      console.error("Http request failed:", err);
      return of({err: err});
    });
  }

  private static getUrl(endPoint: string): string {
    let backend = environment.backendBase;
    if (backend.endsWith("/")) // remove the ending `/`
      backend = backend.substring(0, backend.length - 1)
    if (endPoint.startsWith("/"))
      return backend + endPoint;
    else
      return backend + "/" + endPoint;
  }

  private getHeaderWithToken(): { Authorization: string } {
    return {Authorization: "Bearer " + this.token}
  }

  private doGet<T>(apiEndpoint: string, param: HttpParams): Observable<T | HttpError> {
    let url = HttpService.getUrl(apiEndpoint);
    return this.httpClient.get<T>(url, {
      headers: this.getHeaderWithToken(),
      params: param
    }).pipe(this.defaultErrorPipe<T>());
  }

  private doPost<T>(apiEndpoint: string, body: any | null): Observable<T | HttpError> {
    let url = HttpService.getUrl(apiEndpoint);
    return this.httpClient.post<T>(url, body, {
      headers: this.getHeaderWithToken()
    }).pipe(this.defaultErrorPipe<T>());
  }

  private doDelete<T>(apiEndpoint: string, param: HttpParams): Observable<T | HttpError> {
    let url = HttpService.getUrl(apiEndpoint);
    return this.httpClient.delete<T>(url, {
      headers: this.getHeaderWithToken(),
      params: param
    }).pipe(this.defaultErrorPipe<T>());
  }

  private doDeleteWithBody<T>(apiEndpoint: string, body: any | null): Observable<T | HttpError> {
    let url = HttpService.getUrl(apiEndpoint);
    return this.httpClient.delete<T>(url, {
      headers: this.getHeaderWithToken(),
      body: body
    }).pipe(this.defaultErrorPipe<T>());
  }

  private setting = {
    element: {
      dynamicDownload: null as (HTMLElement | null)
    }
  }

  public dynamicDownloadByHtmlTag(
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

  // ------------------------- API Implementation -------------------------

  // User API
  public whoami(): Observable<string | null> {
    let url = HttpService.getUrl("/user/whoami");
    return this.httpClient.get(url, {
      headers: this.getHeaderWithToken(),
      responseType: 'text'
    }).pipe(this.defaultErrorPipe<any>());
  }

  public listUsername(keyword: string, page: number, size: number): Observable<string[] | HttpError> {
    return this.doGet<string[]>("/user/listUsername", new HttpParams()
      .set("keyword", keyword)
      .set("page", page)
      .set("size", size)
      .set("sort", "username,asc"));
  }

  public queryUser(username: string): Observable<UserDetails | HttpError> {
    return this.doGet<UserDetails>("/user/queryUser", new HttpParams()
      .set("username", username));
  }

  public listUserRole(username: string): Observable<string[] | HttpError> {
    return this.doGet<string[]>("/user/listUserRoles", new HttpParams()
      .set("username", username));
  }

  public changeUserPassword(username: string, newPassword: string): Observable<null | HttpError> {
    return this.doPost<null>("/user/changePassword", {
      username: username,
      new_password: newPassword
    });
  }

  public changeUserStatus(username: string, newStatus: UserStatus): Observable<null | HttpError> {
    return this.doPost<null>("/user/changeStatus", {
      username: username,
      new_status: newStatus
    });
  }

  public createUser(username: string, password: string): Observable<null | HttpError> {
    return this.doPost<null>("/user/createUser", {
      username: username,
      password: password
    });
  }

  public deleteUser(username: string): Observable<null | HttpError> {
    return this.doDelete<null>("/user/deleteUser", new HttpParams()
      .set("username", username));
  }

  public addUserRole(username: string, role: string): Observable<null | HttpError> {
    return this.doPost<null>("/user/addUserRole", {
      username: username,
      role: role
    });
  }

  public removeUserRole(username: string, role: string): Observable<null | HttpError> {
    return this.doDeleteWithBody<null>("/user/removeUserRole", {
      username: username,
      role: role
    });
  }

  // Cert API

  public signNewCert(): Observable<NewCertResponse | HttpError> {
    return this.doGet<NewCertResponse>("/cert/signNewCert", new HttpParams());
  }

  public listCertSerialNumber(blurredOwner: string, page: number, size: number): Observable<string[] | HttpError> {
    return this.doGet<string[]>("/cert/listCertSerialNumber", new HttpParams()
      .set("owner", blurredOwner)
      .set("page", page)
      .set("size", size)
      .set("sort", "username,asc"));
  }

  public queryCert(serialNumber: string): Observable<CertDetails | HttpError> {
    return this.doGet<CertDetails>("/cert/queryCert", new HttpParams()
      .set("serial_number", serialNumber));
  }

  public changeCertStatus(serialNumber: string, newStatus: CertStatus): Observable<null | HttpError> {
    return this.doPost<null>("/cert/changeCertStatus", {
      serial_number: serialNumber,
      new_status: newStatus
    });
  }

  public deleteCert(serialNumber: string): Observable<null | HttpError> {
    return this.doDelete("/cert/deleteCert", new HttpParams()
      .set("serial_number", serialNumber));
  }

  // Maintenance API
  public listConfig(prefix: string, page: number, size: number): Observable<Map<string, string | null> | HttpError> {
    return this.doGet("/maintain/listConfig", new HttpParams()
      .set("prefix", prefix)
      .set("page", page)
      .set("size", size));
  }

  public updateConfig(config: Map<string, string | null>): Observable<null | HttpError> {
    return this.doPost<null>("/maintain/updateConfig", Object.fromEntries(config));
  }

}

