import { Component } from '@angular/core';
import { ModalConfirmComponent } from './modal-confirm.component';

@Component({
    selector: 'modal-confirm2',
    template: `<modal (onOpen)="onOpen()" [routed]="false" [isNotification]="isNotification" [settings]="settings">
    <modal-header [title]="title" [hasCloseButton]="false">
        <ng-content select="[header]"></ng-content>
    </modal-header>
    <modal-content>
        <p [innerHTML]="content"></p>
        <div [class]="options.confirmFooterToolbarClass">
            <div [class]="options.confirmFooterButtonsClass">
                <button role="ok" type="button" [class]="options.confirmOkayButtonClass"
                    (click)="ok()">{{okayLabel}}</button>
                <button role="cancel" type="button" [class]="options.confirmCancelButtonClass"
                    (click)="cancel()" #confirmCancel>{{cancelLabel}}</button>
            </div>
        </div>
    </modal-content>
</modal>`
})
export class ModalConfirm2Component extends ModalConfirmComponent {
}
