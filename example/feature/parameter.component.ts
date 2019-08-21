import { Component, ViewChild } from '@angular/core';
import { ModalComponent } from '../../src/index';

@Component({
    template: `
            <a href="#" (click)="false">non route modal</a><br/>
            <a href="#" (click)="open(); false">open()</a>
            <a href="#" (click)="close(); false">close()</a>
            <br/>

<modal [routed]="false">
    <modal-header title="Non route modal"></modal-header>
    <modal-content>
        non route modal Content
    </modal-content>
</modal>
    `
})
export class ParameterComponent {

    @ViewChild(ModalComponent, { static: true }) modal: ModalComponent;
    isOpen: boolean;

    open() {
        this.modal.open();
    }

    close() {
        this.modal.close();
    }
}
