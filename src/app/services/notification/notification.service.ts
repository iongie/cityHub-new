import { Injectable } from '@angular/core';
import { NbGlobalPosition, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  index = 1;
  duration = 7000;
  constructor(
    public toastrService: NbToastrService,
  ) { }

  showSuccessTypeToast(title: string, body: string) {
    const status: NbToastStatus = NbToastStatus.SUCCESS;
    const position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
    const config = {
      status:  status,
      destroyByClick: true,
      duration: this.duration,
      hasIcon: true,
      position: position,
      preventDuplicates: false,
    };
    const titleContent = title ? `. ${title}` : '';

    this.index += 1;
    this.toastrService.show(
      body,
      `Notification ${this.index}${titleContent}`,
      config);
  }

  showInfoTypeToast(title: string, body: string) {
    const status: NbToastStatus = NbToastStatus.INFO;
    const position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
    const config = {
      status:  status,
      destroyByClick: true,
      duration: this.duration,
      hasIcon: true,
      position: position,
      preventDuplicates: false,
    };
    const titleContent = title ? `. ${title}` : '';

    this.index += 1;
    this.toastrService.show(
      body,
      `CH-Notification ${this.index}${titleContent}`,
      config);
  }

  showDangerTypeToast(title: string, body: string) {
    const status: NbToastStatus = NbToastStatus.DANGER;
    const position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
    const config = {
      status:  status,
      destroyByClick: true,
      duration: this.duration,
      hasIcon: true,
      position: position,
      preventDuplicates: false,
    };
    const titleContent = title ? `. ${title}` : '';

    this.index += 1;
    this.toastrService.show(
      body,
      `CH-Notification ${this.index}${titleContent}`,
      config);
  }

  showPrimaryTypeToast(title: string, body: string) {
    const status: NbToastStatus = NbToastStatus.DANGER;
    const position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
    const config = {
      status:  status,
      destroyByClick: true,
      duration: this.duration,
      hasIcon: true,
      position: position,
      preventDuplicates: false,
    };
    const titleContent = title ? `. ${title}` : '';

    this.index += 1;
    this.toastrService.show(
      body,
      `CH-Notification ${this.index}${titleContent}`,
      config);
  }

  showWarningTypeToast(title: string, body: string) {
    const status: NbToastStatus = NbToastStatus.WARNING;
    const position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
    const config = {
      status:  status,
      destroyByClick: true,
      duration: this.duration,
      hasIcon: true,
      position: position,
      preventDuplicates: false,
    };
    const titleContent = title ? `. ${title}` : '';

    this.index += 1;
    this.toastrService.show(
      body,
      `CH-Notification ${this.index}${titleContent}`,
      config);
  }
}
