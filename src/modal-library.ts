import { InjectionToken } from '@angular/core';

const focusable = [
    'a[href]',
    'area[href]',
    'input:not([disabled])',
    'button:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    'iframe',
    'object',
    'embed',
    '*[tabindex]',
    '*[contenteditable=true]',
];

export const focusableSelector = focusable.join(',');

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
    confirmOkayButtonClass: '',
    confirmCancelButtonClass: '',
    /**
     * When true, when modal closes router.navigate() will be called with options relativeTo: activatedRoute.parent
     */
    closeRelativeToParent: false,
};

export type ModalOptions = typeof defaultOptions;

export const OPTIONS = new InjectionToken<ModalOptions>('ModalOptions');
export const MODAL_COMPONENT_OPTIONS = new InjectionToken<ModalOptions>('MODAL_COMPONENT_OPTIONS');

export function createFocusManager(container: HTMLElement, newTarget: Node) {
    const elements = Array.from<HTMLElement>(container.querySelectorAll(focusableSelector) as any);
    const isFocusInFirst = (): boolean => {
        const [element] = elements;
        return element && newTarget === element;
    };
    const isFocusInLast = (): boolean => {
        const [element] = elements.slice(-1);
        return element && newTarget === element;
    };
    const isFocusOutside = (): boolean => {
        return !container.contains(newTarget);
    };
    const focusFirst = () => {
        if (elements.length > 0) {
            const [element] = elements;
            element && element.focus && element.focus();
            return true;
        }
        return false;
    };
    const focusLast = (): boolean => {
        if (elements.length > 0) {
            const [element] = elements.slice(-1);
            element && element.focus && element.focus();
            return true;
        }
        return false;
    };
    return {
        isFocusInFirst,
        isFocusInLast,
        isFocusOutside,
        focusFirst,
        focusLast,
    };
}
