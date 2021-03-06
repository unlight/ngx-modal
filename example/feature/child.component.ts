import { Component } from '@angular/core';

@Component({
    template: `
        child component
        <a [routerLink]="['/', { outlets: { 'modal': 'lazyx'} }]">/ outlets: modal:'lazyx' </a> |
        <a [routerLink]="['/', { outlets: { 'modal': 'mxx'} }]">/ outlets: modal:'mxx'</a> |
        <-- this works only in app.component outlet with name=modal and  path: ':code'
        (wich match modal with any name, but show ExampleModalComponent 1) but we need
        <br/>
        <a [routerLink]="['.', { outlets: { 'lazy_modal': 'mxx'} }]">/ outlets: modal:'mxx' lazy modal</a> <br/>
        <a [routerLink]="['./children_lazy_modal_component']">primary children_lazy_modal_comp</a> <br/>

    `
})
export class ChildComponent {}
