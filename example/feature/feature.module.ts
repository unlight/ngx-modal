import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeatureComponent } from './feature.component';
import { ModalModule } from '../../src/index';
import { RouterModule } from '@angular/router';
import { LazyModalComponent } from '../lazy-modal.component';
import { Child1Component } from './child1.component';
import { ParamComponent } from './parameter-comp';

const featureRoutes = [
    {
        path: '', component: FeatureComponent, children: [
            { path: '', component: Child1Component },
            { path: 'children_lazy_modal_comp', component: LazyModalComponent },
            { path: 'children_lazy_modal_comp2', component: LazyModalComponent },
        ]
    },
    { path: 'mxx', component: LazyModalComponent, outlet: 'lazy_modal' },
    { path: ':reqid', component: ParamComponent },
];

@NgModule({
    imports: [
        CommonModule,
        ModalModule.forChild({ buttonCloseContent: '(X)', routeOutlets: ['lazy_modal', 'modal'] }),
        RouterModule.forChild(featureRoutes),
    ],
    declarations: [
        ParamComponent,
        FeatureComponent,
        LazyModalComponent,
        Child1Component,
    ],
})
export class FeatureModule { }
