import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ClarityModule } from 'clarity-angular';

import { AboutComponent } from "./about/about.component";

/* App Root */
import { AppComponent }   from './app.component';

/* Feature Modules */
import { DataEntryModule } from './data-entry/data-entry.module';

/* Routing Module */
import { AppRoutingModule } from './app-routing.module';

@NgModule({
    declarations: [
        AppComponent,
        AboutComponent
    ],
    imports: [
        BrowserAnimationsModule,
        BrowserModule,
        ClarityModule.forRoot(),
        AppRoutingModule,
        DataEntryModule
    ],
    providers: [
        Title
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
