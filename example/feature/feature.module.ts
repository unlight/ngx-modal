import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeatureComponent } from './feature.component';
import { ModalModule } from '../../src/index';
import { RouterModule } from '@angular/router';
import { LazyModalComponent } from '../lazy-modal.component';
import { ChildComponent } from './child.component';
import { ParameterComponent } from './parameter.component';

const featureRoutes = [
    {
        path: '', component: FeatureComponent, children: [
            { path: '', component: ChildComponent },
            { path: 'children_lazy_modal_component', component: LazyModalComponent },
            { path: 'children_lazy_modal_component2', component: LazyModalComponent },
        ]
    },
    { path: 'mxx', component: LazyModalComponent, outlet: 'lazy_modal' },
    { path: ':reqid', component: ParameterComponent },
];

@NgModule({
    imports: [
        CommonModule,
        ModalModule.forChild({ buttonCloseContent: '(X)', routeOutlets: ['lazy_modal', 'modal'] }),
        RouterModule.forChild(featureRoutes),
    ],
    declarations: [
        ParameterComponent,
        FeatureComponent,
        LazyModalComponent,
        ChildComponent,
    ],
})
export class FeatureModule { }
