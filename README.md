# ngx-modal
Open modal window for your Angular X application

## INSTALL
```
npm i -S <package-name>
```

## USAGE
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
    (closemodal)="onCloseConfirm()"
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

## CONFIGURATION
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
    /**
     * Class wrapper for modal-confirm2 component buttons toolbar.
     */
    confirmFooterButtonsClass: '',
    confirmFooterButtonItemClass: '',
    confirmOkayButtonClass: '',
    confirmCancelButtonClass: '',
    /**
     * When true, when modal closes router.navigate() will be called with options relativeTo: activatedRoute.parent
     */
    closeRelativeToParent: false,
    /**
     * Content box class for modal-confirm3 component
     */
    confirmContentBoxClass: '',
};
```

## API
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
* `closemodal: EventEmitter<void>`
* `openmodal: EventEmitter<void>`

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
* `closemodal: EventEmitter<void>` 

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

#### ModalConfirm3Component

Selector: `modal-confirm3`

Inputs: See `ModalConfirmComponent`

Properties: See `ModalConfirmComponent`

Methods: See `ModalConfirmComponent`

ModalConfirm3Component inherits ModalConfirmComponent, the only difference is markup.  
Used more advanced markup in footer.

#### ModalHeaderComponent

Selector: `modal-header`

Inputs:
* `title: string`
* `hasCloseButton: boolean`
* `closeButtonId: string`

Properties:
* `closeEventEmitter: EventEmitter<any>`

#### ModalFooterComponent

Selector: `modal-footer`

#### ModalContentComponent

Selector: `modal-content`

#### ModalConfirmService
Create modal confirm popup dynamically.

Methods:
* `open(viewContainerRef: ViewContainerRef, componentType: Type<ModalConfirmComponent>, settings?: Partial<ModalConfirmComponent>): Observable<boolean>`

Example usage:
```js
export class AppComponent {

    constructor(
        private modalConfirmService: ModalConfirmService,
        private viewContainerRef: ViewContainerRef,
    ) { }

    openModalConfirmService() {
        this.modalConfirmService.open(this.viewContainerRef, ModalConfirmComponent)
            .pipe(take(1))
            .subscribe(result => {
                // true - ok, false - cancel
                console.log('confirm result', result);
            });
    }
}
```
**Note:** You MUST subscribe to observable, otherwise modal will not be closed.

## DEVELOPMENT
* `npm run dev`

