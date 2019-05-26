import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalHeaderComponent } from './modal-header.component';
import { ModalModule } from './modal.module';
import { Subscription } from 'rxjs/Subscription';

let component: ModalHeaderComponent;
let fixture: ComponentFixture<ModalHeaderComponent>;
let button: HTMLButtonElement;

describe('ModalHeaderComponent', () => {

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ModalModule],
            declarations: [],
            schemas: [],
            providers: [],
        });
    });

    it('smoke test', () => {
        fixture = TestBed.createComponent(ModalHeaderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        expect(fixture).toBeTruthy();
        expect(component).toBeTruthy();
    });

    it('title', () => {
        fixture = TestBed.createComponent(ModalHeaderComponent);
        component = fixture.componentInstance;
        component.title = 'swaddler';
        fixture.detectChanges();
        expect(fixture.nativeElement.querySelector('h1').innerHTML).toBe('swaddler');
        component.title = '';
        fixture.detectChanges();
        expect(fixture.nativeElement.querySelector('h1')).toBeFalsy();
    });

    it('hasCloseButton', () => {
        fixture = TestBed.createComponent(ModalHeaderComponent);
        component = fixture.componentInstance;
        component.hasCloseButton = true;
        fixture.detectChanges();
        expect(fixture.nativeElement.querySelector('[data-dismiss="modal"]')).toBeTruthy();
    });

    it('click closemodal event', (done) => {
        fixture = TestBed.createComponent(ModalHeaderComponent);
        component = fixture.componentInstance;
        component.hasCloseButton = true;
        fixture.detectChanges();
        button = fixture.nativeElement.querySelector('[data-dismiss="modal"]');
        const subscription: Subscription = component.closeEventEmitter.subscribe(() => {
            subscription.unsubscribe();
            done();
        });
        button.click();
    });

});
