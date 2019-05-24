import { InjectionToken } from '@angular/core';

export const defaultOptions = {
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
     * Navigate back when modal close (useful for route modals)
     */
    routeOnClose: true,
    /**
     * Aux routes for routeOnClose setting.
     */
    routeOutlets: ['modal'],
    /**
     * Navigate back on close.
     * Clanky solution, use routeOnClose/routeOutlets.
     */
    backOnClose: false,
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

export type ModalOptions = typeof defaultOptions;

export const OPTIONS = new InjectionToken<ModalOptions>('ModalOptions');

export function unwrap(element: HTMLElement) {
    // get the element's parent node
    const parent = element.parentNode;
    if (parent) {
        // move all children out of the element
        while (element.firstChild) {
            parent.insertBefore(element.firstChild, element);
        }
        // remove the empty element
        parent.removeChild(element);
    }
}
