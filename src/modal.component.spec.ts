/* eslint-disable @typescript-eslint/tslint/config */
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { Component, ViewChild, DebugElement } from '@angular/core';
import { ModalComponent } from './modal.component';
import { ModalModule } from './modal.module';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute, Router, PRIMARY_OUTLET } from '@angular/router';

describe('ModalComponent:', () => {

    let component: ModalComponent;
    let fixture: ComponentFixture<ModalComponent>;
    let de: DebugElement;

    beforeEach(async(() => {
        TestBed
            .configureTestingModule({
                imports: [
                    RouterTestingModule,
                    ModalModule,
                ],
                declarations: [
                ],
                schemas: [],
                providers: [
                ],
            })
            .compileComponents()
            .then(() => {
                fixture = TestBed.createComponent(ModalComponent);
                component = fixture.componentInstance;
                de = fixture.debugElement;
            });
    }));

    it('smoke', () => {
        expect(component).toBeTruthy();
    });

    it('open event should be emitted', (done) => {
        fixture.detectChanges();
        component.openmodal.subscribe(() => done());
        component.open();
    });

    it('open method should set isOpen', () => {
        fixture.detectChanges();
        component.open();
        expect(component.isOpen).toBe(true);
    });

    it('keydown should be handled', () => {
        spyOn(component, 'keyDownHandler');
        const event = document.createEvent('KeyboardEvent');
        event.initKeyboardEvent('keydown', true, true, window, 'Tab', event.location, '', event.repeat, event.locale);
        document.dispatchEvent(event);
        expect(component.keyDownHandler).toHaveBeenCalled(); // eslint-disable-line jasmine/prefer-toHaveBeenCalledWith
    });

    describe('route aux related', () => {

        let navigate: jasmine.Spy;
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

        beforeEach(async(() => {
            TestBed.resetTestingModule();
            TestBed
                .configureTestingModule({
                    imports: [
                        RouterTestingModule,
                        ModalModule,
                    ],
                    providers: [
                        { provide: ActivatedRoute, useValue: mockActivatedRoute },
                    ],
                })
                .compileComponents()
                .then(() => {
                    fixture = TestBed.createComponent(ModalComponent);
                    component = fixture.componentInstance;
                    de = fixture.debugElement;
                });
        }));

        it('aux route checks parents', () => {
            fixture.detectChanges();
            const router: Router = TestBed.get(Router);
            const navigate = spyOn(router, 'navigate');
            component.close();

            expect(router.navigate).toHaveBeenCalledWith(['.', { outlets: { modal: null } }], { });
        });

    });

});
