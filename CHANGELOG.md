# [7.0.0](https://github.com/unlight/ngx-modal/compare/v6.0.0...v7.0.0) (2019-08-30)


### Bug Fixes

* Fixed semver range ([1ea366c](https://github.com/unlight/ngx-modal/commit/1ea366c))


### Code Refactoring

* Updated to Angular 8.X and rxjs 6.X ([4eef5e8](https://github.com/unlight/ngx-modal/commit/4eef5e8))


### Features

* Allow custom options for modal confirm service ([a212f5a](https://github.com/unlight/ngx-modal/commit/a212f5a))
* Allow to set id attribute for close button ([fa675e4](https://github.com/unlight/ngx-modal/commit/fa675e4))
* Modal confirmation service ([57f89e6](https://github.com/unlight/ngx-modal/commit/57f89e6))


### BREAKING CHANGES

* Updated to Angular 8.X and rxjs 6.X

# [6.0.0](https://github.com/unlight/ngx-modal/compare/v5.0.0...v6.0.0) (2019-08-21)


### Code Refactoring

* Updated to Angular 8.X and rxjs 6.X ([5804081](https://github.com/unlight/ngx-modal/commit/5804081))


### BREAKING CHANGES

* Updated to Angular 8.X and rxjs 6.X

# [5.0.0](https://github.com/unlight/ngx-modal/compare/v4.7.2...v5.0.0) (2019-06-02)


### Bug Fixes

* Prevent keyboard handling when modal is not open ([863a266](https://github.com/unlight/ngx-modal/commit/863a266))


### Features

* Added external focus trap ([dca8487](https://github.com/unlight/ngx-modal/commit/dca8487))
* Unwrap selectors modal-header, modal-content, modal-footer ([30e4808](https://github.com/unlight/ngx-modal/commit/30e4808))


### Reverts

* Reverted element unwrapping ([2c32c35](https://github.com/unlight/ngx-modal/commit/2c32c35))


### Styles

* Renamed events ([99571ff](https://github.com/unlight/ngx-modal/commit/99571ff))


### BREAKING CHANGES

* Removed event from `closemodal` and `openmodal` events
* Renamed events according to Angular style guide: `onClose` to `closemodal`, `onOpen` to `openmodal` (https://angular.io/guide/styleguide#dont-prefix-output-properties)
* Generated structure changed, removed Angular's wrap tag selectors

# [5.0.0-beta.1](https://github.com/unlight/ngx-modal/compare/v4.7.2...v5.0.0-beta.1@beta) (2019-05-27)


### Bug Fixes

* Prevent keyboard handling when modal is not open ([863a266](https://github.com/unlight/ngx-modal/commit/863a266))


### Features

* Added external focus trap ([dca8487](https://github.com/unlight/ngx-modal/commit/dca8487))


### Styles

* Renamed events ([99571ff](https://github.com/unlight/ngx-modal/commit/99571ff))


### BREAKING CHANGES

* Removed event from `closemodal` and `openmodal` events
* Renamed events according to Angular style guide: `onClose` to `closemodal`, `onOpen` to `openmodal` (https://angular.io/guide/styleguide#dont-prefix-output-properties)

## [4.7.2](https://github.com/unlight/ngx-modal/compare/v4.7.1...v4.7.2) (2019-04-09)


### Bug Fixes

* Removed source from dist package ([c8660b3](https://github.com/unlight/ngx-modal/commit/c8660b3))

## Previous Versions

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
