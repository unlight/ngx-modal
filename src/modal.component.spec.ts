/* eslint-disable @typescript-eslint/tslint/config */
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { Component, ViewChild, DebugElement } from '@angular/core';
import { ModalComponent } from './modal.component';
import { ModalModule } from './modal.module';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute, Router, PRIMARY_OUTLET } from '@angular/router';

describe('ModalComponent:', () => {

    let component: ModalComponent;
    let fixture: ComponentFixture<ModalComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
                ModalModule,
            ],
            declarations: [
            ],
            schemas: [],
            providers: [
            ],
        });
    });

    it('smoke', () => {
        fixture = TestBed.createComponent(ModalComponent);
        component = fixture.componentInstance;
        expect(component).toBeTruthy();
    });

    it('open event should be emitted', (done) => {
        fixture = TestBed.createComponent(ModalComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        component.openmodal.subscribe(() => done());
        component.open();
    });

    it('open method should set isOpen', () => {
        fixture = TestBed.createComponent(ModalComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        component.open();
        expect(component.isOpen).toBe(true);
    });

    it('keydown should be handled', () => {
        fixture = TestBed.createComponent(ModalComponent);
        component = fixture.componentInstance;
        spyOn(component, 'keyDownHandler');
        const event = document.createEvent('KeyboardEvent');
        event.initKeyboardEvent('keydown', true, true, window, 'Tab', event.location, '', event.repeat, '');
        document.dispatchEvent(event);
        expect(component.keyDownHandler).toHaveBeenCalled(); // eslint-disable-line jasmine/prefer-toHaveBeenCalledWith
    });

    it('escape if modal is not visible should not call close', () => {
        fixture = TestBed.createComponent(ModalComponent);
        component = fixture.componentInstance;
        spyOn(component, 'close');
        const event = document.createEvent('KeyboardEvent');
        event.initKeyboardEvent('keydown', true, true, window, 'Escape', event.location, '', event.repeat, '');
        document.dispatchEvent(event);
        expect(component.close).not.toHaveBeenCalled();
    });

    describe('route aux related', () => {

        const mockActivatedRoute = {
            snapshot: {
                data: {},
            },
            outlet: PRIMARY_OUTLET,
            parent: {
                outlet: 'AUX',
                parent: {
                    outlet: PRIMARY_OUTLET,
                    parent: null,
                },
            },
        };

        beforeEach(() => {
            TestBed.overrideProvider(ActivatedRoute, { useValue: mockActivatedRoute });
        });

        it('aux route checks parents', () => {
            fixture = TestBed.createComponent(ModalComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();
            const router: Router = TestBed.get(Router);
            const navigate = spyOn(router, 'navigate');
            component.close();

            expect(router.navigate).toHaveBeenCalledWith(['.', { outlets: { modal: null } }], {});
        });

    });

});
