/// <reference path="../node_modules/@types/node/index.d.ts" />
import { Component, ViewChild } from '@angular/core';
import { ModalConfirmComponent } from '../src/index';

require('../src/ngx-modal.css');

@Component({
    selector: 'app',
    template: `
    <a [routerLink]="[{ outlets: { 'modal': 'x'} }]">Modal 1</a> |
    <a [routerLink]="[{ outlets: { 'modal': 'mx'} }]">Modal 2</a> |
    <a [routerLink]="[{ outlets: { 'modal': 'data-routed'} }]">Modal (data routed)</a> |
    <a (click)="openConfirm()">Confirm</a> |
    <a routerLink="/feature">Go to Feature Module (lazy loaded)</a> |
    <a routerLink="/feature/123">parameter-comp</a> |
    <a routerLink="/custom_modal">custom_modal</a> |
    <hr/>
    <router-outlet></router-outlet>
    <hr/>
    <modal-confirm #confirm
        title="Confirmation"
        okayLabel="OK"
        cancelLabel="CANCEL"
        [isNotification]="true"
        [settings]="{bodyClass:'ngx-modal-body ngx-modal-body2'}"
        content="Are you are sure?"></modal-confirm>
<router-outlet name="modal"></router-outlet>
<router-outlet name="lazy_modal"></router-outlet>
    `,
})
export class AppComponent {

    @ViewChild(ModalConfirmComponent) private confirm: ModalConfirmComponent;

    constructor(
    ) {
    }

    protected openConfirm() {
        this.confirm.open();
        this.confirm.okay.subscribe(() => {
            console.log('Okay...'); // eslint-disable-line no-console
        });
    }
}
