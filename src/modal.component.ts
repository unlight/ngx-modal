import { Input, Output, Component, ElementRef, EventEmitter, Inject, OnDestroy, ViewChild, Renderer2, ContentChild, OnInit, HostListener } from '@angular/core';
import { createFocusManager, OPTIONS, ModalOptions } from './modal-library';
import { ModalHeaderComponent } from './modal-header.component';
import { Subscription } from 'rxjs/Subscription';
import { Location } from '@angular/common';
import { ActivatedRoute, Router, PRIMARY_OUTLET, UrlSegment } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
    exportAs: 'modal',
    selector: 'modal',
    template: `<div [class]="options.popupClass" [ngClass]="ngClassValues">
            <section [class]="options.bodyClass" tabindex="0" #body>
                <ng-content></ng-content>
            </section>
        </div>`
})
export class ModalComponent implements OnDestroy, OnInit {

    @Input() routed: boolean;
    @Input() isOpen: boolean;
    @Input() isNotification: boolean;
    @Input() settings: Partial<ModalOptions>;
    @Output() onClose: EventEmitter<any> = new EventEmitter();
    @Output() onOpen: EventEmitter<any> = new EventEmitter();
    @ViewChild('body') protected body: ElementRef;
    @ContentChild(ModalHeaderComponent) protected header: ModalHeaderComponent;
    options: ModalOptions;
    protected closeSubscription: Subscription;

    constructor(
        @Inject(OPTIONS) modalOptions: ModalOptions,
        protected renderer: Renderer2,
        protected location: Location,
        protected router: Router,
        protected activatedRoute: ActivatedRoute,
    ) {
        this.options = modalOptions;
    }

    ngOnInit() {
        this.options = { ...this.options, ...this.settings };
        if (this.isOpen) {
            this.open();
        }
    }

    close(event?: any) {
        this.cleanUp();
        this.onClose.emit(event);
        this.isOpen = false;
        if (this.isRouteModal()) {
            if (this.options.routeOnClose) {
                if (this.isAuxRoute() && Array.isArray(this.options.routeOutlets)) {
                    const outlets = this.options.routeOutlets.reduce((acc, outlet) => (acc[outlet] = null, acc), {});
                    this.router.navigate(['.', { outlets }], { relativeTo: this.activatedRoute.parent });
                } else {
                    this.router.navigate(['.'], { relativeTo: this.activatedRoute.parent });
                }
            } else if (this.options.backOnClose) {
                this.location.back();
            }
        }
    }

    protected isRouteModal() {
        if (typeof this.routed === 'boolean') {
            return this.routed;
        }
        if (this.activatedRoute.snapshot.data.routed) {
            return true;
        }
        if (this.isAuxRoute()) {
            return true;
        }
        let result = false;
        const urlSegments = (this.activatedRoute.url as BehaviorSubject<UrlSegment[]>).value;
        if (urlSegments.length === 1) {
            const activatedUrlSegment = String(urlSegments[0]);
            const routeConfig = this.activatedRoute.parent && this.activatedRoute.parent.routeConfig;
            if (routeConfig && routeConfig.children && activatedUrlSegment) {
                result = routeConfig.children
                    .map(x => x.path)
                    .indexOf(activatedUrlSegment) !== -1;
            }
        }
        return result;
    }

    protected isAuxRoute() {
        let result: boolean = false;
        let route: ActivatedRoute = this.activatedRoute;
        result = route.outlet !== PRIMARY_OUTLET;
        do {
            result = route.outlet !== PRIMARY_OUTLET;
            if (result) {
                break;
            }
        } while (route = route.parent as ActivatedRoute);
        return result;
    }

    open(event?: any) {
        this.onOpen.emit(event);
        this.isOpen = true;
        this.doOnOpen();
    }

    ngOnDestroy() {
        this.cleanUp();
    }

    @HostListener('document:keydown', ['$event'])
    keyDownHandler(e: KeyboardEvent) {
        switch (e.key) {
            case 'Esc':
            case 'Escape':
                this.close(e);
                break;
            case 'Tab':
                this.onTabKeyDown(e);
                break;
        }
    }

    get ngClassValues() {
        return {
            [this.options.isOpenClass]: this.isOpen,
            [this.options.isNotificationClass]: this.isNotification,
        };
    }

    protected onTabKeyDown(e: KeyboardEvent) {
        if (!this.isOpen) {
            return;
        }
        let focusChanged = false;
        const fm = createFocusManager(this.body.nativeElement, (e.target || e.srcElement) as Node);
        if (e.shiftKey) {
            if (fm.isFocusOutside() || fm.isFocusInFirst()) {
                focusChanged = fm.focusLast();
            }
        } else {
            if (fm.isFocusOutside() || fm.isFocusInLast()) {
                focusChanged = fm.focusFirst();
                // focusChanged = true;
            }
        }
        if (focusChanged) {
            e.preventDefault();
            e.stopPropagation();
        }
    }

    protected doOnOpen() {
        if (this.header) {
            this.closeSubscription = this.header.closeEventEmitter.subscribe((e: Event) => {
                this.close(e);
            });
        }
        setTimeout(() => {
            const element = this.body.nativeElement;
            element && element.focus && element.focus();
        });
        this.preventBackgroundScrolling();
    }

    protected cleanUp() {
        if (this.isOpen) {
            this.enableBackgroundScrolling();
        }
        if (this.closeSubscription) {
            this.closeSubscription.unsubscribe();
        }
    }

    protected enableBackgroundScrolling() {
        this.backgroundScrolling(true);
    }

    protected preventBackgroundScrolling() {
        this.backgroundScrolling(false);
    }

    protected backgroundScrolling(value: boolean) {
        const body = document.querySelector('body');
        if (body) {
            const method = (value) ? 'removeClass' : 'addClass';
            this.renderer[method](body, this.options.popupOpenedClass);
        }
    }
}
