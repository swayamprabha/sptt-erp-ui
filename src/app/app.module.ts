import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ClarityModule } from 'clarity-angular';
import { AppComponent } from './app.component';
import { ROUTING } from "./app.routing";
import { HomeComponent } from "./home/home.component";
import { AboutComponent } from "./about/about.component";
import { SharedModule } from './shared/shared.module';
import { DataEntryModule } from './data-entry/data-entry.module';

@NgModule({
    declarations: [
        AppComponent,
        AboutComponent,
        HomeComponent
    ],
    imports: [
        BrowserAnimationsModule,
        BrowserModule,
        ClarityModule.forRoot(),
        SharedModule.forRoot(),
        ROUTING,
        DataEntryModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
