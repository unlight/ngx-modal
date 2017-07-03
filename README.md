# ngx-modal
Open modal window for your Angular X application

INSTALL
---
```
npm i -S @epam/ngx-modal
```

USAGE
---
#### Example 1: Route modal
1. Add `<router-outlet name="modal"></router-outlet>` to `AppComponent` template
2. Configure `AppModule`
```
// app.module.ts
@NgModule({
    imports: [
        ModalModule.forRoot(options),
        RouterModule.forRoot([
            { path: 'greet/:user', outlet: 'modal', component: GreetingsModalComponent },
        ]),
    ]
})
export class AppModule { }
```
3. Add link, e.g. `<a [routerLink]="['.', { outlets: { 'modal': 'greet/joe'} }]">Greetings, Joe!</a>`
4. Create `GreetingsModalComponent`
```ts
@Component({
    template: `
<modal [isOpen]="true">
    <modal-header title="Greetings"></modal-header>
    <modal-content>Example Modal Content</modal-content>
</modal>
    `
})
export class GreetingsModalComponent {

    @ViewChild(ModalComponent) protected modal: ModalComponent;

    constructor() { }

}
```

#### Example 2: Confirm
1. Import `ModalConfirmComponent`
2. Add following markup to your component template
```
<modal-confirm #confirm 
    title="Confirmation" 
    content="Are you are sure?"></modal-confirm>
<a (click)="openConfirm()">Confirm</a>
```
3. Add `openConfirm` method
```ts
export class AppComponent {

    @ViewChild(ModalConfirmComponent) private confirm: ModalConfirmComponent;

    protected openConfirm() {
        this.confirm.open();
        this.confirm.okay.subscribe(() => {
            console.log('Okay...');
        });
    }
}
```

CONFIGURATION
---
`ModalModule` has some configuration
```
@NgModule({
    imports: [
        ModalModule.forRoot(modalOptions),
    ]
})
```
Where `modalOptions` is defaults of following:
```ts
export const defaultOptions: ModalOptions = {
    popupOpenedClass: 'ngx-modal-popup-opened',
    isOpenClass: 'ngx-modal-open',
    isNotificationClass: 'ngx-modal-notification',
    popupClass: 'ngx-modal-popup',
    bodyClass: 'ngx-modal-body',
    headerClass: 'ngx-modal-header',
    footerClass: 'ngx-modal-footer',
    contentClass: 'ngx-modal-content',
    /**
     * Class for close button in modal-header component.
     */
    buttonCloseClass: 'ngx-modal-button-close',
    /**
     * Content in close button tag.
     */
    buttonCloseContent: '&times;',
    /**
     * Navigate back when modal close
     */
    backOnClose: true,
    hasCloseButton: true,
    confirmFooterToolbarClass: 'ngx-modal-confirm-footer-toolbar',
    confirmOkayButtonClass: '',
    confirmCancelButtonClass: '',
};
```

API
---
#### ModalModule
* `ModalModule.forRoot(modalOptions)` override default options
* `ModalModule.forChild(modalOptions)` set modal options for this module

#### ModalComponent

Selector: `modal`

Inputs:
* `routed: boolean` Set flag indicating that modal is routed
* `isOpen: boolean` Open modal when component initialized
* `isNotification: boolean`

Outputs:
* `onClose: EventEmitter<any>`
* `onOpen: EventEmitter<any>`

Methods:
* `open: void` Open modal
* `close: void` Close modal

#### ModalConfirmComponent

Selector: `modal-confirm`

Inputs:
* `title: string`
* `content: string`
* `okayLabel: string = 'Okay'` Okay button label
* `cancelLabel: string = 'Cancel'`

Properties:
* `result`: readonly Subject<boolean>` Result of confirm
* `isOpen: readonly boolean`
* `okay: readonly Observable<boolean>` Observable of result filtered to true

Methods:
* `open` Open modal confirm

#### ModalHeaderComponent

Selector: `modal-header`

Inputs:
* `title: string`
* `hasCloseButton: boolean`

Properties:
* `closeEventEmitter: EventEmitter<any>`

#### ModalFooterComponent

Selector: `modal-footer`

#### ModalContentComponent

Selector: `modal-content`

CHANGELOG
---
* 4.2.0: added license
* 4.1.0: introduced `routed` input property
* 4.0.0: fixed aot
* 3.3.0: fixed aot
* 3.1.0: fixed closing for confirm
* 3.0.0: removed routeOutlets, routeOnClose options - replaced by backOnClose option
* 2.0.0: fixed closing route modal in lazy components
* 1.1.1: refactoring
* 1.1.0: angular package format [ng-packagr](https://github.com/dherges/ng-packagr)
* 1.1.0-0: added unit tests
* 1.0.0: first release
