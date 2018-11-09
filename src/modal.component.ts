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
        </div>`,
})
export class ModalComponent implements OnDestroy, OnInit {

    @Input() routed: boolean;
    @Input() isOpen: boolean;
    @Input() isNotification: boolean;
    @Input() settings: Partial<ModalOptions>;
    @Output() onClose: EventEmitter<any> = new EventEmitter();
    @Output() onOpen: EventEmitter<any> = new EventEmitter();
    @ViewChild('body') private body: ElementRef;
    @ContentChild(ModalHeaderComponent) private header: ModalHeaderComponent;
    private closeSubscription: Subscription;
    options: ModalOptions;

    constructor(
        @Inject(OPTIONS) private modalOptions: ModalOptions,
        private renderer: Renderer2,
        private location: Location,
        private router: Router,
        private activatedRoute: ActivatedRoute,
    ) { }

    ngOnInit() {
        this.options = { ...this.modalOptions, ...this.settings };
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
                    const navigateOptions: any = { };
                    if (this.options.closeRelativeToParent) {
                        navigateOptions.relativeTo = this.activatedRoute.parent;
                    }
                    this.router.navigate(['.', { outlets }], navigateOptions);
                } else {
                    this.router.navigate(['.'], { relativeTo: this.activatedRoute.parent });
                }
            } else if (this.options.backOnClose) {
                this.location.back();
            }
        }
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
        switch (e.key) { // eslint-disable-line tslint/config
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

    private onTabKeyDown(e: KeyboardEvent) {
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

    private doOnOpen() {
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

    private cleanUp() {
        if (this.isOpen) {
            this.enableBackgroundScrolling();
        }
        if (this.closeSubscription) {
            this.closeSubscription.unsubscribe();
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
                    .indexOf(activatedUrlSegment) !== -1;
            }
        }
        return result;
    }

    private isAuxRoute() {
        let result: boolean = false;
        let route: ActivatedRoute = this.activatedRoute;
        result = route.outlet !== PRIMARY_OUTLET;
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
