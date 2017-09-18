import { Component, Input, Inject, EventEmitter } from '@angular/core';
import { ModalOptions, OPTIONS } from './modal-library';

@Component({
    selector: 'modal-header',
    template: `<header [class]="options.headerClass">
        <button *ngIf="hasCloseButton" type="button" (click)="closeEventEmitter.next($event)"
            [class]="options.buttonCloseClass"
            [innerHTML]="options.buttonCloseContent"></button>
        <h1 *ngIf="title">{{title}}</h1>
        <ng-content></ng-content>
    </header>`
})
export class ModalHeaderComponent {

    @Input() public title: string;
    @Input() public hasCloseButton: boolean;
    public closeEventEmitter: EventEmitter<any> = new EventEmitter();

    constructor(
        @Inject(OPTIONS) public readonly options: ModalOptions,
    ) {
        this.hasCloseButton = this.options.hasCloseButton;
    }
}
