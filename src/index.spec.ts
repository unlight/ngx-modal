/* eslint-disable @typescript-eslint/tslint/config */
import { Component, ViewContainerRef } from '@angular/core';
import { ModalModule } from './modal.module';
import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ModalConfirmService } from './modal-confirm.service';
import { ModalConfirmComponent } from './modal-confirm.component';
import { take } from 'rxjs/operators';

describe('Component usage', () => {

    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;

    @Component({
        template: `
        <modal>
            <modal-header>its header</modal-header>
            <modal-content>its content</modal-content>
            <modal-footer>its footer</modal-footer>
        </modal>
        `,
    })
    class TestComponent {
        constructor(
            public viewContainerRef: ViewContainerRef,
        ) { }
    }

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ModalModule, RouterTestingModule],
            declarations: [TestComponent],
            schemas: [],
            providers: [],
        });
    });

    it('smoke test', () => {
        TestBed.overrideComponent(TestComponent, { set: { template: `` } });
        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        expect(component).toBeTruthy();
    });

    it('modal confirmation service component should destroyed', async(() => {
        const service: ModalConfirmService = TestBed.get(ModalConfirmService);
        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;
        // const viewContainerRef = fixture.debugElement.injector.get(ViewContainerRef);
        const viewContainerRef = component.viewContainerRef;
        const observable = service.open(viewContainerRef, ModalConfirmComponent);
        fixture.detectChanges();
        observable
            .pipe(take(1))
            .subscribe();
        const button = document.querySelector<HTMLButtonElement>('modal-confirm button[role=cancel]');
        button!.click();
        expect(document.querySelector('modal-confirm')).toBeNull();
    }));

    it('possible to pass content and title to modal service', () => {
        const service: ModalConfirmService = TestBed.get(ModalConfirmService);
        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;
        const viewContainerRef = component.viewContainerRef;
        const observable = service.open(viewContainerRef, ModalConfirmComponent, {
            title: 'Really?',
            content: 'RocketLauncher',
            okayLabel: 'Yes',
            cancelLabel: 'No',
        });
        fixture.detectChanges();
        const modalConfirm = document.querySelector('modal-confirm');
        expect(modalConfirm!.querySelector('modal-header')!.textContent).toEqual('Really?');
        expect(modalConfirm!.querySelector('modal-content')!.textContent).toEqual('RocketLauncher');
        expect(modalConfirm!.querySelector('[role=ok]')!.textContent).toEqual('Yes');
        expect(modalConfirm!.querySelector('[role=cancel]')!.textContent).toEqual('No');
        observable.subscribe();
        (<any>observable).complete();
        expect(document.querySelector('modal-confirm')).toBeNull();
    });
});
