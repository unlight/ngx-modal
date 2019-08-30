/* eslint-disable @typescript-eslint/tslint/config */
import { ModalConfirmComponent } from './modal-confirm.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ModalModule } from './modal.module';
import { ModalConfirm3Component } from './modal-confirm3.component';
import { By } from '@angular/platform-browser';

describe('ModalConfirmComponent', () => {

    let component: ModalConfirmComponent;
    let fixture: ComponentFixture<ModalConfirmComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
                ModalModule,
            ],
            declarations: [],
            schemas: [],
            providers: [],
        });
    });

    it('smoke test', () => {
        fixture = TestBed.createComponent(ModalConfirmComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        expect(fixture).toBeTruthy();
        expect(component).toBeTruthy();
    });

    it('isOpen getter', () => {
        fixture = TestBed.createComponent(ModalConfirmComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        expect(component.isOpen).toBeFalsy();
        component.open();
        expect(component.isOpen).toEqual(true);
    });

    it('ok should close modal', () => {
        fixture = TestBed.createComponent(ModalConfirmComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        spyOn(component, 'close');
        component.ok();
        expect(component.close).toHaveBeenCalledWith();
    });

    it('cancel should close modal', () => {
        fixture = TestBed.createComponent(ModalConfirmComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        spyOn(component, 'close');
        component.cancel();
        expect(component.close).toHaveBeenCalledWith();
    });

    it('okay should return true from result', done => {
        fixture = TestBed.createComponent(ModalConfirmComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        component.okay.subscribe(done);
        component.open();
        component.ok();
    });

    it('emit false on close button', (done) => {
        fixture = TestBed.createComponent(ModalConfirm3Component);
        component = fixture.componentInstance;
        component.markForOpen();
        fixture.detectChanges();
        const element = fixture.debugElement.query(By.css('modal-header [data-dismiss="modal"]'));
        component.result.subscribe(result => {
            expect(result).toEqual(false);
            done();
        });
        element.triggerEventHandler('click', null);
    });

    it('escape should emit false', (done) => {
        fixture = TestBed.createComponent(ModalConfirmComponent);
        component = fixture.componentInstance;
        component.markForOpen();
        fixture.detectChanges();
        component.result.subscribe(result => {
            expect(result).toEqual(false);
            done();
        });
        document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    });

});
