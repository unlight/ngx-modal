import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './modal.component';
import { ModalContentComponent } from './modal-content.component';
import { ModalFooterComponent } from './modal-footer.component';
import { ModalHeaderComponent } from './modal-header.component';
import { ModalOptions, defaultOptions, OPTIONS } from './modal-library';
import { ModalConfirmComponent } from './modal-confirm.component';
import { ModalConfirm2Component } from './modal-confirm2.component';
import { ModalConfirm3Component } from './modal-confirm3.component';
import { ModalConfirmService } from './modal-confirm.service';

@NgModule({
    imports: [
        CommonModule,
    ],
    declarations: [
        ModalComponent,
        ModalContentComponent,
        ModalFooterComponent,
        ModalHeaderComponent,
        ModalConfirmComponent,
        ModalConfirm2Component,
        ModalConfirm3Component,
    ],
    exports: [
        ModalComponent,
        ModalContentComponent,
        ModalFooterComponent,
        ModalHeaderComponent,
        ModalConfirmComponent,
        ModalConfirm2Component,
        ModalConfirm3Component,
    ],
    providers: [
        { provide: 'MODAL_OPTIONS_DEFAULT', useValue: defaultOptions },
        { provide: 'MODAL_OPTIONS_ROOT', useValue: defaultOptions },
        { provide: OPTIONS, useValue: defaultOptions },
        { provide: ModalConfirmService, useClass: ModalConfirmService },
    ],
    entryComponents: [
        ModalConfirmComponent,
        ModalConfirm2Component,
        ModalConfirm3Component,
    ]
})
export class ModalModule {

    static forRoot(options: Partial<ModalOptions> = {}): ModuleWithProviders { // tslint:disable-line:function-name
        return {
            ngModule: ModalModule,
            providers: [
                { provide: 'MODAL_OPTIONS_ROOT', useValue: options },
                { provide: OPTIONS, useFactory: createOptions, deps: ['MODAL_OPTIONS_DEFAULT', 'MODAL_OPTIONS_ROOT'] },
            ],
        };
    }

    static forChild(options: Partial<ModalOptions> = {}): ModuleWithProviders { // tslint:disable-line:function-name
        return {
            ngModule: ModalModule,
            providers: [
                { provide: 'MODAL_CHILD_OPTIONS', useValue: options },
                { provide: OPTIONS, useFactory: createOptions, deps: ['MODAL_OPTIONS_DEFAULT', 'MODAL_OPTIONS_ROOT', 'MODAL_CHILD_OPTIONS'] },
            ],
        };
    }
}

export function createOptions(...options: Partial<ModalOptions>[]) {
    return Object.assign({}, ...options);
}
