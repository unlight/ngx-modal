import { Input, Output, Component, ElementRef, EventEmitter, Inject, OnDestroy, ViewChild, Renderer2, ContentChild, OnInit, HostListener } from '@angular/core';
import { OPTIONS, ModalOptions } from './modal-library';
import { ModalHeaderComponent } from './modal-header.component';
import { Subscription } from 'rxjs/Subscription';
import { Location } from '@angular/common';
import { ActivatedRoute, Router, PRIMARY_OUTLET, UrlSegment, NavigationExtras } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import focusTrap from 'focus-trap';

@Component({
    exportAs: 'modal',
    selector: 'modal',
    template: `<div [class]="options.popupClass" [ngClass]="ngClassValues">
            <section [class]="options.bodyClass" tabindex="0" #body>
                <ng-content></ng-content>
            </section>
        </div>`,
})
export class ModalComponent implements OnDestroy, OnInit {

    @Input() routed: boolean;
    @Input() isOpen: boolean;
    @Input() isNotification: boolean;
    @Input() settings: Partial<ModalOptions>;
    @Output() onClose: EventEmitter<Event | undefined> = new EventEmitter();
    @Output() onOpen: EventEmitter<Event | undefined> = new EventEmitter();
    options: ModalOptions;
    @ViewChild('body') private readonly body: ElementRef;
    @ContentChild(ModalHeaderComponent) private readonly header: ModalHeaderComponent;
    private closeSubscription: Subscription;
    private focusTrap: ReturnType<typeof focusTrap>;

    constructor(
        @Inject(OPTIONS) private readonly modalOptions: ModalOptions,
        private readonly renderer: Renderer2,
        private readonly location: Location,
        private readonly router: Router,
        private readonly activatedRoute: ActivatedRoute,
    ) { }

    ngOnInit() {
        this.options = { ...this.modalOptions, ...this.settings };
        if (this.isOpen) {
            this.open();
        }
    }

    close(event?: Event) {
        this.cleanUp();
        this.onClose.emit(event);
        this.isOpen = false;
        if (this.isRouteModal()) {
            if (this.options.routeOnClose) {
                if (this.isAuxRoute() && Array.isArray(this.options.routeOutlets)) {
                    const outlets = this.options.routeOutlets.reduce((acc, outlet) => (acc[outlet] = null, acc), {} as { [x: string]: null });
                    const navigateOptions: NavigationExtras = {};
                    if (this.options.closeRelativeToParent) {
                        navigateOptions.relativeTo = this.activatedRoute.parent;
                    }
                    this.router.navigate(['.', { outlets }], navigateOptions); // tslint:disable-line:no-floating-promises
                } else {
                    this.router.navigate(['.'], { relativeTo: this.activatedRoute.parent }); // tslint:disable-line:no-floating-promises
                }
            } else if (this.options.backOnClose) {
                this.location.back();
            }
        }
    }

    open(event?: Event) {
        this.onOpen.emit(event);
        this.isOpen = true;
        this.doOnOpen();
    }

    ngOnDestroy() {
        this.cleanUp();
    }

    @HostListener('document:keydown', ['$event'])
    keyDownHandler(event: KeyboardEvent) {
        switch (event.key) { // eslint-disable-line @typescript-eslint/tslint/config
            case 'Esc':
            case 'Escape':
                this.close(event);
        }
    }

    get ngClassValues() {
        return {
            [this.options.isOpenClass]: this.isOpen,
            [this.options.isNotificationClass]: this.isNotification,
        };
    }

    private doOnOpen() {
        if (this.header) {
            this.closeSubscription = this.header.closeEventEmitter.subscribe((event: Event) => {
                this.close(event);
            });
        }
        setTimeout(() => {
            const element = this.body.nativeElement;
            if (element && typeof element.focus === 'function') {
                element.focus();
                this.focusTrap = focusTrap(element);
                this.focusTrap.activate();
            }
        });
        this.preventBackgroundScrolling();
    }

    private cleanUp() {
        if (this.isOpen) {
            this.enableBackgroundScrolling();
        }
        if (this.closeSubscription) {
            this.closeSubscription.unsubscribe();
        }
        if (this.focusTrap) {
            this.focusTrap.deactivate();
        }
    }

    private enableBackgroundScrolling() {
        this.backgroundScrolling(true);
    }

    private preventBackgroundScrolling() {
        this.backgroundScrolling(false);
    }

    private backgroundScrolling(value: boolean) {
        const body = document.querySelector('body');
        if (body) {
            const method = (value) ? 'removeClass' : 'addClass';
            this.renderer[method](body, this.options.popupOpenedClass);
        }
    }

    private isRouteModal() {
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
                    .includes(activatedUrlSegment);
            }
        }
        return result;
    }

    private isAuxRoute() {
        let result = false;
        let route: ActivatedRoute = this.activatedRoute;
        do {
            result = route.outlet !== PRIMARY_OUTLET;
            if (result) {
                break;
            }
            route = route.parent as ActivatedRoute;
        } while (route);
        return result;
    }
}
