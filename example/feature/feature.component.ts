import { Component } from '@angular/core';

@Component({
  template: `
<div>
    <a [routerLink]="['/']">Home</a> |
    <a [routerLink]="['/', { outlets: { 'modal': 'lazyx'} }]">outlets: modal:'lazyx'</a>
</div>

<h3>Feature Module</h3>
<p>
    This module is lazy loaded when first navigated to.
</p>
    <hr/>
    <router-outlet></router-outlet>
    <router-outlet name="modal"></router-outlet>
`

})
export class FeatureComponent { }
