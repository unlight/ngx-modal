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

});
