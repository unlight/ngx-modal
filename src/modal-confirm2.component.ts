import { Component } from '@angular/core';
import { ModalConfirmComponent } from './modal-confirm.component';

@Component({
    selector: 'modal-confirm2',
    template: `<modal (closemodal)="onCloseModal()" [routed]="false" [isNotification]="isNotification" [settings]="settings">
    <modal-header [title]="title" [hasCloseButton]="false">
        <ng-content select="[header]"></ng-content>
    </modal-header>
    <modal-content>
        <p [innerHTML]="content"></p>
        <div [class]="options.confirmFooterToolbarClass">
            <div [class]="options.confirmFooterButtonsClass">
                <button role="cancel" type="button" [class]="options.confirmCancelButtonClass" (click)="cancel()">{{ cancelLabel }}</button>
                <button role="ok" type="button" [class]="options.confirmOkayButtonClass" (click)="ok()">{{ okayLabel }}</button>
            </div>
        </div>
    </modal-content>
</modal>`,
})
export class ModalConfirm2Component extends ModalConfirmComponent {
}
