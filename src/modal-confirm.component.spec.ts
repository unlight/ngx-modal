/* eslint-disable @typescript-eslint/tslint/config */
import { ModalConfirmComponent } from './modal-confirm.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ModalModule } from './modal.module';

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

});
