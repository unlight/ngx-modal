import { Component, Inject } from '@angular/core';
import { OPTIONS, ModalOptions } from './modal-library';

@Component({
    selector: 'modal-footer',
    template: `<footer [class]="options.footerClass">
        <ng-content></ng-content>
    </footer>`
})
export class ModalFooterComponent {

    constructor(
        @Inject(OPTIONS) public readonly options: ModalOptions,
    ) { }
}
