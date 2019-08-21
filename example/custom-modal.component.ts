import { ViewChild, Component } from '@angular/core';
import { ModalComponent } from '../src/index';

@Component({
    template: `
<modal [isOpen]="true" [settings]="{popupClass: 'select-me'}" [routed]="true">
    <modal-header title="Heading"></modal-header>
    <modal-content>
        Custom Modal Content (popupClass: 'select-me')
    </modal-content>
</modal>
    `
})
export class CustomModalComponent {

    @ViewChild(ModalComponent, { static: true }) protected modal: ModalComponent;

    constructor(
    ) { }

}
