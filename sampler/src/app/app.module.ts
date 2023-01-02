import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BoardButtonComponent} from './ui-components/board-button/board-button.component';
import {CategoryMenuComponent} from "./category-menu/category-menu.component";

@NgModule({
  declarations: [
    AppComponent,
    BoardButtonComponent,
    CategoryMenuComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
