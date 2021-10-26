import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {TagEntryService} from "../services/tag-entry.service";

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(
    private tagService: TagEntryService,
    private router: Router
  ) {
  }

  canActivate(): boolean {
    if (this.tagService.hasLoaded())
      return true;
    this.router.navigate(['']).then((r) => {
      if (!r) console.error("Cannot navigate to default page");
    });
    return false;
  }

}