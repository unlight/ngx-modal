import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { ModalConfirmService, ModalConfirmComponent, ModalConfirm2Component, ModalConfirm3Component } from '../src';
import { take } from 'rxjs/operators';

require('../src/ngx-modal.css');

@Component({
    selector: 'app',
    template: `
    <div style="margin: 0 auto" [style.width]="styleWidth">
    <a [routerLink]="[{ outlets: { 'modal': 'x'} }]">Modal 1</a> <br/>
    <a href="javascript:;" (click)="toggleScroll($event)">toggle scroll</a><br/>
    <a [routerLink]="[{ outlets: { 'modal': 'data-routed'} }]">Modal (data routed)</a> <br/>

    <a (click)="openConfirm()">Confirm</a> <br/>
    <a (click)="openConfirm2()">Confirm2</a> <br/>
    modalConfirmService: <button (click)="openModalConfirmService($event, 1)">Open 1</button> <br/>
    modalConfirmService: <button (click)="openModalConfirmService($event, 2)">Open 2</button> <br/>
    modalConfirmService: <button (click)="openModalConfirmService($event, 3)">Open 3</button> <br/>

    <a routerLink="/feature">Go to Feature Module (lazy loaded)</a> <br/>
    <a routerLink="/feature/123">parameter component</a> <br/>
    <a routerLink="/custom_modal">custom_modal</a> <br/>
    <hr/>
    router-outlet: <br/>
    <router-outlet></router-outlet>
    <hr/>
        text for scroll:
        keratoplasty unleashed retinian quirksey kilometer peste penacute heredium fluxionally loxodontous cloudlike counterpunch darger animastical shackle mentor birkremite undeservedness intensional sortation twinkless prematernity juvenile Philippan
        indefatigable sophistically piperitious Tubulifera prochlorite anthochlorine tobaccoism sphincterectomy photographical scybalous meteorographic cirrose isochronical unprofound Nemalion Arctogaean favous equanimous Languedocian Mohammad aground antivolition caulotaxy adhaka
    <hr/>
        <a [routerLink]="[{ outlets: { 'modal': 'mx'} }]">Modal 2</a> <br/>
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
</div>
    `,
})
export class AppComponent {

    @ViewChild(ModalConfirmComponent, { static: true }) private confirm: ModalConfirmComponent;
    @ViewChild(ModalConfirm2Component, { static: true }) private confirm2: ModalConfirm2Component;
    confirmSubscription: Subscription;
    confirm2Subscription: Subscription;
    styleWidth: string | null;

    constructor(
        private modalConfirmService: ModalConfirmService,
        private viewContainerRef: ViewContainerRef,
    ) { }

    openModalConfirmService(event: Event, type: number) {
        const [componentType] = [
            [ModalConfirmComponent, 1],
            [ModalConfirm2Component, 2],
            [ModalConfirm3Component, 3],
        ].find(([, num]) => type === num)!;

        this.modalConfirmService.open(this.viewContainerRef, <any>componentType)
            .pipe(take(1))
            .subscribe(result => {
                console.log('confirm result', result);
            });
    }

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

    toggleScroll(e: Event) {
        if (this.styleWidth) {
            this.styleWidth = null;
        } else {
            this.styleWidth = '100px';
        }
    }

}
