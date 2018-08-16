/// <reference path="../node_modules/@types/node/index.d.ts" />
import { Component, ViewChild } from '@angular/core';
import { ModalConfirmComponent } from '../src/index';
import { ModalConfirm2Component } from '../src/index';
import { Subscription } from 'rxjs';

require('../src/ngx-modal.css');

@Component({
    selector: 'app',
    template: `
    <a [routerLink]="[{ outlets: { 'modal': 'x'} }]">Modal 1</a> |
    <a [routerLink]="[{ outlets: { 'modal': 'mx'} }]">Modal 2</a> |
    <a [routerLink]="[{ outlets: { 'modal': 'data-routed'} }]">Modal (data routed)</a> |
    <a (click)="openConfirm()">Confirm</a> |
    <a (click)="openConfirm2()">Confirm2</a> |
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
        (onClose)="confirmClose()"
        content="Are you are sure?"></modal-confirm>
    <modal-confirm2 #confirm2
        title="Confirmation2"
        okayLabel="OK"
        cancelLabel="CANCEL"
        [isNotification]="true"
        [settings]="{confirmOkayButtonClass: 'x-right', confirmCancelButtonClass: 'x-right'}"
        (onClose)="confirm2Close()"
        content="Second confirm: Are you are sure?"></modal-confirm2>
<router-outlet name="modal"></router-outlet>
<router-outlet name="lazy_modal"></router-outlet>
    `,
})
export class AppComponent {

    @ViewChild(ModalConfirmComponent) private confirm: ModalConfirmComponent;
    @ViewChild(ModalConfirm2Component) private confirm2: ModalConfirm2Component;
    confirmSubscription: Subscription;
    confirm2Subscription: Subscription;

    constructor(
    ) {
    }

    openConfirm() {
        this.confirm.open();
        this.confirmSubscription = this.confirm.okay.subscribe(() => {
            console.log('Okay...'); // eslint-disable-line no-console
        });
    }

    confirmClose() {
        this.confirmSubscription.unsubscribe();
    }

    openConfirm2() {
        this.confirm2.open();
        this.confirm2Subscription = this.confirm2.okay.subscribe(() => {
            console.log('Okay...'); // eslint-disable-line no-console
        });
    }

    confirm2Close() {
        this.confirm2Subscription.unsubscribe();
    }
}
