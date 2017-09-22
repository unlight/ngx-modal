/// <reference path="../node_modules/@types/jasmine/index.d.ts" />
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
                    ModalModule
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
        component.onOpen.subscribe(() => done());
        component.open();
    });

    it('open method should set isOpen', () => {
        component.open();
        expect(component.isOpen).toBe(true);
    });

    it('keydown should be handled', () => {
        spyOn(component, 'keyDownHandler');
        const e = document.createEvent('KeyboardEvent');
        e.initKeyboardEvent('keydown', true, true, window, 'Tab', e.location, '', e.repeat, e.locale);
        document.dispatchEvent(e);
        expect(component.keyDownHandler).toHaveBeenCalled();
    });


    describe('route aux related', () => {

        let navigate: jasmine.Spy;
        let mockActivatedRoute = {
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
            }
        };

        beforeEach(async(() => {
            TestBed.resetTestingModule();
            TestBed
                .configureTestingModule({
                    imports: [
                        RouterTestingModule,
                        ModalModule
                    ],
                    declarations: [
                    ],
                    schemas: [],
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
            let router: Router = TestBed.get(Router);
            const navigate = spyOn(router, 'navigate');
            component.close();
            expect(router.navigate).toHaveBeenCalledWith(['.', { outlets: { modal: null } }], { });
        });

    });

});
