import { Component } from '@angular/core';
import { ModalModule } from './modal.module'
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

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
    class TestComponent { }

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ModalModule, RouterTestingModule],
            declarations: [TestComponent],
            schemas: [],
            providers: [],
        });
    });

    it('smoke test', () => {
        // TestBed.overrideComponent(TestComponent, { set: { template: `` } });
        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        expect(component).toBeTruthy();
    });
});
