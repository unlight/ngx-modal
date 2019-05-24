import { Component, Inject, ElementRef, AfterViewInit } from '@angular/core';
import { ModalOptions, OPTIONS, unwrap } from './modal-library';

@Component({
    selector: 'modal-content',
    template: `<main [class]="options.contentClass">
        <ng-content></ng-content>
    </main>`,
})
export class ModalContentComponent implements AfterViewInit {

    constructor(
        @Inject(OPTIONS) public readonly options: ModalOptions,
        private elementRef: ElementRef,
    ) { }

    ngAfterViewInit() {
        unwrap(this.elementRef.nativeElement);
    }
}
