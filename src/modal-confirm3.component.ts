import { Component } from '@angular/core';
import { ModalConfirmComponent } from './modal-confirm.component';

@Component({
    selector: 'modal-confirm3',
    template: `<modal (onOpen)="onOpen()" (onClose)="onCloseModal()" [routed]="false" [isNotification]="isNotification" [settings]="settings">
    <modal-header>
        <h2>{{ title }}</h2>
    </modal-header>
    <modal-content>
        <div [class]="options.confirmContentBoxClass"
            [innerHTML]="content"
        ></div>
    </modal-content>
    <modal-footer>
        <div [class]="options.confirmFooterToolbarClass">
            <ul [class]="options.confirmFooterButtonsClass">
                <li [class]="options.confirmFooterButtonItemClass">
                    <button role="cancel" type="button" [class]="options.confirmCancelButtonClass" (click)="cancel()" #confirmCancel data-dismiss="modal">{{ cancelLabel }}</button>
                </li>
                <li [class]="options.confirmFooterButtonItemClass">
                    <button role="ok" type="button" [class]="options.confirmOkayButtonClass" (click)="ok()">{{ okayLabel }}</button>
                </li>
            </ul>
        </div>
    </modal-footer>
</modal>`,
})
export class ModalConfirm3Component extends ModalConfirmComponent {
}
