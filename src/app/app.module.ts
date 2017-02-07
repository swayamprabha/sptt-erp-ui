import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ClarityModule } from 'clarity-angular';
import { AppComponent } from './app.component';
import { ROUTING } from "./app.routing";
import { AboutComponent } from "./about/about.component";

//Modules
import { SharedModule } from './shared/shared.module';
import { DataEntryModule } from './data-entry/data-entry.module';
import { DriversModule } from './drivers/drivers.module';

@NgModule({
    declarations: [
        AppComponent,
        AboutComponent
    ],
    imports: [
        BrowserAnimationsModule,
        BrowserModule,
        ClarityModule.forRoot(),
        SharedModule.forRoot(),
        ROUTING,
        DataEntryModule,
        DriversModule
    ],
    providers: [
        Title
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
