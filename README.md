# ngx-modal
Open modal window for your Angular X application

INSTALL
---
```
npm i -S ngx-modal2
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
    content="Are you are sure?"
    (onClose)="onCloseConfirm()"
></modal-confirm>
<a (click)="openConfirm()">Confirm</a>
```
3. Add `openConfirm` method
```ts
export class AppComponent {

    @ViewChild(ModalConfirmComponent) private confirm: ModalConfirmComponent;
    confirmSubscription: Subscription;

    protected openConfirm() {
        this.confirm.open();
        this.confirmSubscription = this.confirm.okay.subscribe(() => {
            console.log('Okay...');
        });
    }

    protected onCloseConfirm() {
        this.confirmSubscription.unsubscribe();
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
    /**
     * Class wrapper for modal-confirm2 component buttons toolbar
     */
    confirmCancelButtonClass: '',
    confirmFooterButtonsClass: '',
    /**
     * When true, when modal closes router.navigate() will be called with options relativeTo: activatedRoute.parent
     */
    closeRelativeToParent: false,
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
* `settings: Partial<ModalOptions>` Custom settings for modal,
  supported settings: routeOnClose, routeOutlets, backOnClose, isOpenClass, isNotificationClass, popupOpenedClass

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
* `isNotification: boolean` If true add notification class popup
* `settings: Partial<ModalOptions>`
* `okayLabel: string = 'Okay'` Okay button label
* `cancelLabel: string = 'Cancel'`

Outputs:
* `onClose: EventEmitter<void>` 

Properties:
* `result`: readonly Subject<boolean>` Result of confirm
* `isOpen: readonly boolean`
* `okay: readonly Observable<boolean>` Observable of result filtered to true

Methods:
* `open` Open modal confirm

#### ModalConfirm2Component

Selector: `modal-confirm2`

Inputs: See `ModalConfirmComponent`

Properties: See `ModalConfirmComponent`

Methods: See `ModalConfirmComponent`

ModalConfirm2Component inherits ModalConfirmComponent, the only difference is markup.
In ModalConfirm2Component `modal-footer` is not used.

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


DEVELOPMENT
---
* release: `npm run release`

CHANGELOG
---
* 4.7.1: Updated some dependecies (replaced electron by chrome-headless)
* 4.7.0: Ability to prevent memory leak in modal confirm component
* 4.6.6: Introduced modal-confirm2 component
* 4.6.3: Pass settings from modal-confirm to modal component
* 4.6.2: Fixed class names for modal confirm component
* 4.6.1: new option closeRelativeToParent
* 4.6.0: Fixed detection of aux route
* 4.5.0: added input settings for modal component
* 4.3.0: added type to buttons
* 4.2.0: added license
* 4.1.0: introduced `routed` input property
* 4.0.0: fixed aot
* 3.3.0: fixed aot
* 3.1.0: fixed closing for confirm
* 3.0.0: removed routeOutlets, routeOnClose options - replaced by backOnClose option
* 2.0.0: fixed closing route modal in lazy components
* 1.1.1: refactoring
* 1.1.0: angular package format [ng-packagr](https://github.com/dherges/ng-packagr)
* 1.1.0: added unit tests
* 1.0.0: first release
