import { Component, ViewChild, Input, Inject, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { ModalComponent } from './modal.component';
import { ModalOptions, OPTIONS } from './modal-library';
import { filter, take } from 'rxjs/operators';

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
export class ModalConfirmComponent implements OnInit, OnDestroy {

    @Input() title: string = 'Confirmation';
    @Input() content: string = 'Are you sure you want to do that?';
    @Input() isNotification: boolean;
    @Input() okayLabel = 'Okay';
    @Input() cancelLabel = 'Cancel';
    @Input() settings: Partial<ModalOptions> = {};
    @Output() closemodal = new EventEmitter<void>();
    options: ModalOptions;
    @ViewChild(ModalComponent, { static: true }) private readonly modal: ModalComponent;
    readonly result: Subject<boolean> = new Subject<boolean>();
    readonly okay = this.result.pipe(
        filter(value => value),
        take(1),
    );
    private subscription: Subscription;

    constructor(
        @Inject(OPTIONS) private readonly modalOptions: ModalOptions,
    ) { }

    ngOnInit() {
        this.options = { ...this.modalOptions, ...this.settings };
        this.subscription = this.modal.cancelmodal
            .subscribe(() => {
                this.result.next(false);
            });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    open() {
        this.result.next(false);
        this.modal.open();
    }

    get isOpen() {
        return this.modal.isOpen;
    }

    markForOpen() {
        this.modal.isOpen = true;
    }

    close() {
        this.modal.close();
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
