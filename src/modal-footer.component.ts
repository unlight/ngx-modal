import { Component, Inject, AfterViewInit, ElementRef } from '@angular/core';
import { OPTIONS, ModalOptions, unwrap } from './modal-library';

@Component({
    selector: 'modal-footer',
    template: `<ng-container><footer [class]="options.footerClass">
        <ng-content></ng-content>
    </footer></ng-container>`,
})
export class ModalFooterComponent implements AfterViewInit {

    constructor(
        @Inject(OPTIONS) public readonly options: ModalOptions,
        private readonly elementReference: ElementRef,
    ) { }

    ngAfterViewInit() {
        unwrap(this.elementReference.nativeElement);
    }
}
