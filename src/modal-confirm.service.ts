import { Injectable, ComponentFactoryResolver, Type, ViewContainerRef } from '@angular/core';
import { ModalConfirmComponent } from './modal-confirm.component';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';

/**
 * Create modal confirm popup dynamically.
 */
@Injectable()
export class ModalConfirmService {

    constructor(
        private readonly componentFactoryResolver: ComponentFactoryResolver,
    ) { }

    open(viewContainerRef: ViewContainerRef, componentType: Type<ModalConfirmComponent>): Observable<boolean> {
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentType);
        const componentRef = viewContainerRef.createComponent(componentFactory);
        componentRef.instance.markForOpen();
        return componentRef.instance.result
            .pipe(finalize(() => componentRef.destroy())); // tslint:disable-line:no-void-expression
    }
}
