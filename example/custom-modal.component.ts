import { ViewChild, Component } from '@angular/core';
import { ModalComponent } from '../src/index';

@Component({
    template: `
<modal [isOpen]="true" [settings]="{popupClass: 'select-me'}">
    <modal-header title="Heading"></modal-header>
    <modal-content>
        Custom Modal Content (popupClass: 'select-me')
    </modal-content>
</modal>
    `
})
export class CustomModalComponent {

    @ViewChild(ModalComponent) protected modal: ModalComponent;

    constructor(
    ) { }

}
