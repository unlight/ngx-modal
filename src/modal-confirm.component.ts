/* tslint:disable:no-import-side-effect */
import { Component, ViewChild, Input, ElementRef, Inject, OnInit, EventEmitter, Output } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/take';
import { ModalComponent } from './modal.component';
import { ModalOptions, OPTIONS } from './modal-library';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'modal-confirm',
    template: `<modal (closemodal)="onCloseModal()" [routed]="false" [isNotification]="isNotification" [settings]="settings">
    <modal-header [title]="title" [hasCloseButton]="false">
        <ng-content select="[header]"></ng-content>
    </modal-header>
    <modal-content>
        <div [innerHTML]="content"></div>
    </modal-content>
    <modal-footer>
        <div [class]="options.confirmFooterToolbarClass">
            <button role="ok" type="button" [class]="options.confirmOkayButtonClass"
                (click)="ok()">{{ okayLabel }}</button>
            <button role="cancel" type="button" [class]="options.confirmCancelButtonClass"
                (click)="cancel()">{{ cancelLabel }}</button>
        </div>
    </modal-footer>
</modal>`,
})
export class ModalConfirmComponent implements OnInit {

    @Input() title: string;
    @Input() content: string;
    @Input() isNotification: boolean;
    @Input() okayLabel = 'Okay';
    @Input() cancelLabel = 'Cancel';
    @Input() settings: Partial<ModalOptions> = {};
    @Output() closemodal = new EventEmitter<void>();
    options: ModalOptions;
    @ViewChild(ModalComponent) private readonly modal: ModalComponent;
    readonly result: Subject<boolean> = new Subject<boolean>();
    readonly okay = this.result
        .filter(value => value)
        .take(1);

    constructor(
        @Inject(OPTIONS) private readonly modalOptions: ModalOptions,
    ) { }

    ngOnInit() {
        this.options = { ...this.modalOptions, ...this.settings };
    }

    open() {
        this.result.next(false);
        if (this.modal) {
            this.modal.open();
        }
    }

    get isOpen() {
        return this.modal.isOpen;
    }

    close() {
        if (this.modal) {
            this.modal.close();
        }
    }

    ok() {
        this.result.next(true);
        this.close();
    }

    cancel() {
        this.result.next(false);
        this.close();
    }

    onCloseModal() {
        this.closemodal.emit();
    }
}
