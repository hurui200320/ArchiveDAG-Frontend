import { Injectable } from '@angular/core';
import {Subject} from "rxjs";
import { RxState } from '@rx-angular/state';

@Injectable({
  providedIn: 'root'
})
export class MemStorageService {

  public authState: RxState<{ strategy: string; user: any}> = new RxState<{ strategy: string; user: any}>();
  public currentUser: RxState<{ username: string }> = new RxState<{username: string}>();

  constructor() { }
}
