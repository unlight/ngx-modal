import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './modal.component';
import { ModalContentComponent } from './modal-content.component';
import { ModalFooterComponent } from './modal-footer.component';
import { ModalHeaderComponent } from './modal-header.component';
import { ModalOptions, defaultOptions, OPTIONS } from './modal-library';
import { ModalConfirmComponent } from './modal-confirm.component';

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
    ],
    exports: [
        ModalComponent,
        ModalContentComponent,
        ModalFooterComponent,
        ModalHeaderComponent,
        ModalConfirmComponent,
    ],
    providers: [
        { provide: 'MODAL_DEFAULT_OPTIONS', useValue: defaultOptions },
        { provide: 'MODAL_ROOT_OPTIONS', useValue: defaultOptions },
        { provide: OPTIONS, useValue: defaultOptions },
    ]
})
export class ModalModule {

    static forRoot(options: Partial<ModalOptions> = {}): ModuleWithProviders {
        return {
            ngModule: ModalModule,
            providers: [
                { provide: 'MODAL_ROOT_OPTIONS', useValue: options },
                { provide: OPTIONS, useFactory: createOptions, deps: ['MODAL_DEFAULT_OPTIONS', 'MODAL_ROOT_OPTIONS'] },
            ]
        };
    }

    static forChild(options: Partial<ModalOptions> = {}): ModuleWithProviders {
        return {
            ngModule: ModalModule,
            providers: [
                { provide: 'MODAL_CHILD_OPTIONS', useValue: options },
                { provide: OPTIONS, useFactory: createOptions, deps: ['MODAL_DEFAULT_OPTIONS', 'MODAL_ROOT_OPTIONS', 'MODAL_CHILD_OPTIONS'] },
            ]
        };
    }
}

export function createOptions(...options) {
    return Object.assign({}, ...options);
}
