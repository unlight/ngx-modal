/// <reference path="../node_modules/@types/node/index.d.ts" />
require('core-js/es6');
require('core-js/es7/reflect');
require('core-js/es7/array');
require('zone.js/dist/zone');

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app.module';

// enableProdMode();
platformBrowserDynamic().bootstrapModule(AppModule);