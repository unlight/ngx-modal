import { Component, ViewChild } from '@angular/core';
import { ModalConfirmComponent } from '../src/index';
import { ModalConfirm2Component } from '../src/index';
import { Subscription } from 'rxjs';

require('../src/ngx-modal.css');

@Component({
    selector: 'app',
    template: `
    <a [routerLink]="[{ outlets: { 'modal': 'x'} }]">Modal 1</a> <br/>
    <a [routerLink]="[{ outlets: { 'modal': 'mx'} }]">Modal 2</a> <br/>
    <a [routerLink]="[{ outlets: { 'modal': 'data-routed'} }]">Modal (data routed)</a> <br/>
    <a (click)="openConfirm()">Confirm</a> <br/>
    <a (click)="openConfirm2()">Confirm2</a> <br/>
    <a routerLink="/feature">Go to Feature Module (lazy loaded)</a> <br/>
    <a routerLink="/feature/123">parameter component</a> <br/>
    <a routerLink="/custom_modal">custom_modal</a> <br/>
    <hr/>
    router-outlet: <br/>
    <router-outlet></router-outlet>
    <hr/>
    modal-confirm:
    <modal-confirm #confirm
        title="Confirmation"
        okayLabel="OK"
        cancelLabel="CANCEL"
        [isNotification]="true"
        [settings]="{bodyClass:'ngx-modal-body ngx-modal-body2'}"
        (closemodal)="confirmClose()"
        content="Are you are sure?"></modal-confirm> <br/>
    modal-confirm2:
    <modal-confirm2 #confirm2
        title="Confirmation2"
        okayLabel="OK"
        cancelLabel="CANCEL"
        [isNotification]="true"
        [settings]="{confirmOkayButtonClass: 'x-right', confirmCancelButtonClass: 'x-right'}"
        (closemodal)="confirm2Close()"
        content="Second confirm: Are you are sure?"></modal-confirm2> <br/>
router-outlet name=modal: <router-outlet name="modal"></router-outlet> <br/>
router-outlet name=lazy_modal: <router-outlet name="lazy_modal"></router-outlet>
    `,
})
export class AppComponent {

    @ViewChild(ModalConfirmComponent, { static: true }) private confirm: ModalConfirmComponent;
    @ViewChild(ModalConfirm2Component, { static: true }) private confirm2: ModalConfirm2Component;
    confirmSubscription: Subscription;
    confirm2Subscription: Subscription;

    openConfirm() {
        this.confirm.open();
        this.confirmSubscription = this.confirm.okay.subscribe(() => {
            console.log('Okay...'); // eslint-disable-line no-console
        });
    }

    confirmClose() {
        this.confirmSubscription.unsubscribe();
        console.log('confirmClose');
    }

    openConfirm2() {
        this.confirm2.open();
        this.confirm2Subscription = this.confirm2.okay.subscribe(() => {
            console.log('Okay...'); // eslint-disable-line no-console
        });
    }

    confirm2Close() {
        this.confirm2Subscription.unsubscribe();
        console.log('confirm2Close');
    }
}
