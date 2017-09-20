import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { ExampleModalComponent } from './example-modal.component';
import { CustomModalComponent } from './custom-modal.component';
import { ModalModule } from '../src/index';
import { APP_BASE_HREF, LocationStrategy, HashLocationStrategy } from '@angular/common';

@NgModule({
    imports: [
        BrowserModule,
        RouterModule.forRoot([]),
        RouterModule.forChild([
            { path: 'mx', outlet: 'modal', component: ExampleModalComponent },
            { path: 'data-routed', outlet: 'modal', component: ExampleModalComponent, data: { routed: true } },
            { path: ':code', outlet: 'modal', component: ExampleModalComponent },
            { path: 'example_component', component: ExampleModalComponent },
            { path: 'custom_modal', component: CustomModalComponent },
            { path: 'feature', loadChildren: './feature/feature.module#FeatureModule' },
        ]),
        ModalModule.forRoot({
            buttonCloseContent: 'x'
        }),
    ],
    declarations: [
        AppComponent,
        ExampleModalComponent,
        CustomModalComponent,
    ],
    providers: [
        { provide: APP_BASE_HREF, useValue: '/' },
        { provide: LocationStrategy, useClass: HashLocationStrategy },
    ],
    bootstrap: [AppComponent],
})
export class AppModule { }

