import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import { FrontMenuComponent } from './front-menu/front-menu.component';
import { BoardButtonComponent } from './ui-components/board-button/board-button.component';

@NgModule({
  declarations: [
    AppComponent,
    FrontMenuComponent,
    BoardButtonComponent
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
