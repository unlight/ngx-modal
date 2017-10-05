import { Component, Inject } from '@angular/core';
import { ModalOptions, OPTIONS } from './modal-library';

@Component({
    selector: 'modal-content',
    template: `<main [class]="options.contentClass">
        <ng-content></ng-content>
    </main>`
})
export class ModalContentComponent {

    constructor(
        @Inject(OPTIONS) public readonly options: ModalOptions,
    ) { }
}
