import { ViewChild, Component } from '@angular/core';
import { ModalComponent } from '../src/index';

@Component({
    template: `
<modal [isOpen]="true">
    <modal-header title="Lazy"></modal-header>
    <modal-content>
        Example Lazy Modal Content
    </modal-content>
</modal>
    `
})
export class LazyModalComponent {

    @ViewChild(ModalComponent) protected modal: ModalComponent;

    constructor(
    ) { }

}
