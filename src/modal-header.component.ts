import { Component, Input, Inject, EventEmitter } from '@angular/core';
import { ModalOptions, OPTIONS } from './modal-library';

@Component({
    selector: 'modal-header',
    template: `<header [class]="options.headerClass">
        <button *ngIf="hasCloseButton" type="button" (click)="closeEventEmitter.next($event)"
            data-dismiss="modal"
            [class]="options.buttonCloseClass"
            [innerHTML]="options.buttonCloseContent"
            [attr.id]="closeButtonId"
        ></button>
        <h1 *ngIf="title">{{ title }}</h1>
        <ng-content></ng-content>
    </header>`,
})
export class ModalHeaderComponent {

    @Input() title: string;
    @Input() hasCloseButton: boolean;
    @Input() closeButtonId: string;
    closeEventEmitter: EventEmitter<Event> = new EventEmitter();

    constructor(
        @Inject(OPTIONS) public readonly options: ModalOptions,
    ) {
        this.hasCloseButton = this.options.hasCloseButton;
    }
}
