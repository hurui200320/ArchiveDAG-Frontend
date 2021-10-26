import {Injectable} from '@angular/core';
import {MessageService} from "primeng/api";

@Injectable({
  providedIn: 'root'
})
export class SimpleMessageService {

  constructor(
    private messageService: MessageService
  ) {
  }

  private addMessage(
    severity: "success" | "info" | "warn" | "error",
    summary: string,
    detail: string | undefined,
    life: number,
    sticky: boolean
  ) {
    this.messageService.add({
      severity: severity,
      summary: summary,
      detail: detail,
      life: life,
      sticky: sticky
    });
  }

  public addSuccessMessage(
    summary: string,
    detail: string | undefined = undefined,
    life: number = 5000,
    sticky: boolean = false
  ) {
    this.addMessage("success", summary, detail, life, sticky)
  }

  public addInfoMessage(
    summary: string,
    detail: string | undefined = undefined,
    life: number = 5000,
    sticky: boolean = false
  ) {
    this.addMessage("info", summary, detail, life, sticky)
  }

  public addWarnMessage(
    summary: string,
    detail: string | undefined = undefined,
    life: number = 120_000,
    sticky: boolean = false
  ) {
    this.addMessage("warn", summary, detail, life, sticky)
  }

  public addErrorMessage(
    summary: string,
    detail: string | undefined = undefined,
    life: number = 300_000,
    sticky: boolean = true
  ) {
    this.addMessage("error", summary, detail, life, sticky)
  }
}
