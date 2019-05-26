import { Component, Inject } from '@angular/core';
import { OPTIONS, ModalOptions } from './modal-library';

@Component({
    selector: 'modal-footer',
    template: `<ng-container><footer [class]="options.footerClass">
        <ng-content></ng-content>
    </footer></ng-container>`,
})
export class ModalFooterComponent {

    constructor(
        @Inject(OPTIONS) public readonly options: ModalOptions,
    ) { }

}
