import { ViewChild, Component } from '@angular/core';
import { ModalComponent } from '../src/index';

@Component({
    template: `
<modal [isOpen]="true">
    <modal-header title="Heading"></modal-header>
    <modal-content>
        Example Modal Content
        <a href="#">Link</a>
    </modal-content>
</modal>
    `
})
export class ExampleModalComponent {

    @ViewChild(ModalComponent) protected modal: ModalComponent;

    constructor(
    ) { }

}
