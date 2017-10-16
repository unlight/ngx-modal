import { Component, ViewChild, Input, ElementRef, Inject } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/take';
import { ModalComponent } from './modal.component';
import { ModalOptions, OPTIONS } from './modal-library';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'modal-confirm',
    template: `<modal (onOpen)="onOpen()" [routed]="false">
    <modal-header [title]="title" [hasCloseButton]="false">
        <ng-content select="header"></ng-content>
    </modal-header>
    <modal-content>
        <div [innerHTML]="content"></div>
    </modal-content>
    <modal-footer>
        <div [class]="options.confirmFooterToolbarClass">
            <button role="ok" type="button" [class]="options.confirmOkayButtonClass"
                (click)="ok()">{{okayLabel}}</button>
            <button role="cancel" type="button" [class]="options.confirmCancelButtonClass"
                (click)="cancel()" #confirmCancel>{{cancelLabel}}</button>
        </div>
    </modal-footer>
</modal>`
})
export class ModalConfirmComponent {

    @Input() title: string;
    @Input() content: string;
    @Input() okayLabel: string = 'Okay';
    @Input() cancelLabel: string = 'Cancel';
    readonly result: Subject<boolean> = new Subject<boolean>();
    @ViewChild(ModalComponent) private modal: ModalComponent;
    @ViewChild('confirmCancel') private confirmCancel: ElementRef;

    constructor(
        @Inject(OPTIONS) public readonly options: ModalOptions,
    ) { }

    open() {
        this.result.next(false);
        if (this.modal) {
            this.modal.open();
        }
    }

    get isOpen() {
        return this.modal.isOpen;
    }

    get okay(): Observable<boolean> {
        return this.result.asObservable()
            .filter(value => value)
            .take(1);
    }

    protected close() {
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

    onOpen() {
        setTimeout(() => {
            const element = this.confirmCancel.nativeElement;
            element && element.focus && element.focus();
        });
    }
}
