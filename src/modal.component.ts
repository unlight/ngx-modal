import { Input, Output, Component, ElementRef, EventEmitter, Inject, OnDestroy, ViewChild, Renderer2, ContentChild, OnInit, HostListener } from '@angular/core';
import { OPTIONS, ModalOptions } from './modal-library';
import { ModalHeaderComponent } from './modal-header.component';
import { Subscription, BehaviorSubject } from 'rxjs';
import { Location } from '@angular/common';
import { ActivatedRoute, Router, PRIMARY_OUTLET, UrlSegment, NavigationExtras } from '@angular/router';
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
    @Output() closemodal: EventEmitter<void> = new EventEmitter();
    @Output() openmodal: EventEmitter<void> = new EventEmitter();
    @ViewChild('body', { static: true }) private readonly body: ElementRef;
    @ContentChild(ModalHeaderComponent, { static: true }) private readonly header: ModalHeaderComponent;
    options: ModalOptions;
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

    close() {
        this.cleanUp();
        this.closemodal.emit();
        this.isOpen = false;
        if (this.isRouteModal()) {
            if (this.options.routeOnClose) {
                if (this.isAuxRoute() && Array.isArray(this.options.routeOutlets)) {
                    const outlets = this.options.routeOutlets.reduce((result, outlet) => {
                        result[outlet] = null; // tslint:disable-line:no-null-keyword
                        return result;
                    }, {} as { [x: string]: null }); // tslint:disable-line:no-object-literal-type-assertion
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

    open() {
        this.openmodal.emit();
        this.isOpen = true;
        this.doOnOpen();
    }

    ngOnDestroy() {
        this.cleanUp();
    }

    @HostListener('document:keydown', ['$event'])
    keyDownHandler(event: KeyboardEvent) {
        if (!this.isOpen) {
            return;
        }
        if (event.key === 'Esc' || event.key === 'Escape') {
            this.close();
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
            this.closeSubscription = this.header.closeEventEmitter.subscribe(() => {
                this.close();
            });
        }
        setTimeout(() => {
            const element: HTMLElement | undefined = this.body.nativeElement;
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
